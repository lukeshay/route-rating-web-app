/* eslint @typescript-eslint/no-empty-function: 0, @typescript-eslint/explicit-function-return-type: 0 */
import React from 'react';
import { GymsContextState } from '../context/gyms/gymsStore';
import { UserContextState } from '../context/user/userStore';
import { ViewContextState } from '../context/view/viewStore';
import GymsStoreMock from './gymsStoreMock';
import ViewStoreMock from './viewStoreMock';
import UserStoreMock from './userStoreMock';

export interface TestComponentWrapperV2Props {
  children: React.ReactNode;
  gymsState: GymsContextState;
  userState: UserContextState;
  viewState: ViewContextState;
}

const TestComponentWrapperV2: React.FC<TestComponentWrapperV2Props> = ({
  children,
  gymsState,
  userState,
  viewState,
}): JSX.Element => {
  return (
    <GymsStoreMock state={gymsState} dispatch={() => {}}>
      <ViewStoreMock state={viewState} dispatch={() => {}}>
        <UserStoreMock state={userState} dispatch={() => {}}>
          {children}
        </UserStoreMock>
      </ViewStoreMock>
    </GymsStoreMock>
  );
};

export default TestComponentWrapperV2;
