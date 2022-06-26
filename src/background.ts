import * as CONST from '@/const';
import localStorage from '@/localStorage';
import {
  actionStore,
  dataStore,
  resetStores,
  setStore,
  syncStore,
} from './stores';

// Background Variables
const autoRefreshVar: Record<string, any> = {
  forwardCommand: [],
};

const initStores = async (): Promise<void> => {
  const storage = await localStorage.getAllData();
  if (Object.keys(storage).length === 0) {
    resetStores();
  }

  console.log('[CHROME STORE] ACTION STORE', actionStore);
  console.log('[CHROME STORE] DATA STORE', dataStore);
};

let tab: chrome.tabs.Tab[];
const initTabs = async (): Promise<void> => {
  // Fix: Do not include active and currentWindow
  // This will enable user to use other chrome window/tabs when using Grantools
  tab = await chrome.tabs.query({
    url: 'http://game.granbluefantasy.jp/*',
  });
};

const initWebRequestReader = async (): Promise<void> => {
  const filter = {
    urls: [
      'http://game.granbluefantasy.jp/rest/*/*_result.json?*',
      'http://game.granbluefantasy.jp/result*/data/*',
    ],
  };

  chrome.webRequest.onHeadersReceived.addListener(
      (details: Record<string, any>): void => {
        console.log('[WEB REQUEST URL]', details.url);

        const dataType: string = details.url.includes('.json?') ?
        details.url.split('/').pop().split('.').shift() :
        'reward';

        execAction(dataType);
      },
      filter,
  );
};

const initNavigation = async (): Promise<void> => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab): void => {
    if (
      changeInfo.url &&
      changeInfo.url.includes('http://game.granbluefantasy.jp/')
    ) {
      if (changeInfo.status === 'complete') {
        // Auto Refresh Forward
        if (autoRefreshVar.forwardCommand.length > 0) {
          for (const _tabId of autoRefreshVar.forwardCommand) {
            chrome.tabs.goForward(_tabId);
          }

          autoRefreshVar.forwardCommand = [];
        }
      }

      // Home Page
      if (
        changeInfo.url.includes('#mypage') &&
        dataStore.currentPageType !== CONST.PAGE_TYPE.HOME
      ) {
        setStore(
            CONST.STORES.DATA,
            CONST.STORE_DATA.currentPageType,
            CONST.PAGE_TYPE.HOME,
            true,
        );
      }

      // Quest Page
      if (
        changeInfo.url.includes('#quest/index') ||
        (changeInfo.url.includes('#quest/extra') &&
          dataStore.currentPageType !== CONST.PAGE_TYPE.QUEST)
      ) {
        setStore(
            CONST.STORES.DATA,
            CONST.STORE_DATA.currentPageType,
            CONST.PAGE_TYPE.QUEST,
            true,
        );
      }

      // Raid Assist
      if (
        changeInfo.url.includes('#quest/assist') &&
        dataStore.currentPageType !== CONST.PAGE_TYPE.QUEST
      ) {
        setStore(
            CONST.STORES.DATA,
            CONST.STORE_DATA.currentPageType,
            CONST.PAGE_TYPE.ASSIST,
            true,
        );
      }

      // Support Summon Select
      if (
        changeInfo.url.includes('/supporter') &&
        dataStore.currentPageType !== CONST.PAGE_TYPE.SUPPORTER
      ) {
        setStore(
            CONST.STORES.DATA,
            CONST.STORE_DATA.currentPageType,
            CONST.PAGE_TYPE.SUPPORTER,
            true,
        );
        if (
          changeInfo.url.includes('#replicard') &&
          dataStore.replicardExpedition
        ) {
          // Do nothing
        }
        else if (
          !changeInfo.url.includes('_raid') &&
          changeInfo.url !== dataStore.lastSelectedStage
        ) {
          setStore(
              CONST.STORES.DATA,
              CONST.STORE_DATA.lastSelectedStage,
              changeInfo.url,
              true,
          );
          setStore(
              CONST.STORES.DATA,
              CONST.STORE_DATA.repeatStageCounter,
              0,
              true,
          );
        }
        else if (changeInfo.url.includes('_raid')) {
          setStore(
              CONST.STORES.DATA,
              CONST.STORE_DATA.lastSelectedStage,
              '',
              true,
          );
          setStore(
              CONST.STORES.DATA,
              CONST.STORE_DATA.repeatStageCounter,
              0,
              true,
          );
        }
      }

      if (
        changeInfo.url.includes('#replicard/stage') &&
        dataStore.currentPageType !== CONST.PAGE_TYPE.REPLICARD_STAGE
      ) {
        setStore(
            CONST.STORES.DATA,
            CONST.STORE_DATA.currentPageType,
            CONST.PAGE_TYPE.REPLICARD_STAGE,
            true,
        );
        if (dataStore.replicardExpedition) {
          setStore(
              CONST.STORES.DATA,
              CONST.STORE_DATA.lastSelectedStage,
              changeInfo.url,
              true,
          );
        }
      }

      // Battle
      if (
        changeInfo.url.includes('#raid') &&
        dataStore.currentPageType !== CONST.PAGE_TYPE.RAID
      ) {
        setStore(
            CONST.STORES.DATA,
            CONST.STORE_DATA.currentPageType,
            CONST.PAGE_TYPE.RAID,
            true,
        );
      }

      // Result
      if (
        changeInfo.url.includes('#result') &&
        dataStore.currentPageType !== CONST.PAGE_TYPE.RESULT
      ) {
        setStore(
            CONST.STORES.DATA,
            CONST.STORE_DATA.currentPageType,
            CONST.PAGE_TYPE.RESULT,
            true,
        );
      }
    }
  });
};

