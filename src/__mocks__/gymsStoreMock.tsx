import { GymsContext, GymsContextState } from '../context/gyms/gymsStore';
import React from 'react';

export interface GymsStoreMockProps {
  state: GymsContextState;
  dispatch: React.Dispatch<GymsContextState>;
}

const GymsStoreMock: React.FC<GymsStoreMockProps> = ({
  state,
  dispatch,
  children,
}): JSX.Element => (
  <GymsContext.Provider value={{ state, dispatch }}>
    {children}
  </GymsContext.Provider>
);

export default GymsStoreMock;
