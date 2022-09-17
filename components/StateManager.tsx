import React, { Reducer, useReducer } from "react";
import { AppContext, initialState, IState, reducer } from "../helpers/state";

export default function StateManager({ children }: any) {
  const [appState, dispatch] = useReducer<Reducer<any, IState>>(
    reducer,
    initialState
  );
  return (
    <AppContext.Provider
      value={{
        appState,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
