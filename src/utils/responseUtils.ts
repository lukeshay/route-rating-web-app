import { toast } from "react-toastify";
import { ErrorResponse } from "../types/responses";

export const isOk = (response: Response | void): boolean =>
  response !== undefined && response instanceof Response && response.ok;

export const toastIfNotOk = (
  response: Response | void,
  toastMessage: string
): void => {
  if (!isOk(response)) {
    toast.error(toastMessage);
  }
};

export const isEmailTaken = (responseBody: ErrorResponse): boolean =>
  responseBody.error.trim() === "Email taken.";

export const isUsernameTaken = (responseBody: ErrorResponse): boolean =>
  responseBody.error.trim() === "Username taken.";
