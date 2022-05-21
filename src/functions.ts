let [tab]: any = [];

const initFunctions = async () => {
  tab = await chrome.tabs.query({active: true, currentWindow: true});
  console.log(tab);
};

initFunctions();

import {actionStore} from '@/stores/actionStores';
import {dataStore} from '@/stores/dataStores';

export const helloFromExtension = async () => {
  actionStore.autoRefresh = !actionStore.autoRefresh;
  dataStore.repeatStageCounter++;
  chrome.scripting.executeScript({
    target: {tabId: tab[0].id},
    func: () => {
      console.log('hello from extension');
    },
  });
};
