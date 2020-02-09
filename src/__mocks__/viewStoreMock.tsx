import { IViewContextState, ViewContext } from "../context/view/viewStore";
import React from "react";

export interface IViewStoreMockProps {
  state: IViewContextState;
  dispatch: any;
}

export const desktopViewState: IViewContextState = {
  mobile: false,
  theme: "DARK_THEME"
};

export const mobileViewState: IViewContextState = {
  mobile: true,
  theme: "DARK_THEME"
};

const ViewStoreMock: React.FC<IViewStoreMockProps> = ({
  state,
  dispatch,
  children
}): JSX.Element => (
  <ViewContext.Provider value={{ state, dispatch }}>
    {children}
  </ViewContext.Provider>
);

export default ViewStoreMock;
