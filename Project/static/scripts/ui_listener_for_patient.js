import { authClient } from './auth-api.js';

authClient.getCookieToken('token');

const displayPatientName = document.getElementById('display_patient_name');
const accountName = document.getElementById('account_name');
const addBtnForPatientName = document.getElementById('add_patient_name');
const resolutionTable = document.getElementById('resolution_for_patient');
const dropDownSpec = document.getElementById("speciality-list");

addBtnForPatientName.addEventListener('click', async () => {

  const dropDownDoc = document.getElementById('doctors-list');
  try {
    let response = await fetch('/patient/in-queue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ docID: dropDownDoc.value })
    });

    response = await response.json();
    console.log(response);
  } catch (err) {
    console.log(err);
  }

  /*
  try {
    const response = await authClient.client.post('patient/in-queue');
    const data = await response.data;
    console.log(data);
  } catch (err) {
    console.log('Request failed', err);
  }*/
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
    const response = await authClient.client.get('/patient/next-in-queue');
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
    const response = await authClient.client.get('/doctor/resolution/me');
    const data = await response.data;
 
    if (data.resolution.length > 0) {
      data.resolution.forEach((elem) => {
        const arr = elem.createdAt.split('T');
        const time = arr[1].substr(0,8);
        
        const tr = document.createElement('tr');
        const contentTd = document.createElement('td');
        contentTd.innerHTML = elem.resolution;
        tr.appendChild(contentTd);

        const specialTd = document.createElement('td');
        specialTd.innerHTML = elem.speciality;
        tr.appendChild(specialTd);

        const createdAtTd = document.createElement('td');
        createdAtTd.innerHTML = `${arr[0]} | ${time}`;
        tr.appendChild(createdAtTd);

        const createdByTd = document.createElement('td');
        createdByTd.innerHTML = elem.doctor.name;
        tr.appendChild(createdByTd);

        resolutionTable.appendChild(tr);
      });
    }
  } catch (err) {
    console.log('Request failed', err);
  }

  try {
    const response = await fetch('/doctor/all');
    const doctors = await response.json();

    const spec = new Set();
    doctors.forEach((elem) => {
      const { specialties } = elem;
      specialties.forEach((elem1) => spec.add(elem1.name))
    });

    for (let elem of spec) {
      let opt = document.createElement('option');
      opt.setAttribute('value', `${elem}`)
      opt.innerHTML = elem;
      dropDownSpec.appendChild(opt);
    }

    dropDownSpec.addEventListener('change', createDoctors);

    function createDoctors(event) {
      const dropDownDoc = document.getElementById('doctors-list');
      const spec = event.target.value;
      const docList = doctors.filter((elem) => {
        const { specialties } = elem;
        return specialties.find((elem) => elem.name === spec);
      });


      dropDownDoc.remove();
      let select = document.createElement('select');
      select.setAttribute('id', 'doctors-list');
      addBtnForPatientName.before(select);

      docList.forEach((elem) => {
        let opt = document.createElement('option');
        opt.setAttribute('value', `${elem.id}`)
        opt.innerHTML = elem.name;
        select.appendChild(opt);
      })
    }
  } catch (err) {
    console.log(err);
  }
});
