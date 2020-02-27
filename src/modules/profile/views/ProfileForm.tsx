import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
import * as UserActions from '../../../context/user/userActions';
import { useUserContext } from '../../../context/user/userStore';
import { ButtonEvent, InputEvent, User } from '../../../types';
import Button from '../../common/buttons/ButtonSecondary';
import Form from '../../common/forms/Form';
import Input from '../../common/inputs/Input';
import * as ResponseUtils from '../../../utils/responseUtils';
import { ErrorResponse } from '../../../types/responses';
import { toast } from 'react-toastify';
import * as RegexUtils from '../../../utils/regexUtils';

export interface IPropsProfileForm {
  user: User;
}

const ProfileForm: React.FC<IPropsProfileForm> = ({ user }): JSX.Element => {
  const { dispatch: userDispatch } = useUserContext();
  const [firstName, setFirstName] = React.useState<string>(user.firstName);
  const [lastName, setLastName] = React.useState<string>(user.lastName);
  const [email, setEmail] = React.useState<string>(user.email);
  const [emailMessage, setEmailMessage] = React.useState<string>('');
  const [city, setCity] = React.useState<string>(user.city);
  const [cityMessage] = React.useState<string>('');
  const [state, setState] = React.useState<string>(user.state);
  const [stateMessage, setStateMessage] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>(user.username);
  const [usernameMessage, setUsernameMessage] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>(
    user.phoneNumber
  );
  const [phoneNumberMessage, setPhoneNumberMessage] = React.useState<string>(
    ''
  );
  const [password, setPassword] = React.useState<string>('');
  const [passwordMessage, setPasswordMessage] = React.useState<string>('');
  const [repeatPassword, setRepeatPassword] = React.useState<string>('');
  const [repeatPasswordMessage, setRepeatPasswordMessage] = React.useState<
    string
  >('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const validatePassword = (): boolean => {
    if (password.length === 0) {
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
    if (email.length === 0) {
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
    if (phoneNumber.length === 0) {
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
  }, [password]);

  React.useEffect(() => {
    validateEmail();
  }, [email]);

  React.useEffect(() => {
    validatePhoneNumber();
  }, [phoneNumber]);

  React.useEffect(() => {
    if (repeatPassword !== password) {
      setRepeatPasswordMessage('Passwords do not match.');
    } else {
      setRepeatPasswordMessage('');
    }
  }, [password, repeatPassword]);

  async function handleSignOutClick(): Promise<void> {
    await UserActions.signOut(userDispatch);
  }

  async function handleSubmit(event: ButtonEvent): Promise<void> {
    event.preventDefault();
    setLoading(true);

    if (validatePhoneNumber() && validateEmail()) {
      const response = await UserActions.updateUser(userDispatch, {
        city,
        email: email.toLowerCase(),
        firstName,
        lastName,
        password,
        phoneNumber,
        state,
        username,
      } as User);

      if (!response) {
        ResponseUtils.toastIfNotOk(
          response,
          'Error updating user. Please try again.'
        );
      } else if (!ResponseUtils.isOk(response)) {
        const body: User = await response.json();

        if (body.email) {
          setEmailMessage(body.email);
        }
        if (body.username) {
          setUsernameMessage(body.username);
        }
        if (body.phoneNumber) {
          setPhoneNumberMessage(body.phoneNumber);
        }
        if (body.password) {
          setPasswordMessage(body.password);
        }
        if (body.state) {
          setStateMessage(body.state);
        }
      } else {
        toast.success('User updated.');
      }
    }
    setLoading(false);
  }

  const handleChange = async (event: InputEvent): Promise<void> => {
    event.preventDefault();
    const { id, value } = event.target;

    if (id === 'firstName') {
      setFirstName(value);
    } else if (id === 'lastName') {
      setLastName(value);
    } else if (id === 'email') {
      setEmail(value);
    } else if (id === 'username') {
      setUsername(value);
    } else if (id === 'phoneNumber') {
      setPhoneNumber(value);
    } else if (id === 'city') {
      setCity(value);
    } else if (id === 'state') {
      setState(value);
    } else if (id === 'password') {
      setPassword(value);
    } else if (id === 'repeatPassword') {
      setRepeatPassword(value);
    }
  };

  const formInputs: JSX.Element = (
    <React.Fragment>
      <Input
        autoCapitalize="true"
        autoComplete="first-name"
        id="firstName"
        onChange={handleChange}
        placeholder="First Name"
        type="text"
        value={firstName}
      />
      <Input
        autoCapitalize="true"
        autoComplete="last-name"
        id="lastName"
        onChange={handleChange}
        placeholder="Last Name"
        type="text"
        value={lastName}
      />
      <Input
        autoComplete="email"
        helpText={emailMessage}
        id="email"
        onChange={handleChange}
        placeholder="Email"
        type="text"
        value={email}
      />
      <Input
        autoComplete="username"
        helpText={usernameMessage}
        id="username"
        onChange={handleChange}
        placeholder="Username"
        type="text"
        value={username}
      />
      <Input
        autoComplete="phone-number"
        helpText={phoneNumberMessage}
        id="phoneNumber"
        onChange={handleChange}
        placeholder="Phone Number"
        type="text"
        value={phoneNumber}
      />
      <Input
        autoComplete="city"
        helpText={cityMessage}
        id="city"
        onChange={handleChange}
        placeholder="City"
        type="text"
        value={city}
      />
      <Input
        autoComplete="state"
        helpText={stateMessage}
        id="state"
        onChange={handleChange}
        placeholder="State"
        type="text"
        value={state}
      />
      <Input
        placeholder="Password"
        id="password"
        value={password}
        onChange={handleChange}
        helpText={passwordMessage}
        type="password"
        autoComplete="password"
      />
      <Input
        placeholder="Repeat Password"
        id="repeatPassword"
        value={repeatPassword}
        onChange={handleChange}
        helpText={repeatPasswordMessage}
        type="password"
      />
    </React.Fragment>
  );

  const title: JSX.Element = (
    <div style={{ display: 'inline' }}>
      <div style={{ float: 'left', marginRight: '25px', marginTop: '5px' }}>
        Your profile
      </div>
      <div style={{ float: 'right', marginLeft: '25px' }}>
        <Button
          id="signOut"
          onClick={handleSignOutClick}
          type="button"
          variant="outlined"
        >
          Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <Form
      id="profile"
      buttonText="Update Account"
      formInputs={formInputs}
      handleSubmit={handleSubmit}
      icon={<AccountCircleIcon />}
      title={title}
      disabled={loading}
    />
  );
};

export default ProfileForm;
