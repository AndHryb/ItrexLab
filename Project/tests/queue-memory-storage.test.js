import { queueMemoryStorage } from '../queue/storages/queue-memory-storage.js';

describe('queue service unit tests', () => {
  let queueTestArr;

  beforeEach(() => {
    queueTestArr = ['Andrei', 'Bob', 'Sergio'];
  });

  test('method add', () => {
    const res = queueMemoryStorage.add(queueTestArr[0]);
    expect(res).toEqual(queueTestArr[0]);
  });

  test('method get', () => {
    queueMemoryStorage.queue = queueTestArr;
    const res = queueMemoryStorage.get();
    expect(res).toEqual(queueTestArr[0]);
  });

  test('method get(queue is empty)', () => {
    queueMemoryStorage.queue = [];
    const res = queueMemoryStorage.get();
    expect(res).toEqual(false);
  });

  test('method delete', () => {
    const firstElem = queueTestArr[0];
    queueMemoryStorage.queue = queueTestArr;
    const res = queueMemoryStorage.delete();
    expect(res).toEqual(firstElem);
  });

  test('method delete(queue is empty)', () => {
    queueMemoryStorage.queue =[];
    const res = queueMemoryStorage.delete();
    expect(res).toEqual(false);
  });

  test('method getLength', () => {
    queueMemoryStorage.queue = queueTestArr;
    const res = queueMemoryStorage.getLength();
    expect(res).toEqual(3);
  });

  test('method getLength(queue is empty)', () => {
    queueMemoryStorage.queue = [];
    const res = queueMemoryStorage.getLength();
    expect(res).toEqual(0);
  });
});
