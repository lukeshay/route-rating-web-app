import { ViewContext, ViewContextState } from '../context/view/viewStore';
import React from 'react';

export interface ViewStoreMockProps {
  state: ViewContextState;
  dispatch: React.Dispatch<ViewContextState>;
}

export const desktopViewState: ViewContextState = {
  mobile: false,
  theme: 'DARK_THEME',
};

export const mobileViewState: ViewContextState = {
  mobile: true,
  theme: 'DARK_THEME',
};

const ViewStoreMock: React.FC<ViewStoreMockProps> = ({
  state,
  dispatch,
  children,
}): JSX.Element => (
  <ViewContext.Provider value={{ state, dispatch }}>
    {children}
  </ViewContext.Provider>
);

export default ViewStoreMock;
