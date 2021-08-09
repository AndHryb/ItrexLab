import { PatientQueue } from '../storage/queue.js';
import Request from '../helpers/request.js';

export function addToQueue(reqBody) {
  const res = new Request();
  if (!(reqBody === 0)) { res.status = 200; }
  if (reqBody === '') {
    res.status = 400;
    res.value = 'the name input cannot be empty';
  }
  if (res.status !== 200) {
    return res;
  }

  if (/\d/g.test(reqBody)) {
    res.status = 400;
    res.value = 'The patient\'s name should not contain numbers';
    return res;
  }
  res.value = PatientQueue.add(reqBody);

  console.log(PatientQueue.queue);
  return res;
}

export function getNext(reqBody) {
  const res = new Request();
  if (!(reqBody === 0)) { res.status = 200; }
  if (reqBody === 0) { res.status = 400; }
  if (res.status !== 200) {
    return res;
  }
  res.value = PatientQueue.get(reqBody);
  return res;
}
