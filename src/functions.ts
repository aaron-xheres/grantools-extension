let [tab]: any = [];

const initFunctions = async () => {
  tab = await chrome.tabs.query({active: true, currentWindow: true});
  console.log(tab);
};

initFunctions();

export const helloFromExtension = async () => {
  chrome.scripting.executeScript({
    target: {tabId: tab[0].id},
    func: () => {
      console.log('hello from extension');
    },
  });
};