(async (): Promise<void> => {
  await initTabs();
  await initStores();
  initWebRequestReader();
  initNavigation();
})();

const wait = (ms: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const execAction = async (dataType: string): Promise<void> => {
  await syncStore();
  await initTabs();

  // Attack / Summon
  if (dataType.includes('_result')) {
    // Ensure that only the raid tab is refreshed
    // TODO: Fix refreshing when having multiple raid tabs and alt-tabbed
    // Current Workaround: If there are multiple raid tabs, refresh the active tab, else tab[0]
    const filterTab = tab.filter((tab: chrome.tabs.Tab) =>
      tab.url?.includes('#raid'),
    );
    let activeFilter;
    if (filterTab.length > 1) {
      activeFilter = filterTab.filter(
          (tab: chrome.tabs.Tab) => tab.active === true,
      );
    }

    const actionTab =
      activeFilter && activeFilter.length > 0 ? activeFilter[0] : filterTab[0];

    if (actionStore.autoRefresh) {
      if (
        (dataStore.refreshAttack &&
          dataType.includes('normal_attack_result')) ||
        (dataStore.refreshSummon && dataType.includes('summon_result'))
      ) {
        if (actionTab.id) {
          console.log('[ACTION] Auto Refresh');

          await wait(100);
          if (actionTab.url?.includes('_multi')) {
            // ISSUE: May get stuck on READY on refresh/first Auto Refresh for multi-raids
            /*
            autoRefreshVar.forwardCommand.push(actionTab.id);
            await wait(100);
            chrome.tabs.goBack(actionTab.id!);
            */

            // WORKAROUND: Use Refresh for Multi Raid temporarily
            chrome.tabs.reload(actionTab.id);
          }
          else {
            // NOTE: Single Raids will automatically redirect back to raid
            chrome.tabs.goBack(actionTab.id!);
          }
        }
        else {
          console.error(
              '[ACTION] Failed to Auto Refresh: Unable to find Tab ID',
          );
        }
      }
    }
  }

  // Reward Screen
  else if (dataType === 'reward') {
    // Ensure that only the reward tab is refreshed
    // Will refresh all result tabs, needs suggestion for if that should be the case
    const filterTab = tab.filter((tab: chrome.tabs.Tab) =>
      tab.url?.includes('#result'),
    );

    if (actionStore.repeatStage && dataStore.lastSelectedStage !== '') {
      console.log('[ACTION] Repeat Stage');
      setStore(
          CONST.STORES.DATA,
          CONST.STORE_DATA.repeatStageCounter,
          dataStore.repeatStageCounter + 1,
          true,
      );
      for (const actionTab of filterTab) {
        chrome.tabs.update(actionTab.id!, {url: dataStore.lastSelectedStage});
      }
    }
  }
};
