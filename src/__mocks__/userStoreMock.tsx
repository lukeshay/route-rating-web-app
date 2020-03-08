import { UserContextState, UserContext } from '../context/user/userStore';
import React from 'react';

export interface UserStoreMockProps {
  state: UserContextState;
  dispatch: React.Dispatch<UserContextState>;
}

const UserStoreMock: React.FC<UserStoreMockProps> = ({
  state,
  dispatch,
  children,
}): JSX.Element => (
  <UserContext.Provider value={{ state, dispatch }}>
    {children}
  </UserContext.Provider>
);

export default UserStoreMock;
