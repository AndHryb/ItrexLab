export const MAX_LENGTH = 30;

export const MIN_LENGTH = 2;

export const MIN_PASSWORD_LENGTH = 4;


export const STATUSES = {
  OK: 200,
  Created: 201,
  NoContent: 204,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  RequestTimeout: 408,
  Conflict: 409,
  PreconditionFailed: 412,
  ServerError: 500,
  Unavailable: 503,
};

const TTL = 10000; // 10 sec
export { TTL };
