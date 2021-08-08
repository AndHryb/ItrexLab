import { resolutionDS } from '../model/data_store.js';
import { PatientQueue } from '../model/queue.js';
import Request from '../support/request.js';

resolutionDS.add('Andrei', 'bla bla bla');
console.log(resolutionDS.data);

export function getResolution(reqBody) {
  const res = new Request();
  if (!(reqBody === 0)) { res.status = 200; }
  if (reqBody === 0) { res.status = 400; }
  if (res.status !== 200) {
    return res;
  }
  if (!(reqBody in resolutionDS.data)) {
    res.status = 400;
    res.value = `The patient ${reqBody} not found in the database`;
    return res;
  }
  res.value = resolutionDS.get(reqBody);
  return res;
}
export function addResolution(reqBody) {
  const res = new Request();
  if (!(reqBody === 0)) { res.status = 200; }
  if (reqBody === 0) { res.status = 400; }
  if (res.status !== 200) {
    return res;
  }
  if (PatientQueue.queue.length === 0) {
    res.status = 400;
    res.value = 'Can\'t added resolution. There is no one in the queue';
    return res;
  }
  const nextInQueuePatientName = PatientQueue.remove();
  res.value = resolutionDS.add(nextInQueuePatientName, reqBody);
  return res;
}
export function  deleteResolution(reqBody){
  const res = new Request();
  if (!(reqBody === 0)) { res.status = 200; }
  if (reqBody === 0) { res.status = 400; }
  if (res.status !== 200) {
    return res;
  }
  if (!(reqBody in resolutionDS.data)) {
    res.status = 400;
    res.value = `The patient ${reqBody} not found in the database`;
    return res;
  }
  res.value = resolutionDS.remove(reqBody);
  return res;
}