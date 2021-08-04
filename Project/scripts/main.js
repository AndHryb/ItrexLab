(function () {
  const { App } = window;
  let dataLS;
  if (localStorage.getItem('data') != undefined) {
    dataLS = JSON.parse(localStorage.data);
  }
  let queueLS;
  if (localStorage.getItem('queue') != undefined) {
    queueLS = JSON.parse(localStorage.queue);
  }
  const { Queue } = window.App;
  const { DataStore } = window.App;
  const { PatientHandler } = window.App;
  const myDoctor = new PatientHandler('DrName', new DataStore(dataLS), new Queue(queueLS));
  const { addListenerForPatientUI } = window.App;
  const { addListenerForDoctorUI } = window.App;
  window.myDoctor = myDoctor;
  window.addEventListener('storage', () => {
    window.myDoctor.db = JSON.parse(localStorage.data);
    window.myDoctor.queue = JSON.parse(localStorage.queue);
  });

  try {
    addListenerForPatientUI();
  } catch (err) {
    console.log(err);
  }
  try {
    addListenerForDoctorUI();
  } catch (err) {
    console.log(err);
  }
}());
