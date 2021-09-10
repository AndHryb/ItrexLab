import { authClient } from './auth-api.js';

authClient.getCookieToken();

const displayPatientNameForDoctor = document.getElementById('display_patient_name_for_doctor');
const nextBtnForDoctor = document.getElementById('next_btn');

const doctorResolution = document.getElementById('resolution_text');
const addBtnForResolution = document.getElementById('btn_for_resolution');

const inputForSearchResolution = document.getElementById('show_resolution_input');
const showResolutionBtn = document.getElementById('show_resolution_btn');
const textAreaForResolution = document.getElementById('text_area_for_doctor_resolution');
const deleteResolutionBtn = document.getElementById('del_resolution_btn');
const deleteResolutionID = document.getElementById('del_resolution_id');

function arrSerialize(arr) {
  if (typeof arr !== 'object') {
    return false;
  }

  let value = '';

  for (const elem of arr) {
    let resolutionStr = '';
    elem.resolutions.forEach((elem, i) => {
      const result = `
        resolution = ${elem.resolution}
        resolutionId = ${elem.id}
        `;
      resolutionStr += result;
    });
    const str = `
    name: ${elem.name},
    resolutions :{ ${resolutionStr} }
    registration date: ${new Date(elem.regTime)}
    `;
    value += str;
  }

  return value;
}

async function gettCurrent() {
  try {
    const response = await authClient.client.get('/patient/next-in-queue');
    const data = await response.data;
    return data;
  } catch (err) {
    console.log('Request failed', err);
  }
}

nextBtnForDoctor.addEventListener('click', async () => {
  try {
    const response = await authClient.client.get('/patient/next-in-queue');
    const data = await response.data;
    displayPatientNameForDoctor.textContent = data;
  } catch (err) {
    console.log('Request failed', err);
  }
});

addBtnForResolution.addEventListener('click', async () => {
  if (doctorResolution.value === '' || await gettCurrent() !== displayPatientNameForDoctor.textContent) {
    return false;
  }
  try {
    console.log(doctorResolution.value);
    const response = await authClient.client.post('/doctor/resolution', { value: doctorResolution.value });
    const data = await response.data;
    if (data.name) {
      console.log(`Resolution for ${data.name} added`);
    } else { console.log(data); }
  } catch (err) {
    console.log('Request failed', err);
  }

  doctorResolution.value = '';
});

showResolutionBtn.addEventListener('click', async () => {
  try {
    const response = await authClient.client.get(`/doctor/resolution-patient?name=${inputForSearchResolution.value}`);
    const data = await response.data;
    textAreaForResolution.value = arrSerialize(data.resolutions) || data.message;
  } catch (err) {
    console.log('Request failed', err);
  }
});
deleteResolutionBtn.addEventListener('click', async () => {
  try {
    const response = await authClient.client.delete('/doctor/resolution', { data: { value: deleteResolutionID.value } });
    const data = await response.data;
    textAreaForResolution.value = data.message;
    setTimeout(() => {
      textAreaForResolution.value = '';
    }, 1000);
  } catch (err) {
    console.log('Request failed', err);
  }
});
