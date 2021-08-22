class DataStore {
  constructor() {
    this.data = {};
  }

  add(key, val) {
    this.data[key] = {
      name: key,
      resolution: val,
      regTime: (new Date()).getTime(),
    };

    return true;
  }

  get(key) {
    if (!(key in this.data)) {
      return false;
    }
    return this.data[key];
  }

  delete(key) {
    if (!(key in this.data)) {
      return false;
    }
    delete this.data[key];

    return true;
  }
}

const resolutionMemoryStorage = new DataStore();
export { resolutionMemoryStorage };
