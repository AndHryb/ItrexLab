import { queueInmemoryRepository } from '../queue/repository/queue-inmemory-repository.js';

describe('queueRepository unit tests', () => {
  let queueTestArr;

  beforeEach(() => {
    queueTestArr = ['Andrei', 'Bob', 'Sergio'];
  });

  test('method add', () => {
    const res = queueInmemoryRepository.add(queueTestArr[0]);
    expect(res).toEqual(queueTestArr[0]);
    expect(queueInmemoryRepository.queue[0]).toEqual(queueTestArr[0]);
    expect(queueInmemoryRepository.queue.length).toEqual(1);
  });

  test('method get', () => {
    queueInmemoryRepository.queue = queueTestArr;
    const res = queueInmemoryRepository.get();
    expect(res).toEqual(queueTestArr[0]);
    expect(queueInmemoryRepository.queue.length).toEqual(3);
  });

  test('method get(queueRepository is empty)', () => {
    queueInmemoryRepository.queue = [];
    const res = queueInmemoryRepository.get();
    expect(res).toEqual(false);
    expect(queueInmemoryRepository.queue.length).toEqual(0);
  });

  test('method delete', () => {
    const firstElem = queueTestArr[0];
    queueInmemoryRepository.queue = queueTestArr;
    const res = queueInmemoryRepository.delete();
    expect(res).toEqual(firstElem);
    expect(queueInmemoryRepository.queue.length).toEqual(2);
  });

  test('method delete(queueRepository is empty)', () => {
    queueInmemoryRepository.queue = [];
    const res = queueInmemoryRepository.delete();
    expect(res).toEqual(false);
    expect(queueInmemoryRepository.queue.length).toEqual(0);
  });

  test('method getLength', () => {
    queueInmemoryRepository.queue = queueTestArr;
    const res = queueInmemoryRepository.getLength();
    expect(res).toEqual(3);
  });

  test('method getLength(queueRepository is empty)', () => {
    queueInmemoryRepository.queue = [];
    const res = queueInmemoryRepository.getLength();
    expect(res).toEqual(0);
  });
});