export default class DataStore {
  constructor(TTL) {
    this.data = {};
    this.TTL = TTL;
  }

  add(key, val) {
    this.data[key] = {};
    this.data[key].resolution = val;
    this.data[key].regTime = (new Date()).getTime();
    return true;
  }

  get(key) {
    if (!(key in this.data)) {
      return false;
    }
    return this.data[key];
  }

  getAll() {
    return this.data;
  }

  remove(key) {
    delete this.data[key];
    return true;
  }
}

const resolutionDS = new DataStore(10000); // TTL  10 sec
export { resolutionDS };
