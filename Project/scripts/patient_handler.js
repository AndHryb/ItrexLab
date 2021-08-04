(function (window) {
  const App = window.App || {};
  class PatientHandler {
    constructor(doctorId, db, patientQueue) {
      this.doctorID = doctorId;
      this.db = db;
      this.patientQueue = patientQueue;
    }

    makeAppointment(name) {
      this.patientQueue.add(name);
      console.log(`added an appointment to Dr. ${this.doctorID} patient ${name}`);
    }

    startAppointment() {
      if (!this.patientQueue.get()) {
        return false;
      }
      return this.patientQueue.get();
    }

    addResolution(resolution) {
      if (!this.patientQueue.get()) {
        console.log('The queue is empty');
        return false;
      }
      const name = this.patientQueue.remove();
      console.log(`Dr. ${this.doctorID}  added resolution to patient ${name}`);
      this.db.add(name, resolution);
    }

    getResolution(name) {
      return this.db.get(name);
    }

    delResolution(name) {
      this.db.remove(name);
      console.log(`Recalution for patient ${name} deleted`);
    }
  }

  App.PatientHandler = PatientHandler;
  window.App = App;
}(window));
