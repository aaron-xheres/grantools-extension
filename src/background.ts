import {reactive} from 'vue';

import * as CONST from '@/const';
import localStorage from '@/localStorage';

export const actionStore = reactive({
  autoRefresh: false,
  repeatStage: false,
});

export const dataStore = reactive({
  currentPageType: CONST.PAGE_TYPE.NULL,
  refreshAttack: true,
  refreshSummon: false,
  lastStartedStage: '',
  repeatStageCounter: 0,
});

const initStores = async () => {
  const storage = await localStorage.getAllData();
  if (Object.keys(storage).length === 0) {
    await localStorage.setData(CONST.STORE_ACTIONS.autoRefresh, false);
    await localStorage.setData(CONST.STORE_ACTIONS.repeatStage, false);
    await localStorage.setData(
        CONST.STORE_DATA.currentPageType,
        CONST.PAGE_TYPE.NULL,
    );
    await localStorage.setData(CONST.STORE_DATA.refreshAttack, true);
    await localStorage.setData(CONST.STORE_DATA.refreshSummon, false);
    await localStorage.setData(CONST.STORE_DATA.lastStartedStage, '');
    await localStorage.setData(CONST.STORE_DATA.repeatStageCounter, 0);
  }

  actionStore.autoRefresh = storage.autoRefresh;
  actionStore.repeatStage = storage.repeatStage;

  dataStore.currentPageType = storage.currentPageType;
  dataStore.refreshAttack = storage.refreshAttack;
  dataStore.refreshSummon = storage.refreshSummon;
  dataStore.lastStartedStage = storage.lastStartedStage;
  dataStore.repeatStageCounter = storage.repeatStageCounter;

  console.log('[CHROME STORAGE]', storage);
};

let [tab]: any = [];
const initTabs = async () => {
  tab = await chrome.tabs.query({active: true, currentWindow: true});
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
            try {
              helloFromExtension();
              chrome.debugger.sendCommand(
                  debuggee,
                  'Network.getResponseBody',
                  {requestId: params.requestId},
                  (result) => {
                    const dataType: string = params.response.url.includes('.json?') ?
                  params.response.url.split('/').pop().split('.').shift() :
                  'reward';
                    console.log('[NETWORK DATA]', dataType);
                  },
              );
            }
            catch (err) {}
          }
        }
      },
  );
};

(async () => {
  await initStores();
  await initTabs();
  await initDebugger();
})();

const setStore = async (dataKey: string, dataValue: any, log?: boolean) => {
  switch (dataKey) {
    case CONST.STORE_ACTIONS.autoRefresh:
      actionStore.autoRefresh = dataValue;
      await localStorage.setData(
          CONST.STORE_ACTIONS.autoRefresh,
          dataValue,
          log,
      );
      break;
    case CONST.STORE_ACTIONS.repeatStage:
      actionStore.repeatStage = dataValue;
      await localStorage.setData(
          CONST.STORE_ACTIONS.repeatStage,
          dataValue,
          log,
      );
      break;
    case CONST.STORE_DATA.currentPageType:
      dataStore.currentPageType = dataValue;
      await localStorage.setData(
          CONST.STORE_DATA.currentPageType,
          dataValue,
          log,
      );
      break;
    case CONST.STORE_DATA.refreshAttack:
      dataStore.refreshAttack = dataValue;
      await localStorage.setData(
          CONST.STORE_DATA.refreshAttack,
          dataValue,
          log,
      );
      break;
    case CONST.STORE_DATA.refreshSummon:
      dataStore.refreshSummon = dataValue;
      await localStorage.setData(
          CONST.STORE_DATA.refreshSummon,
          dataValue,
          log,
      );
      break;
    case CONST.STORE_DATA.lastStartedStage:
      dataStore.lastStartedStage = dataValue;
      await localStorage.setData(
          CONST.STORE_DATA.lastStartedStage,
          dataValue,
          log,
      );
      break;
    case CONST.STORE_DATA.repeatStageCounter:
      dataStore.repeatStageCounter = dataValue;
      await localStorage.setData(
          CONST.STORE_DATA.repeatStageCounter,
          dataValue,
          log,
      );
      break;
  }
};

export const helloFromExtension = async () => {
  setStore(CONST.STORE_ACTIONS.autoRefresh, !actionStore.autoRefresh, true);
  setStore(
      CONST.STORE_DATA.repeatStageCounter,
      dataStore.repeatStageCounter + 1,
      true,
  );
  chrome.scripting.executeScript({
    target: {tabId: tab[0].id},
    func: () => {
      console.log('hello from extension');
    },
  });
};

export const resetStores = async () => {
  setStore(CONST.STORE_ACTIONS.autoRefresh, false);
  setStore(CONST.STORE_ACTIONS.repeatStage, false);
  setStore(CONST.STORE_DATA.currentPageType, CONST.PAGE_TYPE.NULL);
  setStore(CONST.STORE_DATA.refreshAttack, true);
  setStore(CONST.STORE_DATA.refreshSummon, false);
  setStore(CONST.STORE_DATA.lastStartedStage, '');
  setStore(CONST.STORE_DATA.repeatStageCounter, 0);
  console.warn('[STORES] RESET STORE');
};
