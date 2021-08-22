import createReq from "./http-req.js";

const displayPatientName = document.getElementById('display_patient_name');
const inputForPatientName = document.getElementById('enter_patient_name');
const patientInputValidation = document.getElementById('patient_input_validation');
const addBtnForPatientName = document.getElementById('add_patient_name');
const searchForPatientName = document.getElementById('search_for_patient');
const textAreaForPatient = document.getElementById('resolution_for_patient');



addBtnForPatientName.addEventListener('click', async () => {
  try {
    console.log(inputForPatientName.value);
    const response = await createReq('/in_queue', inputForPatientName.value, 'POST');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log('Request failed', err);
  }
  inputForPatientName.value = '';
});

inputForPatientName.addEventListener('blur', () => {
  if (inputForPatientName.value === '') {
    patientInputValidation.textContent = 'the name field should not be empty and consist only of letters';
    return false;
  }
  displayPatientName.textContent = inputForPatientName.value;
  patientInputValidation.textContent = '';
  return true;
});

searchForPatientName.addEventListener('change', async () => {
  try {
    console.log(searchForPatientName.value);
    const response = await fetch(`/resolution_patient/${searchForPatientName.value}`);
    console.log(response);
    const data = await response.json();
    textAreaForPatient.value = data;
  } catch (err) {
    console.log('Request failed', err);
  }
});
