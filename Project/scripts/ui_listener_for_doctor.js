(function (window) {
  const App = window.App || {};
  function addListenerForDoctorUI() {
    const displayPatientNameForDoctor = document.getElementById('display_patient_name_for_doctor');
    const nextBtnForDoctor = document.getElementById('next_btn');

    const doctorResolution = document.getElementById('resolution_text');
    const addBtnForResolution = document.getElementById('btn_for_resolution');

    const inputForSearchResolution = document.getElementById('show_resolution_input');
    const showResolutionBtn = document.getElementById('show_resolution_btn');
    const textAreaForResolution = document.getElementById('text_area_for_doctor_resolution');
    const deleteResolutionBtn = document.getElementById('del_resolution_btn');

    nextBtnForDoctor.addEventListener('click', () => {
      if (!window.myDoctor.startAppointment()) {
        displayPatientNameForDoctor.textContent = 'The queue is empty';
        return false;
      }
      displayPatientNameForDoctor.textContent = window.myDoctor.startAppointment();
    });
    addBtnForResolution.addEventListener('click', () => {
      window.myDoctor.addResolution(doctorResolution.value);
      doctorResolution.value = '';
    });
    showResolutionBtn.addEventListener('click', () => {
      if (!inputForSearchResolution.value) {
        console.log('fill the patient name');
        return false;
      }
      if (!(inputForSearchResolution.value in window.myDoctor.db.data)) {
        console.log('patient not found in data base');
        return false;
      }
      textAreaForResolution.value = window.myDoctor.getResolution(inputForSearchResolution.value);
    });
    deleteResolutionBtn.addEventListener('click', () => {
      window.myDoctor.delResolution(inputForSearchResolution.value);
      textAreaForResolution.value = '';
      inputForSearchResolution.value = '';
    });
  }

  App.addListenerForDoctorUI = addListenerForDoctorUI;
  window.App = App;
}(window));
