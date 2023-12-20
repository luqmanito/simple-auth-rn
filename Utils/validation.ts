import { Credentials } from "../models/Credential";

export const isEmailValid = (email: string): boolean => {
  if (email.trim() === "") return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPasswordValid = (password: string): boolean => {
  if (password.trim() === "") return true;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const doPasswordsMatch = (
  password: string,
  passwordConfirmation: string
): boolean => {
  if (password && passwordConfirmation) {
    return password === passwordConfirmation;
  }
  return true;
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim() !== "";
};

export const areAllFieldsValid = (credentials: Credentials): boolean => {
  const emailValidation =
    credentials.username.trim() === "" || isEmailValid(credentials.username);
  const passwordValidation =
    credentials.password.trim() === "" || isPasswordValid(credentials.password);
  const isPasswordConfirmationValidation =
    credentials.password_confirmation.trim() === "" ||
    doPasswordsMatch(credentials.password, credentials.password_confirmation);

  return (
    isNotEmpty(credentials.username) &&
    isNotEmpty(credentials.password) &&
    isNotEmpty(credentials.password_confirmation) &&
    emailValidation &&
    passwordValidation &&
    isPasswordConfirmationValidation
  );
};
