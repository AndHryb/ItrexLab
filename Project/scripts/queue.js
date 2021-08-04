(function (window) {
  const App = window.App || {};

  class Queue {
    constructor(queue) {
      this.queue = queue || [];
    }

    get() {
      if (this.queue.length === 0) {
        return false;
      }
      return this.queue[this.queue.length - 1];
    }

    add(name) {
      if (name === '') {
        return false;
      }
      this.queue.unshift(name);
      this.update();
    }

    remove() {
      if (this.queue.pop() === undefined) {
        return false;
      }
      const removedPatient = this.queue.pop();
      console.log(removedPatient);
      this.update();
      return removedPatient;
    }

    update() {
      localStorage.queue = JSON.stringify(this.queue);
    }
  }
  App.Queue = Queue;
  window.App = App;
}(window));
