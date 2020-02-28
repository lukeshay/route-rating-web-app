import { GymsContext, IGymsContextState } from '../context/gyms/gymsStore';
import React from 'react';

export interface IGymsStoreMockProps {
  state: IGymsContextState;
  dispatch: any;
}

const GymsStoreMock: React.FC<IGymsStoreMockProps> = ({
  state,
  dispatch,
  children,
}): JSX.Element => (
  <GymsContext.Provider value={{ state, dispatch }}>
    {children}
  </GymsContext.Provider>
);

export default GymsStoreMock;
