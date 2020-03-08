/* eslint @typescript-eslint/no-empty-function: 0, @typescript-eslint/explicit-function-return-type: 0 */
import React from 'react';
import { GymsContextState } from '../context/gyms/gymsStore';
import { ViewContextState } from '../context/view/viewStore';
import { UserContextState } from '../context/user/userStore';
import { StaticRouter } from 'react-router';
import GymsStoreMock from './gymsStoreMock';
import ViewStoreMock from './viewStoreMock';
import UserStoreMock from './userStoreMock';

export interface TestComponentWrapperProps {
  children: React.ReactNode;
  gymsState: GymsContextState;
  location: string;
  userState: UserContextState;
  viewState: ViewContextState;
}

const TestComponentWrapper: React.FC<TestComponentWrapperProps> = ({
  children,
  gymsState,
  location,
  userState,
  viewState,
}): JSX.Element => {
  return (
    <StaticRouter location={`https://lukeshay.com/${location}`}>
      <GymsStoreMock state={gymsState} dispatch={() => {}}>
        <ViewStoreMock state={viewState} dispatch={() => {}}>
          <UserStoreMock state={userState} dispatch={() => {}}>
            {children}
          </UserStoreMock>
        </ViewStoreMock>
      </GymsStoreMock>
    </StaticRouter>
  );
};

export default TestComponentWrapper;
