const displayPatientNameForDoctor = document.getElementById('display_patient_name_for_doctor');
const nextBtnForDoctor = document.getElementById('next_btn');

const doctorResolution = document.getElementById('resolution_text');
const addBtnForResolution = document.getElementById('btn_for_resolution');

const inputForSearchResolution = document.getElementById('show_resolution_input');
const showResolutionBtn = document.getElementById('show_resolution_btn');
const textAreaForResolution = document.getElementById('text_area_for_doctor_resolution');
const deleteResolutionBtn = document.getElementById('del_resolution_btn');

async function createPostReq(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  });
}

nextBtnForDoctor.addEventListener('click', async () => {
  try {
    const response = await fetch('/next_in_queue');
    displayPatientNameForDoctor.textContent = await response.json();
  } catch (err) {
    console.log('Request failed', err);
  }
});

addBtnForResolution.addEventListener('click', async () => {
  try {
    const response = await createPostReq('/add_resolution', doctorResolution.value);
    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log('Request failed', err);
  }

  doctorResolution.value = '';
});

showResolutionBtn.addEventListener('click', async () => {
  try {
    const response = await createPostReq('/show_resolution', inputForSearchResolution.value);
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
    const response = await createPostReq('/delete_resolution', inputForSearchResolution.value);
    const data = await response.json();
    console.log(data);
    textAreaForResolution.value = data;
    setTimeout(() => {
      textAreaForResolution.value = '';
    }, 3000);
  } catch (err) {
    console.log('Request failed', err);
  }
});
