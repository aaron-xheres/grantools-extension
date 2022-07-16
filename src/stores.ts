import {reactive, ref} from 'vue';

import * as CONST from '@/const';
import localStorage from '@/localStorage';

export const tabStatus = ref('');

export const actionStore: { [key: string]: any } = reactive({
  autoRefresh: false,
  repeatStage: false,
});

export const dataStore: { [key: string]: any } = reactive({
  currentPageType: CONST.PAGE_TYPE.NULL,
  refreshAttack: true,
  refreshSummon: false,
  replicardExpedition: false,
  lastSelectedStage: '',
  repeatStageCounter: 0,
});

// Sync Stores on page change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab): void => {
  if (
    changeInfo.url &&
    changeInfo.url.includes('http://game.granbluefantasy.jp/')
  ) {
    syncStore();
  }
});

export const syncStore = async (): Promise<any> => {
  const storage = await localStorage.getAllData();
  if (!storage) return;

  actionStore.autoRefresh = storage[CONST.STORE_ACTIONS.autoRefresh];
  actionStore.repeatStage = storage[CONST.STORE_ACTIONS.repeatStage];

  dataStore.currentPageType = storage[CONST.STORE_DATA.currentPageType];
  dataStore.refreshAttack = storage[CONST.STORE_DATA.refreshAttack];
  dataStore.refreshSummon = storage[CONST.STORE_DATA.refreshSummon];
  dataStore.replicardExpedition = storage[CONST.STORE_DATA.replicardExpedition];
  dataStore.lastSelectedStage = storage[CONST.STORE_DATA.lastSelectedStage];
  dataStore.repeatStageCounter = storage[CONST.STORE_DATA.repeatStageCounter];
};

export const setStore = async (
    storeKey: string,
    dataKey: string,
    dataValue: any,
    log?: boolean,
): Promise<void> => {
  await localStorage.setData(dataKey, dataValue, log);

  switch (storeKey) {
    case CONST.STORES.ACTIONS:
      actionStore[dataKey] = dataValue;
      break;
    case CONST.STORES.DATA:
      dataStore[dataKey] = dataValue;
      break;
    default:
      break;
  }
};

export const resetStores = async (): Promise<void> => {
  await setStore(CONST.STORES.ACTIONS, CONST.STORE_ACTIONS.autoRefresh, false);
  await setStore(CONST.STORES.ACTIONS, CONST.STORE_ACTIONS.repeatStage, false);
  await setStore(
      CONST.STORES.DATA,
      CONST.STORE_DATA.currentPageType,
      CONST.PAGE_TYPE.NULL,
  );
  await setStore(CONST.STORES.DATA, CONST.STORE_DATA.refreshAttack, true);
  await setStore(CONST.STORES.DATA, CONST.STORE_DATA.refreshSummon, false);
  await setStore(CONST.STORES.DATA, CONST.STORE_DATA.lastSelectedStage, '');
  await setStore(CONST.STORES.DATA, CONST.STORE_DATA.repeatStageCounter, 0);
  console.warn('[STORES] RESET STORE');
};

// Ensure that the stores are synced on popup
syncStore();
