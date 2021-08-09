export default class DataStore {
  constructor(TTL) {
    this.data = {};
    this.TTL = TTL;
  }

  add(key, val) {
    this.data[key] = {};
    this.data[key].resolution = val;
    this.data[key].regTime = (new Date()).getTime();
    return `resolution for ${key} added`;
  }

  get(key) {
    if(!(key in this.data)){
      return 'The patient\'s request was not processed by the doctor. Sign up for an appointment if you haven\'t already done so';
    }
    if ((new Date()).getTime() - this.TTL <= (new Date()).getTime() - this.data[key].regTime) {
      return 'The resolution has expired';
    }

    return this.data[key].resolution;
  }

  getAll() {
    return this.data;
  }

  remove(key) {
    delete this.data[key];
    return `${key} resolution deleted`;
  }
}

const resolutionDS = new DataStore(2592000000); //TTL 30 days
export { resolutionDS };
