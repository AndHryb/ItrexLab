import { PatientQueue } from '../model/queue.js';
import Request from '../support/request.js';

export function addToQueue(reqBody) {
  const res = new Request();
  if (!(reqBody === 0)) { res.status = 200; }
  if (reqBody === 0) { res.status = 400; }
  if (res.status !== 200) {
    return res;
  }
  res.value = PatientQueue.add(reqBody);

  console.log(PatientQueue.queue);
  return res;
}

export function getNext(reqBody){
  const res = new Request();
  if (!(reqBody === 0)) { res.status = 200; }
  if (reqBody === 0) { res.status = 400; }
  if (res.status !== 200) {
    return res;
  }
  res.value = PatientQueue.get(reqBody);
  return res;
}
