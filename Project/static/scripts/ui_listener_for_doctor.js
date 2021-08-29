import createReq from './http-req.js';

const displayPatientNameForDoctor = document.getElementById('display_patient_name_for_doctor');
const nextBtnForDoctor = document.getElementById('next_btn');

const doctorResolution = document.getElementById('resolution_text');
const addBtnForResolution = document.getElementById('btn_for_resolution');

const inputForSearchResolution = document.getElementById('show_resolution_input');
const showResolutionBtn = document.getElementById('show_resolution_btn');
const textAreaForResolution = document.getElementById('text_area_for_doctor_resolution');
const deleteResolutionBtn = document.getElementById('del_resolution_btn');
const deleteResolutionID = document.getElementById('del_resolution_id');

nextBtnForDoctor.addEventListener('click', async () => {
  try {
    const response = await fetch('/doctor/next_in_queue');
    const data = await response.json();
    displayPatientNameForDoctor.textContent = data;
  } catch (err) {
    console.log('Request failed', err);
  }
});

addBtnForResolution.addEventListener('click', async () => {
  if(displayPatientNameForDoctor.textContent === ''||doctorResolution.value === ''){
    return false;
  }
  try {
    const response = await createReq('/doctor/resolution', doctorResolution.value, 'POST');
    console.log(response);
    const data = await response.json();
    console.log(data);
    displayPatientNameForDoctor.textContent = '';
  } catch (err) {
    console.log('Request failed', err);
  }

  doctorResolution.value = '';
});

showResolutionBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(`/doctor/resolution_patient/${inputForSearchResolution.value}`);
    const data = await response.json();
    console.log(data);

    textAreaForResolution.value = data;
  } catch (err) {
    console.log('Request failed', err);
  }
});
deleteResolutionBtn.addEventListener('click', async () => {
  try {
    console.log(inputForSearchResolution.value);
    const response = await createReq('/doctor/resolution', deleteResolutionID.value, 'DELETE');
    console.log(response);
    const data = await response.json();
    console.log(data);
    textAreaForResolution.value = data;
    setTimeout(() => {
      textAreaForResolution.value = '';
    }, 1000);
  } catch (err) {
    console.log('Request failed', err);
  }
});
