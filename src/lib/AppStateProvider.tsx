import React, { createContext, useReducer, PropsWithChildren } from 'react';
import {
  fetchRoute,
  clearSSRFlag,
  reducer as routeStateReducer,
  State as RouteState,
  FetchRouteFunction,
  ClearSSRFlagFunction,
} from './routeStateManager';

// Create and export app state context for consumption in descendants.
const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);

export const useAppStateContext = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppStateContext must be used within a AppStateProvider');
  }
  return context;
};

// store the currentState outside of the current function closure so that we can provide
// a `getState()` function to our actions that will actually return the current state
let currentState: AppState | undefined;

export function AppStateProvider({ initialState, children }: PropsWithChildren<AppStateProviderProps>) {
  const reducer = mergeReducers([routeStateReducer]);
  const [state, dispatch] = withDispatchLog(useReducer(reducer, initialState, initState), () => currentState);

  currentState = state;

  const actions: AppStateActions = createAsyncCapableActions(
    {
      fetchRoute,
      clearSSRFlag,
    },
    dispatch,
    () => currentState
  );

  return <AppStateContext.Provider value={{ appState: state, actions }}>{children}</AppStateContext.Provider>;
}

function initState(state: AppState) {
  // If we don't have SSR data, then set the loading flags to true so
  // that initial app rendering doesn't fail and will show loaders instead.
  if (!state.routeData || !state.routeData.fromSSR) {
    state.routeDataLoading = true;
  }
  return state;
}

// This function provides any actions that return a function with a `dispatch`
// and `state` objects that those actions can then use. This allows for multiple
// `dispatch` calls from an action or calling `dispatch` after async operations.
function createAsyncCapableActions(actions: any, dispatch: any, getState: any) {
  Object.keys(actions).forEach((key) => {
    const action = actions[key];

    actions[key] = (...args: any[]) => {
      const actionResult = action(...args);
      if (typeof actionResult === 'function') {
        actionResult(dispatch, getState);
      } else {
        dispatch(actionResult);
      }
    };
  });

  return actions;
}

// Simple function that accepts an array of reducer functions and "merges" them
// into a single function. The result from each reducer is passed to the next
// reducer and the final output is the return value.
function mergeReducers(reducers: any[]) {
  return (state: any, action: any) => {
    return reducers.reduce((result: any, reducer: any) => {
      result = reducer(result, action);
      return result;
    }, state);
  };
}

// This function basically wraps the `dispatch` function from a `useReducer`
// call with a console logger to log all actions that are dispatched, along
// with the updated state after the action is complete.
function withDispatchLog(useReducerResult: any[], getState: any) {
  if (process.env.NODE_ENV === 'development') {
    return [
      useReducerResult[0],
      (...args: any[]) => {
        console.group('state action');
        console.log(`action '${args[0].type}'`, args[0]);

        useReducerResult[1](...args);

        console.log(`new state`, getState());
        console.groupEnd();
      },
    ];
  }
  return useReducerResult;
}

export type AppState = RouteState & {
  // context may have other properties defined outside of what is specified in the UI components SitecoreContextProps
  sitecoreContextData: any;
};

export interface AppStateContextProps {
  appState: AppState;
  actions: AppStateActions;
}

export interface AppStateProviderProps {
  initialState: AppState | undefined;
}

export type AppStateActions = {
  fetchRoute: FetchRouteFunction;
  clearSSRFlag: ClearSSRFlagFunction;
};
