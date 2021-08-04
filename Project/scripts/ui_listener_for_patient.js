(function (window) {
  const App = window.App || {};
  function addListenerForPatientUI() {
    const displayPatientName = document.getElementById('display_patient_name');
    const inputForPatientName = document.getElementById('enter_patient_name');
    const patientInputValidation = document.getElementById('patient_input_validation');
    const addBtnForPatientName = document.getElementById('add_patient_name');
    const searchForPatientName = document.getElementById('search_for_patient');
    const textAreaForPatient = document.getElementById('resolution_for_patient');

    inputForPatientName.addEventListener('blur', () => {
      if (inputForPatientName.value === '') {
        patientInputValidation.textContent = 'the name field should not be empty and consist only of letters';
        return false;
      }
      displayPatientName.textContent = inputForPatientName.value;
      patientInputValidation.textContent = '';
    });
    addBtnForPatientName.addEventListener('click', () => {
      if (inputForPatientName.value) {
        window.myDoctor.makeAppointment(inputForPatientName.value);
        inputForPatientName.value = '';
      }
    });
    searchForPatientName.addEventListener('change', () => {
      if (!(window.myDoctor.db.get(searchForPatientName.value))) {
        textAreaForPatient.value = `A patient named ${searchForPatientName.value} was not found in the database`;
      } else {
        textAreaForPatient.value = window.myDoctor.db.get(searchForPatientName.value);
      }
    });
  }
  App.addListenerForPatientUI = addListenerForPatientUI;
  window.App = App;
}(window));
