import React from "react";
import { InputEvent, User } from "../../../types";
import { ButtonEvent } from "../../../types";
import Input from "../../common/inputs/Input";
import * as RegexUtils from "../../../utils/regexUtils";

export interface IUserFormProps {
  buttonText: string;
  headerText: string;
  help: User;
  recaptcha: boolean;
  submitButtonText: string;
  user: User;
  onButton: ButtonEvent;
  onSubmit: ButtonEvent;
}

const UserForm: React.FC<IUserFormProps> = ({
  buttonText,
  headerText,
  help,
  recaptcha,
  submitButtonText,
  user,
  onSubmit
}): JSX.Element => {
  const [repeatPassword, setRepeatPassword] = React.useState<string>("");
  const [repeatPasswordMessage, setRepeatPasswordMessage] = React.useState<
    string
  >("");
  const [currentValues, setCurrentValues] = React.useState<User>(user);
  const [currentMessages, setCurrentMessages] = React.useState<User>(help);

  const validatePassword = (): boolean => {
    const { password } = user;

    if (password.length === 0) {
      setCurrentMessages({
        password: "",
        ...currentMessages
      });
      return false;
    } else if (password.length < 8) {
      setCurrentMessages({
        password: "Password must be at least 8 characters long.",
        ...currentMessages
      });
      return false;
    } else if (!RegexUtils.containsLowercase(password)) {
      setCurrentMessages({
        password: "Password must contain a lower case letter.",
        ...currentMessages
      });
      return false;
    } else if (!RegexUtils.containsUppercase(password)) {
      setCurrentMessages({
        password: "Password must contain an upper case letter.",
        ...currentMessages
      });
      return false;
    } else if (!RegexUtils.containsNumber(password)) {
      setCurrentMessages({
        password: "Password must contain a number.",
        ...currentMessages
      });
      return false;
    } else if (!RegexUtils.containsSpecialCharacter(password)) {
      setCurrentMessages({
        password: "Password must contain a special character.",
        ...currentMessages
      });
      return false;
    } else {
      setCurrentMessages({
        password: "",
        ...currentMessages
      });
      return true;
    }
  };

  const validateEmail = (): boolean => {
    const { email } = user;
    if (email.length === 0) {
      setCurrentMessages({
        email: "",
        ...currentMessages
      });
      return false;
    } else if (!RegexUtils.validEmail(email)) {
      setCurrentMessages({
        email: "Invalid email.",
        ...currentMessages
      });
      return false;
    } else {
      setCurrentMessages({
        email: "",
        ...currentMessages
      });
      return true;
    }
  };

  const validatePhoneNumber = (): boolean => {
    const { phoneNumber } = user;

    if (phoneNumber.length === 0) {
      setCurrentMessages({
        phoneNumber: "",
        ...currentMessages
      });
      return false;
    } else if (
      !RegexUtils.containsOnlyNumbers(phoneNumber) ||
      phoneNumber.length > 10 ||
      phoneNumber.length < 10
    ) {
      setCurrentMessages({
        phoneNumber: "Invalid phone number. Format: ##########",
        ...currentMessages
      });
      return false;
    } else {
      setCurrentMessages({
        phoneNumber: "",
        ...currentMessages
      });
      return true;
    }
  };

  React.useEffect(() => {
    validatePassword();
  }, [user.password]);

  React.useEffect(() => {
    validateEmail();
  }, [user.email]);

  React.useEffect(() => {
    validatePhoneNumber();
  }, [user.phoneNumber]);

  React.useEffect(() => {
    const { password } = user;
    if (repeatPassword !== password) {
      setRepeatPasswordMessage("Passwords do not match.");
    } else {
      setRepeatPasswordMessage("");
    }
  }, [user.password, repeatPassword]);

  const handleChange = async (event: InputEvent): Promise<void> => {
    event.preventDefault();
    const { id, value } = event.target;

    if (id === "repeatPassword") {
      setRepeatPassword(value);
    } else {
      setCurrentValues({
        [id]: value,
        ...currentValues
      });
    }
  };

  const Inputs: JSX.Element = (
    <React.Fragment>
      <Input
        autoCapitalize="true"
        autoComplete="first-name"
        id="firstName"
        onChange={handleChange}
        placeholder="First Name"
        type="text"
        value={currentValues.firstName || ""}
      />
      <Input
        autoCapitalize="true"
        autoComplete="last-name"
        id="lastName"
        onChange={handleChange}
        placeholder="Last Name"
        type="text"
        value={currentValues.lastName || ""}
      />
      <Input
        autoComplete="email"
        helpText={currentMessages.email || ""}
        id="email"
        onChange={handleChange}
        placeholder="Email"
        type="text"
        value={currentValues.email || ""}
      />
      <Input
        autoComplete="phone-number"
        helpText={currentMessages.username || ""}
        id="username"
        onChange={handleChange}
        placeholder="Username"
        type="text"
        value={currentValues.username || ""}
      />
      <Input
        autoComplete="city"
        helpText={currentMessages.city || ""}
        id="city"
        onChange={handleChange}
        placeholder="City"
        type="text"
        value={currentValues.city || ""}
      />
      <Input
        autoComplete="state"
        helpText={currentMessages.state || ""}
        id="state"
        onChange={handleChange}
        placeholder="State"
        type="text"
        value={currentValues.state || ""}
      />
      <Input
        autoComplete="password"
        helpText={currentMessages.password}
        id="password"
        onChange={handleChange}
        placeholder="Password"
        type="password"
        value={currentValues.password}
      />
      <Input
        helpText={repeatPasswordMessage}
        id="repeatPassword"
        onChange={handleChange}
        placeholder="Repeat Password"
        type="password"
        value={repeatPassword}
      />
    </React.Fragment>
  );

  return <React.Fragment></React.Fragment>;
};

export default UserForm;
