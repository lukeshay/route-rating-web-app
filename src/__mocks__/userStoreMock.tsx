import { IUserContextState, UserContext } from '../context/user/userStore';
import React from 'react';

export interface IUserStoreMockProps {
  state: IUserContextState;
  dispatch: any;
}

const UserStoreMock: React.FC<IUserStoreMockProps> = ({
  state,
  dispatch,
  children,
}): JSX.Element => (
  <UserContext.Provider value={{ state, dispatch }}>
    {children}
  </UserContext.Provider>
);

export default UserStoreMock;
