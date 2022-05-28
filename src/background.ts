import * as CONST from '@/const';
import localStorage from '@/localStorage';
import {
  actionStore,
  dataStore,
  resetStores,
  setStore,
  syncStore,
} from './stores';

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
  tab = await chrome.tabs.query({
    active: true,
    currentWindow: true,
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
    if (actionStore.autoRefresh) {
      if (
        (dataStore.refreshAttack &&
          dataType.includes('normal_attack_result')) ||
        (dataStore.refreshSummon && dataType.includes('summon_result'))
      ) {
        console.log('[ACTION] Auto Refresh');

        // Single raid don't need to forward
        let waitDelay = 5000;
        if (tab[0].url!.includes('_multi')) waitDelay = 250;

        await wait(100);
        chrome.tabs.goBack(tab[0].id!);

        while (!tab[0].url!.includes('#raid')) {
          await wait(waitDelay);
          chrome.tabs.goForward(tab[0].id!);
        }
      }
    }
  }

  // Reward Screen
  else if (dataType === 'reward') {
    if (actionStore.repeatStage && dataStore.lastSelectedStage !== '') {
      console.log('[ACTION] Repeat Stage');
      setStore(
          CONST.STORES.DATA,
          CONST.STORE_DATA.repeatStageCounter,
          dataStore.repeatStageCounter + 1,
          true,
      );
      chrome.tabs.update(tab[0].id!, {url: dataStore.lastSelectedStage});
    }
  }
};
