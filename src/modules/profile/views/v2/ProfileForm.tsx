import React from 'react';
import UserForm from './UserForm';
import { User } from '../../../../types';
import * as UserActions from '../../../../context/user/userActions';
import * as ResponseUtils from '../../../../utils/responseUtils';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../../context/user/userStore';
import * as UserUtils from '../../../../utils/userUtils';
import { RecaptchaUser } from '../../../../types';

export interface IProfileFormProps {
  user: User;
}

const ProfileForm: React.FC<IProfileFormProps> = ({ user }): JSX.Element => {
  const { dispatch: userDispatch } = useUserContext();
  const [currentUser, setCurrentUser] = React.useState<RecaptchaUser>({
    recaptchaResponse: '',
    ...user,
  } as RecaptchaUser);

  const [helpMessages, setHelpMessages] = React.useState<RecaptchaUser>({
    recaptchaResponse: '',
    ...UserUtils.createEmptyUser(),
  } as RecaptchaUser);

  async function handleSubmit(updatedUser: RecaptchaUser): Promise<void> {
    setCurrentUser(updatedUser);
    const response = await UserActions.updateUser(userDispatch, updatedUser);

    if (
      !ResponseUtils.toastIfNotOk(
        response,
        'Error updating user. Please try again.'
      )
    ) {
      if (response instanceof Response) {
        const errors: RecaptchaUser = await response.json();

        setHelpMessages(errors);
      } else {
        toast.error('Error updating user. Please try again.');
      }
    } else {
      toast.success('User updated.');
    }
  }

  async function handleSignOutClick(): Promise<void> {
    await UserActions.signOut(userDispatch);
  }

  return (
    <UserForm
      buttonText="Sign out"
      headerText="Your profile"
      help={helpMessages}
      id="profile"
      onButtonClick={handleSignOutClick}
      onSubmit={handleSubmit}
      recaptcha={false}
      submitButtonText="Update profile"
      user={currentUser}
    />
  );
};

export default ProfileForm;
