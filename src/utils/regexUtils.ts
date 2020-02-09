export const validEmail = (email: string): boolean =>
  email !== null &&
  email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ) !== null;

export const containsLowercase = (str: string): boolean =>
  str !== null && str.match(/[a-z]/g) !== null;

export const containsUppercase = (str: string): boolean =>
  str !== null && str.match(/[A-Z]/g) !== null;

export const containsNumber = (str: string): boolean =>
  str !== null && str.match(/[0-9]/g) !== null;

export const containsSpecialCharacter = (str: string): boolean =>
  str !== null && str.match(/[!@#$%^&*()\[\],.?":{}|<>]/g) !== null;

export const containsOnlyNumbers = (str: string): boolean =>
  str !== null &&
  !containsLowercase(str) &&
  !containsUppercase(str) &&
  !containsSpecialCharacter(str);
