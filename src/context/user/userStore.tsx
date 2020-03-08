import React, { Dispatch, Reducer, createContext, useReducer } from 'react';
import { User } from '../../types';
import Types from './userActionTypes';

export interface UserContextState {
  user: User | null;
}

export interface UserContextAction {
  actionType: string;
  user: User | null;
}

export interface ContextProps {
  state: UserContextState;
  dispatch: Dispatch<UserContextAction>;
}

export const UserContext = createContext<ContextProps>({} as ContextProps);

const reducer: Reducer<UserContextState, UserContextAction> = (
  state: UserContextState,
  action: UserContextAction
): UserContextState => {
  switch (action.actionType) {
    case Types.SIGN_IN:
      return { user: action.user };

    case Types.SIGN_OUT:
      return { user: null };

    case Types.UPDATE_USER:
      return { user: action.user };

    default:
      throw new Error('Action type must be defined');
  }
};

const initialState: UserContextState = {
  user: null,
};

export const UserStore: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): ContextProps => React.useContext(UserContext);
