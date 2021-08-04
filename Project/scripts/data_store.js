(function (window) {
  const App = window.App || {};

  class DataStore {
    constructor(data) {
      this.data = data || {};
    }

    add(key, val) {
      this.data[key] = val;
      this.update();
    }

    get(key) {
      return this.data[key];
    }

    getAll() {
      return this.data;
    }

    remove(key) {
      delete this.data[key];
      this.update();
    }

    update() {
      localStorage.data = JSON.stringify(this.data);
      this.data = JSON.parse(localStorage.data);
    }
  }
  App.DataStore = DataStore;
  window.App = App;
}(window));
