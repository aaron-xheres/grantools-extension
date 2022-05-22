/**
 * Chrome Storage Management
 */
export class localStorage {
  /**
   * Get Data from Storage of key
   * @param {string} dataKey
   * @return {Record<string, any>}
   */
  static async getData(dataKey: string): Promise<any> {
    const data = chrome.storage.sync.get(dataKey);
    if (data) {
      return data;
    }
    else {
      console.error('[LOCAL STORAGE] Storage Key does not exist:', dataKey);
      return null;
    }
  }

  /**
   * Set Data to Storage
   * @param {string} dataKey
   * @param {any} dataValue
   * @param {boolean} log
   */
  static async setData(
      dataKey: string,
      dataValue: any,
      log?: boolean,
  ): Promise<void> {
    chrome.storage.sync.set({[dataKey]: dataValue});
    if (log) {
      console.log(
          '[LOCAL STORAGE] Storage:',
          ' |  Data Set:',
          dataKey,
          ': ',
          dataValue,
      );
    }
  }

  /**
   * Get all Storage Data
   */
  static async getAllData() {
    return chrome.storage.sync.get(null);
  }
}

export default localStorage;
