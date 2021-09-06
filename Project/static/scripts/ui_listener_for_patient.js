import { authClient } from './auth-api.js';

console.log('check token patient page>>>>');
console.log(authClient.token);
authClient.getCookieToken('token');
console.log(authClient.token);

const displayPatientName = document.getElementById('display_patient_name');
const accountName = document.getElementById('account_name');
const addBtnForPatientName = document.getElementById('add_patient_name');
const textAreaForPatient = document.getElementById('resolution_for_patient');

addBtnForPatientName.addEventListener('click', async () => {
  try {
    const response = await authClient.client.get('patient/in_queue');
    const data = await response.data;
    console.log(data);
  } catch (err) {
    console.log('Request failed', err);
  }
});

// window.addEventListener('load', async () => {
//   try {
//     const response = await authClient.client.get('doctor/resolution_patient');
//     const data = await response.data;
//     console.log(data);
//     textAreaForPatient.value = data.resolution || data.message;
//   } catch (err) {
//     console.log('Request failed', err);
//   }
// });

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
    const response = await authClient.client.get('/patient/next_in_queue');
    const data = await response.data;
    displayPatientName.textContent = data;
  } catch (err) {
    console.log('Request failed', err);
  }

  try {
    const UserResponse = await authClient.client.get('/auth/username');
    const userData = await UserResponse.data;
    accountName.textContent = userData.patient.name;
  } catch (err) {
    console.log('Request failed', err);
  }

  try {
    const response = await authClient.client.get('/doctor/resolution_patient');
    const data = await response.data;
    console.log(data);
    textAreaForPatient.value = data.message || data.resolution.resolution;
  } catch (err) {
    console.log('Request failed', err);
  }
});
