/**
 * Local Storage Management
 */
export class localStorage {
  /**
   * Get Data from Storage of key
   * @param {string} storageKey
   * @return {Record<string, any>}
   */
  static getData(storageKey: string): Record<string, any> {
    const dataStr = window.localStorage.getItem(storageKey);
    if (dataStr) {
      const data = JSON.parse(dataStr as string);
      return data;
    }
    else {
      console.error('[LOCAL STORAGE] Storage Key does not exist:', storageKey);
      return {};
    }
  }

  /**
   * Set Specfici Data to Storage of key
   * @param {string} storageKey
   * @param {string} dataKey
   * @param {any} dataValue
   * @param {boolean} log
   */
  static setData(
      storageKey: string,
      dataKey: string,
      dataValue: any,
      log?: boolean,
  ): void {
    const data = this.getData(storageKey);

    data[dataKey] = dataValue;

    const newDataStr = JSON.stringify(data);
    window.localStorage.setItem(storageKey, newDataStr);
    if (log) {
      console.log(
          '[LOCAL STORAGE] Storage:',
          storageKey,
          ' |  Data Set:',
          dataKey,
          ': ',
          dataValue,
      );
    }
  }
}

export default localStorage;
