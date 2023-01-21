const Logger = {
  error: (e: Error): void => {
    console.error(e);
  },
};

class Storage {
  setItem<T>(key: string, value: T): void {
    try {
      const stringified = JSON.stringify(value);
      localStorage.setItem(key, stringified);
    } catch (e: any) {
      Logger.error(e);
    }
  }

  getItem<T>(key: string): T | undefined {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value as string);
    } catch (e: any) {
      Logger.error(e);
    }
  }
}

export default new Storage();
