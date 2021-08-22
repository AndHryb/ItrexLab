export default class ResolutionService {
  constructor(resolutionDS) {
    this.DS = resolutionDS;
  }

  async add(key, val) {
    try {
      const result = await this.DS.add(key, val);

      return result;
    } catch (err) {
      console.log(`Resolution service add error :${err.name} : ${err.message}`);
    }
  }

  async get(key) {
    try {
      const result = await this.DS.get(key);
      return result;
    } catch (err) {
      console.log(`Resolution service get error :${err.name} : ${err.message}`);
    }
  }

  async delete(key) {
    try {
      const result = await this.DS.delete(key);
      return result;
    } catch (err) {
      console.log(`Resolution service delete error :${err.name} : ${err.message}`);
    }
  }
}
