import React, { Dispatch, Reducer, createContext, useReducer } from 'react';
import * as Cookies from '../../utils/cookiesUtils';

export const DARK_THEME = 'DARK_THEME';

export const LIGHT_THEME = 'LIGHT_THEME';

export const Types = {
  UPDATE_VIEW: 'UPDATE_VIEW',
};

export interface ViewContextState {
  mobile: boolean;
  theme: 'DARK_THEME' | 'LIGHT_THEME';
}

export interface ViewContextAction {
  actionType: string;
  mobile: boolean;
  theme: 'DARK_THEME' | 'LIGHT_THEME';
}

export interface ContextProps {
  state: ViewContextState;
  dispatch: Dispatch<ViewContextAction>;
}

export const ViewContext = createContext<ContextProps>({} as ContextProps);

const reducer: Reducer<ViewContextState, ViewContextAction> = (
  state: ViewContextState,
  action: ViewContextAction
): ViewContextState => {
  const { mobile, theme, actionType } = action;

  switch (actionType) {
    case Types.UPDATE_VIEW:
      Cookies.setTheme(theme);
      return { mobile, theme };

    default:
      throw new Error('Action type must be defined');
  }
};

const initialState: ViewContextState = {
  mobile: false,
  theme: Cookies.getTheme() || DARK_THEME,
};

export const ViewStore: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ViewContext.Provider value={{ state, dispatch }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = (): ContextProps => React.useContext(ViewContext);
