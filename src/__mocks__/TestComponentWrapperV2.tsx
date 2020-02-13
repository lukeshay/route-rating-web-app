/* eslint @typescript-eslint/no-empty-function: 0, @typescript-eslint/explicit-function-return-type: 0 */
import React from "react";
import { IGymsContextState } from "../context/gyms/gymsStore";
import { IUserContextState } from "../context/user/userStore";
import { IViewContextState } from "../context/view/viewStore";
import GymsStoreMock from "./gymsStoreMock";
import ViewStoreMock from "./viewStoreMock";
import UserStoreMock from "./userStoreMock";

export interface ITestComponentWrapperV2Props {
  children: React.ReactNode;
  gymsState: IGymsContextState;
  userState: IUserContextState;
  viewState: IViewContextState;
}

const TestComponentWrapperV2: React.FC<ITestComponentWrapperV2Props> = ({
  children,
  gymsState,
  userState,
  viewState
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
