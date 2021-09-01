import createReq from './http-req.js';

const displayPatientName = document.getElementById('display_patient_name');

const inputForPatientName = document.getElementById('enter_patient_name');
const patientInputValidation = document.getElementById('patient_input_validation');
const addBtnForPatientName = document.getElementById('add_patient_name');
const searchForPatientName = document.getElementById('search_for_patient');
const textAreaForPatient = document.getElementById('resolution_for_patient');

addBtnForPatientName.addEventListener('click', async () => {
  try {
    console.log(inputForPatientName.value);
    const response = await createReq('patient/in_queue', inputForPatientName.value, 'POST');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log('Request failed', err);
  }
  inputForPatientName.value = '';
});

inputForPatientName.addEventListener('blur', () => {
  if (inputForPatientName.value === '') {
    patientInputValidation.textContent = 'incorrect name';
    return false;
  }
  patientInputValidation.textContent = '';
  return true;
});

searchForPatientName.addEventListener('change', async () => {
  try {
    console.log(searchForPatientName.value);
    const response = await fetch(`doctor/resolution_patient/${searchForPatientName.value}`);
    console.log(response);
    const data = await response.json();
    textAreaForPatient.value = data;
  } catch (err) {
    console.log('Request failed', err);
  }
});

const subscribe = async () => {
  const eventSource = new EventSource('/patient/connect');
  eventSource.onmessage = function (event) {
    const result = JSON.parse(event.data);
    displayPatientName.textContent = result;
  };
};

subscribe();

window.addEventListener('load', async () => {
  try {
    const response = await fetch('/patient/next_in_queue');
    const data = await response.json();
    displayPatientName.textContent = data;
  } catch (err) {
    console.log('Request failed', err);
  }
});
