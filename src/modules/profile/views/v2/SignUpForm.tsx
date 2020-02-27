import * as ResponseUtils from '../../../../utils/responseUtils';
import * as UserActions from '../../../../context/user/userActions';
import * as UserUtils from '../../../../utils/userUtils';
import React from 'react';
import UserForm from './UserForm';
import { ErrorResponse } from '../../../../types/responses';
import { RecaptchaUser } from '../../../../types';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../../context/user/userStore';

export interface IPropsSignUpForm {
  handleSignInClick(event: any): void;
}

const SignUpForm: React.FC<IPropsSignUpForm> = ({
  handleSignInClick,
}): JSX.Element => {
  const { dispatch: userDispatch } = useUserContext();

  const [helpMessages, setHelpMessages] = React.useState<RecaptchaUser>({
    recaptchaResponse: '',
    ...UserUtils.createEmptyUser(),
  } as RecaptchaUser);

  async function handleSubmit(user: RecaptchaUser): Promise<void> {
    const response = await UserActions.createUser(
      userDispatch,
      user,
      user.recaptchaResponse
    );

    if (!response) {
      ResponseUtils.toastIfNotOk(
        response,
        'Error creating user. Please try again.'
      );
    } else if (!ResponseUtils.isOk(response)) {
      const body: ErrorResponse & RecaptchaUser = await response.json();
      setHelpMessages(body);
    } else {
      toast.success('Your account has been created.');
    }
  }

  return (
    <UserForm
      buttonText="Sign in"
      headerText="Sign up"
      help={helpMessages}
      id="signUp"
      onButtonClick={handleSignInClick}
      onSubmit={handleSubmit}
      recaptcha={true}
      submitButtonText="Create Account"
      user={
        {
          recaptchaResponse: '',
          ...UserUtils.createEmptyUser(),
        } as RecaptchaUser
      }
    />
  );
};

export default SignUpForm;
