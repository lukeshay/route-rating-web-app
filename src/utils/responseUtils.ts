import { toast } from 'react-toastify';
import { ErrorResponse } from '../types/responses';

export const isOk = (response: Response | void): boolean =>
  response !== undefined && response instanceof Response && response.ok;

export const toastIfNotOk = (
  response: Response | void,
  toastMessage: string
): boolean => {
  if (!isOk(response)) {
    toast.error(toastMessage);
    return false;
  }
  return true;
};

export const isEmailTaken = (responseBody: ErrorResponse): boolean =>
  responseBody.error.trim() === 'Email taken.';

export const isUsernameTaken = (responseBody: ErrorResponse): boolean =>
  responseBody.error.trim() === 'Username taken.';
