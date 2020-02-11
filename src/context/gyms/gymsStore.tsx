import React, { Dispatch, Reducer, createContext, useReducer } from "react";
import { Gym, GymPageType } from "../../types";
import Types from "./gymsActionTypes";

export interface IGymsContextState {
  page: GymPageType;
}

export interface IGymsContextAction {
  actionType: string;
  page: GymPageType;
  gym?: Gym;
}

export interface IContextProps {
  state: IGymsContextState;
  dispatch: Dispatch<IGymsContextAction>;
}

export const GymsContext = createContext<IContextProps>({} as IContextProps);

const reducer: Reducer<IGymsContextState, IGymsContextAction> = (
  state: IGymsContextState,
  { actionType, page, gym }: IGymsContextAction
): IGymsContextState => {
  switch (actionType) {
    case Types.LOAD_GYMS:
      return { page };

    case Types.UPDATE_GYM:
      if (!gym) {
        throw new Error("Action must have a gym.");
      } else {
        const content = state.page.content.map((gymFromList: Gym) =>
          gym.id === gymFromList.id ? gym : gymFromList
        );
        const newPage = { content, ...state.page };
        return {
          page: newPage
        };
      }

    default:
      throw new Error("Action type must be defined");
  }
};

const initialState: IGymsContextState = {
  page: {} as GymPageType
};

export const GymsStore: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GymsContext.Provider value={{ state, dispatch }}>
      {children}
    </GymsContext.Provider>
  );
};

export const useGymsContext = (): IContextProps =>
  React.useContext(GymsContext);
