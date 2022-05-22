import * as CONST from '@/const';
import localStorage from '@/localStorage';
import {actionStore, dataStore, setStore, syncStore} from './stores';

const initStores = async () => {
  const storage = await localStorage.getAllData();
  if (Object.keys(storage).length === 0) {
    setStore(CONST.STORE_ACTIONS.autoRefresh, false);
    setStore(CONST.STORE_ACTIONS.repeatStage, false);
    setStore(CONST.STORE_DATA.currentPageType, CONST.PAGE_TYPE.NULL);
    setStore(CONST.STORE_DATA.refreshAttack, true);
    setStore(CONST.STORE_DATA.refreshSummon, false);
    setStore(CONST.STORE_DATA.lastSelectedStage, '');
    setStore(CONST.STORE_DATA.repeatStageCounter, 0);
  }

  console.log('[CHROME STORE] ACTION STORE', actionStore);
  console.log('[CHROME STORE] DATA STORE', dataStore);
};

let [tab]: any = [];
const initTabs = async () => {
  tab = await chrome.tabs.query({
    active: true,
    currentWindow: true,
    url: 'http://game.granbluefantasy.jp/*',
  });
  console.log('[TAB DATA]', tab);
};

const initDebugger = async () => {
  const debuggee = {tabId: tab[0].id};
  const filter = [
    '_result.json',
    'http://game.granbluefantasy.jp/result/data/',
    'http://game.granbluefantasy.jp/resultmulti/data/',
  ];

  chrome.debugger.attach(debuggee, '1.3', (): void => {
    chrome.debugger.sendCommand(debuggee, 'Network.enable');
    console.log('[DEBUGGER] Attach Successful');
  });

  chrome.debugger.onDetach.addListener((source, reason): void => {
    console.warn('[DEBUGGER] Detach due to', reason);
  });

  chrome.debugger.onEvent.addListener(
      (source, method: string, params: any): void => {
        if (method === 'Network.responseReceived') {
          if (filter.some((url) => params.response.url.includes(url))) {
            const dataType: string = params.response.url.includes('.json?') ?
            params.response.url.split('/').pop().split('.').shift() :
            'reward';

            execAction(dataType);
          }
        }
      },
  );
};

const initNavigation = async () => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
      changeInfo.url &&
      changeInfo.url.includes('http://game.granbluefantasy.jp/')
    ) {
      // Home Page
      if (
        changeInfo.url.includes('#mypage') &&
        dataStore.currentPageType !== CONST.PAGE_TYPE.HOME
      ) {
        setStore(CONST.STORE_DATA.currentPageType, CONST.PAGE_TYPE.HOME, true);
      }

      // Quest Page
      if (
        changeInfo.url.includes('#quest/index') ||
        (changeInfo.url.includes('#quest/extra') &&
          dataStore.currentPageType !== CONST.PAGE_TYPE.QUEST)
      ) {
        setStore(CONST.STORE_DATA.currentPageType, CONST.PAGE_TYPE.QUEST, true);
      }

      // Raid Assist
      if (
        changeInfo.url.includes('#quest/assist') &&
        dataStore.currentPageType !== CONST.PAGE_TYPE.QUEST
      ) {
        setStore(
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
            CONST.STORE_DATA.currentPageType,
            CONST.PAGE_TYPE.SUPPORTER,
            true,
        );
        if (
          !changeInfo.url.includes('_raid') &&
          changeInfo.url !== dataStore.lastSelectedStage
        ) {
          setStore(CONST.STORE_DATA.lastSelectedStage, changeInfo.url, true);
          setStore(CONST.STORE_DATA.repeatStageCounter, 0, true);
        }
        else if (changeInfo.url.includes('_raid')) {
          setStore(CONST.STORE_DATA.lastSelectedStage, '', true);
          setStore(CONST.STORE_DATA.repeatStageCounter, 0, true);
        }
      }

      // Battle
      if (
        changeInfo.url.includes('#raid') &&
        dataStore.currentPageType !== CONST.PAGE_TYPE.RAID
      ) {
        setStore(CONST.STORE_DATA.currentPageType, CONST.PAGE_TYPE.RAID, true);
      }

      // Result
      if (
        changeInfo.url.includes('#result') &&
        dataStore.currentPageType !== CONST.PAGE_TYPE.RESULT
      ) {
        setStore(
            CONST.STORE_DATA.currentPageType,
            CONST.PAGE_TYPE.RESULT,
            true,
        );
      }
    }
  });
};

(async () => {
  await initTabs();
  await initStores();
  initDebugger();
  initNavigation();
})();

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.msg === 'attachDebugger') {
    await initTabs();
    initDebugger();
  }
});

const wait = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const execAction = async (dataType: string) => {
  await syncStore();

  // Attack / Summon
  if (dataType.includes('_result')) {
    if (actionStore.autoRefresh) {
      if (
        (dataStore.refreshAttack &&
          dataType.includes('normal_attack_result')) ||
        (dataStore.refreshSummon && dataType.includes('summon_result'))
      ) {
        console.log('[ACTION] Auto Refresh');
        await wait(100);
        chrome.scripting.executeScript({
          target: {tabId: tab[0].id},
          func: async () => {
            history.back();
          },
        });

        await wait(500);
        let url = tab[0].url as string;
        while (!url.includes('#raid')) {
          await wait(250);
          url = tab[0].url as string;
          history.forward();
        }
      }
    }
  }

  // Reward Screen
  else if (dataType === 'reward') {
    if (actionStore.repeatStage && dataStore.lastSelectedStage !== '') {
      console.log('[ACTION] Repeat Stage');
      setStore(
          CONST.STORE_DATA.repeatStageCounter,
          dataStore.repeatStageCounter + 1,
          true,
      );
      chrome.tabs.update(tab[0].id, {url: dataStore.lastSelectedStage});
    }
  }
};
