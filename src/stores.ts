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
  replicardExpedition: false,
  lastSelectedStage: '',
  repeatStageCounter: 0,
});

// Sync Stores on page change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.url &&
    changeInfo.url.includes('http://game.granbluefantasy.jp/')
  ) {
    syncStore();
  }
});

export const syncStore = async (): Promise<any> => {
  const storage = await localStorage.getAllData();

  actionStore.autoRefresh = storage.autoRefresh;
  actionStore.repeatStage = storage.repeatStage;

  dataStore.currentPageType = storage.currentPageType;
  dataStore.refreshAttack = storage.refreshAttack;
  dataStore.refreshSummon = storage.refreshSummon;
  dataStore.replicardExpedition = storage.replicardExpedition;
  dataStore.lastSelectedStage = storage.lastSelectedStage;
  dataStore.repeatStageCounter = storage.repeatStageCounter;
};

syncStore();
export const setStore = async (
    dataKey: string,
    dataValue: any,
    log?: boolean,
) => {
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
    case CONST.STORE_DATA.replicardExpedition:
      dataStore.replicardExpedition = dataValue;
      await localStorage.setData(
          CONST.STORE_DATA.replicardExpedition,
          dataValue,
          log,
      );
      break;
    case CONST.STORE_DATA.lastSelectedStage:
      dataStore.lastSelectedStage = dataValue;
      await localStorage.setData(
          CONST.STORE_DATA.lastSelectedStage,
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

  syncStore();
};

export const resetStores = async () => {
  setStore(CONST.STORE_ACTIONS.autoRefresh, false);
  setStore(CONST.STORE_ACTIONS.repeatStage, false);
  setStore(CONST.STORE_DATA.currentPageType, CONST.PAGE_TYPE.NULL);
  setStore(CONST.STORE_DATA.refreshAttack, true);
  setStore(CONST.STORE_DATA.refreshSummon, false);
  setStore(CONST.STORE_DATA.lastSelectedStage, '');
  setStore(CONST.STORE_DATA.repeatStageCounter, 0);
  console.warn('[STORES] RESET STORE');
};
