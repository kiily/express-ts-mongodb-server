import { ICustomResponse } from '../interfaces';

export function handleError(error: Error): ICustomResponse {
  let statusCode;
  if (error.message.includes('No user matching id')) {
    statusCode = 404;
  } else {
    statusCode = 400;
  }
  return { statusCode, message: error.message };
}
