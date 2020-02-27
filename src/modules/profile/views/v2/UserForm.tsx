import * as RegexUtils from '../../../../utils/regexUtils';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '../../../common/buttons/ButtonSecondary';
import Form from '../../../common/forms/Form';
import Input from '../../../common/inputs/Input';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { ButtonEvent } from '../../../../types';
import { HandlerReturn, InputEvent, User } from '../../../../types';
import { RecaptchaUser } from '../../../../types';
import { useViewContext } from '../../../../context/view/viewStore';

export interface IUserFormProps {
  buttonText: string;
  headerText: string;
  help: RecaptchaUser;
  id: string;
  recaptcha: boolean;
  submitButtonText: string;
  user: RecaptchaUser;
  onButtonClick(event: ButtonEvent): HandlerReturn;
  onSubmit(user: User | RecaptchaUser): HandlerReturn;
}

const UserForm: React.FC<IUserFormProps> = ({
  buttonText,
  headerText,
  help,
  id,
  onButtonClick,
  onSubmit,
  recaptcha,
  submitButtonText,
  user,
}): JSX.Element => {
  const { state: viewState } = useViewContext();
  const [repeatPassword, setRepeatPassword] = React.useState<string>('');
  const [repeatPasswordMessage, setRepeatPasswordMessage] = React.useState<
    string
  >('');
  const [currentValues, setCurrentValues] = React.useState<RecaptchaUser>(user);
  const [currentMessages, setCurrentMessages] = React.useState<RecaptchaUser>(
    help
  );
  const [recaptchaColor] = React.useState<'dark' | 'light'>(
    viewState.theme === 'DARK_THEME' ? 'dark' : 'light'
  );

  const setPasswordMessage = (password: string): void => {
    setCurrentMessages({
      password,
      ...currentMessages,
    });
  };

  const setEmailMessage = (email: string): void => {
    setCurrentMessages({
      email,
      ...currentMessages,
    });
  };

  const setPhoneNumberMessage = (phoneNumber: string): void => {
    setCurrentMessages({
      phoneNumber,
      ...currentMessages,
    });
  };

  const validatePassword = (): boolean => {
    const { password } = user;

    if (!password || password.length === 0) {
      setPasswordMessage('');
      return false;
    } else if (password.length < 8) {
      setPasswordMessage('Password must be at least 8 characters long.');
      return false;
    } else if (!RegexUtils.containsLowercase(password)) {
      setPasswordMessage('Password must contain a lower case letter.');
      return false;
    } else if (!RegexUtils.containsUppercase(password)) {
      setPasswordMessage('Password must contain an upper case letter.');
      return false;
    } else if (!RegexUtils.containsNumber(password)) {
      setPasswordMessage('Password must contain a number.');
      return false;
    } else if (!RegexUtils.containsSpecialCharacter(password)) {
      setPasswordMessage('Password must contain a special character.');
      return false;
    } else {
      setPasswordMessage('');
      return true;
    }
  };

  const validateEmail = (): boolean => {
    const { email } = user;
    if (!email || email.length === 0) {
      setEmailMessage('');
      return false;
    } else if (!RegexUtils.validEmail(email)) {
      setEmailMessage('Invalid email.');
      return false;
    } else {
      setEmailMessage('');
      return true;
    }
  };

  const validatePhoneNumber = (): boolean => {
    const { phoneNumber } = user;

    if (!phoneNumber || phoneNumber.length === 0) {
      setPhoneNumberMessage('');
      return false;
    } else if (
      !RegexUtils.containsOnlyNumbers(phoneNumber) ||
      phoneNumber.length > 10 ||
      phoneNumber.length < 10
    ) {
      setPhoneNumberMessage('Invalid phone number. Format: ##########');
      return false;
    } else {
      setPhoneNumberMessage('');
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
    if (repeatPassword && password && repeatPassword !== password) {
      setRepeatPasswordMessage('Passwords do not match.');
    } else {
      setRepeatPasswordMessage('');
    }
  }, [user.password, repeatPassword]);

  const handleChange = async (event: InputEvent): Promise<void> => {
    const { id, value } = event.target;

    if (id === 'repeatPassword') {
      setRepeatPassword(value);
    } else {
      setCurrentValues({
        ...currentValues,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (event: ButtonEvent): Promise<void> => {
    event.preventDefault();

    if (
      validatePhoneNumber() &&
      validateEmail() &&
      (!recaptcha || validatePassword())
    ) {
      onSubmit(currentValues);
    }
  };

  const handleRecaptchaChange = (key: string): void => {
    setCurrentValues({
      ...currentValues,
      recaptchaResponse: key,
    });
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
        value={currentValues.firstName}
      />
      <Input
        autoCapitalize="true"
        autoComplete="last-name"
        id="lastName"
        onChange={handleChange}
        placeholder="Last Name"
        type="text"
        value={currentValues.lastName}
      />
      <Input
        autoComplete="email"
        helpText={currentMessages.email}
        id="email"
        onChange={handleChange}
        placeholder="Email"
        type="text"
        value={currentValues.email}
      />
      <Input
        autoComplete="username"
        helpText={currentMessages.username}
        id="username"
        onChange={handleChange}
        placeholder="Username"
        type="text"
        value={currentValues.username}
      />
      <Input
        autoComplete="phone-number"
        helpText={currentMessages.phoneNumber}
        id="phoneNumber"
        onChange={handleChange}
        placeholder="Phone Number"
        type="text"
        value={currentValues.phoneNumber}
      />
      <Input
        autoComplete="city"
        helpText={currentMessages.city}
        id="city"
        onChange={handleChange}
        placeholder="City"
        type="text"
        value={currentValues.city}
      />
      <Input
        autoComplete="state"
        helpText={currentMessages.state}
        id="state"
        onChange={handleChange}
        placeholder="State"
        type="text"
        value={currentValues.state}
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
      {recaptcha && (
        <ReCAPTCHA
          id="recaptcha"
          theme={recaptchaColor}
          sitekey="6Le5a9gUAAAAAFEDmpv_rTn1GI01_nzkGFPkEd5Y"
          onChange={handleRecaptchaChange}
        />
      )}
    </React.Fragment>
  );

  const Title: JSX.Element = (
    <div style={{ display: 'inline' }}>
      <div style={{ float: 'left', marginRight: '25px', marginTop: '5px' }}>
        {headerText}
      </div>
      <div style={{ float: 'right', marginLeft: '25px' }}>
        <Button
          id="signOut"
          onClick={onButtonClick}
          type="button"
          variant="outlined"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );

  return (
    <Form
      id={id}
      buttonText={submitButtonText}
      formInputs={Inputs}
      handleSubmit={handleSubmit}
      icon={<AccountCircleIcon />}
      title={Title}
    />
  );
};

export default UserForm;
