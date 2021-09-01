import createReq from './http-req.js';

const formObj = document.reg_form;
let enteredDate;

function emailValid(focusWhenError) {
  const elem = formObj.elements.patient_email;
  const { value } = elem;
  const displayErr = document.getElementById('email_err');
  if (value) {
    displayErr.textContent = '';
    elem.style.borderColor = '';
    return true;
  }
  displayErr.textContent = 'fill this field';
  elem.style.borderColor = 'red';

  if (focusWhenError) {
    elem.focus();
  }

  return false;
}

document.reg_form.elements.patient_password.addEventListener('change', () => emailValid(false));

function passwordValid(focusWhenError) {
  const elem = formObj.elements.patient_password;
  const { value } = elem;
  const displayErr = document.getElementById('password_err');
  if (value) {
    displayErr.textContent = '';
    elem.style.borderColor = '';
    return true;
  }
  displayErr.textContent = 'fill this field';
  elem.style.borderColor = 'red';

  if (focusWhenError) {
    elem.focus();
  }

  return false;
}

document.reg_form.elements.patient_password.addEventListener('change', () => emailValid(false));

function nameValid(focusWhenError) {
  const elem = formObj.elements.patient_name;
  const { value } = elem;
  const displayErr = document.getElementById('name_err');
  if (value) {
    elem.style.borderColor = '';
    displayErr.textContent = '';
    return true;
  }
  displayErr.textContent = 'fill this field';
  elem.style.borderColor = 'red';

  if (focusWhenError) {
    elem.focus();
  }

  return false;
}

document.reg_form.elements.patient_name.addEventListener('change', () => nameValid(false));

function birthdayDateValid(focusWhenError) {
  const elem = formObj.elements.patient_birthday;
  const { value } = elem;
  const date = value.split('-');
  const currentDate = new Date();
  enteredDate = new Date(date[0], (date[1] - 1), date[2]);
  const timeForFillOut = 3155760000000;
  const displayErr = document.getElementById('birthday_err');
  if (enteredDate.getTime() > (currentDate.getTime() - timeForFillOut || value)) {
    elem.style.borderColor = '';
    displayErr.textContent = '';
    return true;
  }
  displayErr.textContent = 'invalid date';
  elem.style.borderColor = 'red';
  if (focusWhenError) {
    elem.focus();
  }
  return false;
}

document.reg_form.elements.patient_birthday.addEventListener('change', () => birthdayDateValid(false));

function genderValid(focusWhenError) {
  const elem = formObj.elements.patient_gender;
  const { value } = elem;
  const displayErr = document.getElementById('gender_err');
  if (value && value !== '0') {
    elem.style.borderColor = '';
    displayErr.textContent = '';
    return true;
  }
  displayErr.textContent = 'Select an item from the list';
  elem.style.borderColor = 'red';
  if (focusWhenError) {
    elem.focus();
  }
  return false;
}

document.reg_form.elements.patient_gender.addEventListener('change', () => genderValid(false));

document.reg_form.onsubmit = async function (EO) {
  let okValid = true;

  okValid = emailValid(okValid) && okValid;
  okValid = passwordValid(okValid) && okValid;
  okValid = nameValid(okValid) && okValid;
  okValid = birthdayDateValid(okValid) && okValid;
  okValid = genderValid(okValid) && okValid;
  if (!okValid) {
    return false;
  }
  EO.preventDefault();

  const formData = {
    email: formObj.elements.patient_email.value,
    password: formObj.elements.patient_password.value,
    name: formObj.elements.patient_name.value,
    birthday: enteredDate,
    gender: formObj.elements.patient_gender.value,
  };

  console.log(formData);

  try {
    const response = await createReq('/registration/form', formData, 'POST');
    console.log(response);
    const data = await response.json();
    console.log(data.message);
    window.location.href = '/patient';
  } catch (err) {
    console.log('Request failed', err);
  }
};
