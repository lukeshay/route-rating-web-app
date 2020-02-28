import { RecaptchaUser, User } from '../types';

export const createEmptyUser = (): User =>
  ({
    authority: '',
    city: '',
    country: '',
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    role: '',
    session: null,
    state: '',
    username: '',
  } as User);

export const createEmptyRecaptchaUser = (): RecaptchaUser =>
  ({
    authority: '',
    city: '',
    country: '',
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    role: '',
    session: null,
    state: '',
    username: '',
    recaptchaResponse: '',
  } as RecaptchaUser);

export const createCompleteRecaptchaUser = (
  user: RecaptchaUser
): RecaptchaUser => {
  const { username, password, email, state, recaptchaResponse } = user;
  const newUser = createEmptyRecaptchaUser();

  if (username) {
    newUser.username = username;
  }

  if (password) {
    newUser.password = password;
  }

  if (email) {
    newUser.email = email;
  }

  if (recaptchaResponse) {
    newUser.recaptchaResponse = recaptchaResponse;
  }

  if (state) {
    newUser.state = state;
  }

  return newUser;
};
