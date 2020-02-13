/* eslint @typescript-eslint/no-empty-function: 0, @typescript-eslint/explicit-function-return-type: 0 */
import React from "react";
import { IGymsContextState } from "../context/gyms/gymsStore";
import { IViewContextState } from "../context/view/viewStore";
import { IUserContextState } from "../context/user/userStore";
import { StaticRouter } from "react-router";
import GymsStoreMock from "./gymsStoreMock";
import ViewStoreMock from "./viewStoreMock";
import UserStoreMock from "./userStoreMock";

export interface ITestComponentWrapperProps {
  children: React.ReactNode;
  gymsState: IGymsContextState;
  location: string;
  userState: IUserContextState;
  viewState: IViewContextState;
}

const TestComponentWrapper: React.FC<ITestComponentWrapperProps> = ({
  children,
  gymsState,
  location,
  userState,
  viewState
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
