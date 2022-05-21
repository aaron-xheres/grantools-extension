import * as CONST from '@/const';

// Local Storage
import localStorage from '@/localStorage';

if (Object.keys(localStorage.getData(CONST.STORES.ACTIONS)).length === 0) {
  localStorage.setData(
      CONST.STORES.ACTIONS,
      CONST.STORE_ACTIONS.autoRefresh,
      false,
  );
  localStorage.setData(
      CONST.STORES.ACTIONS,
      CONST.STORE_ACTIONS.repeatStage,
      false,
  );
}
if (Object.keys(localStorage.getData(CONST.STORES.DATA)).length === 0) {
  localStorage.setData(
      CONST.STORES.DATA,
      CONST.STORE_DATA.currentPageType,
      CONST.PAGE_TYPE.NULL,
  );
  localStorage.setData(CONST.STORES.DATA, CONST.STORE_DATA.refreshAttack, true);
  localStorage.setData(
      CONST.STORES.DATA,
      CONST.STORE_DATA.refreshSummon,
      false,
  );
  localStorage.setData(
      CONST.STORES.DATA,
      CONST.STORE_DATA.lastStartedStage,
      '',
  );
  localStorage.setData(
      CONST.STORES.DATA,
      CONST.STORE_DATA.repeatStageCounter,
      0,
  );
}

const actions = localStorage.getData(CONST.STORES.ACTIONS);
console.log('%c [ACTIONS STORE]', 'color: #bada55', actions);

const data = localStorage.getData(CONST.STORES.DATA);
console.log('%c [DATA STORE]', 'color: #bada55', data);

// States
import {reactive} from 'vue';

export const actionStore = reactive({
  autoRefresh: actions.autoRefresh,
  repeatStage: actions.repeatStage,
});

export const dataStore = reactive({
  currentPageType: data.currentPageType,
  refreshAttack: data.refreshAttack,
  refreshSummon: data.refreshSummon,
  lastStartedStage: data.lastStartedStage,
  repeatStageCounter: data.repeatStageCounter,
});

// Functions
let [tab]: any = [];

const initTabs = async () => {
  tab = await chrome.tabs.query({active: true, currentWindow: true});
  console.log(tab);
};

initTabs();

const setStore = (
    store: string,
    dataKey: string,
    dataValue: any,
    log?: boolean,
) => {
  if (store === CONST.STORES.ACTIONS) {
    switch (dataKey) {
      case CONST.STORE_ACTIONS.autoRefresh:
        actionStore.autoRefresh = dataValue;
        localStorage.setData(
            CONST.STORES.ACTIONS,
            CONST.STORE_ACTIONS.autoRefresh,
            dataValue,
            log,
        );
        break;
      case CONST.STORE_ACTIONS.repeatStage:
        actionStore.repeatStage = dataValue;
        localStorage.setData(
            CONST.STORES.ACTIONS,
            CONST.STORE_ACTIONS.repeatStage,
            dataValue,
            log,
        );
        break;
    }
  }
  else if (store === CONST.STORES.DATA) {
    switch (dataKey) {
      case CONST.STORE_DATA.currentPageType:
        dataStore.currentPageType = dataValue;
        localStorage.setData(
            CONST.STORES.DATA,
            CONST.STORE_DATA.currentPageType,
            dataValue,
            log,
        );
        break;
      case CONST.STORE_DATA.refreshAttack:
        dataStore.refreshAttack = dataValue;
        localStorage.setData(
            CONST.STORES.DATA,
            CONST.STORE_DATA.refreshAttack,
            dataValue,
            log,
        );
        break;
      case CONST.STORE_DATA.refreshSummon:
        dataStore.refreshSummon = dataValue;
        localStorage.setData(
            CONST.STORES.DATA,
            CONST.STORE_DATA.refreshSummon,
            dataValue,
            log,
        );
        break;
      case CONST.STORE_DATA.lastStartedStage:
        dataStore.lastStartedStage = dataValue;
        localStorage.setData(
            CONST.STORES.DATA,
            CONST.STORE_DATA.lastStartedStage,
            dataValue,
            log,
        );
        break;
      case CONST.STORE_DATA.repeatStageCounter:
        dataStore.repeatStageCounter = dataValue;
        localStorage.setData(
            CONST.STORES.DATA,
            CONST.STORE_DATA.repeatStageCounter,
            dataValue,
            log,
        );
        break;
    }
  }
};

export const helloFromExtension = async () => {
  setStore(
      CONST.STORES.ACTIONS,
      CONST.STORE_ACTIONS.autoRefresh,
      !actionStore.autoRefresh,
      true,
  );
  setStore(
      CONST.STORES.DATA,
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
  setStore(CONST.STORES.ACTIONS, CONST.STORE_ACTIONS.autoRefresh, false);
  setStore(CONST.STORES.ACTIONS, CONST.STORE_ACTIONS.repeatStage, false);
  setStore(
      CONST.STORES.DATA,
      CONST.STORE_DATA.currentPageType,
      CONST.PAGE_TYPE.NULL,
  );
  setStore(CONST.STORES.DATA, CONST.STORE_DATA.refreshAttack, true);
  setStore(CONST.STORES.DATA, CONST.STORE_DATA.refreshSummon, false);
  setStore(CONST.STORES.DATA, CONST.STORE_DATA.lastStartedStage, '');
  setStore(CONST.STORES.DATA, CONST.STORE_DATA.repeatStageCounter, 0);
  console.warn('[STORES] RESET STORE');
};
