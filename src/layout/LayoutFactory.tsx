import React from 'react';
import { useAppStateContext } from '../lib/AppStateProvider';
import { Error } from './Error';
import MainContainer from './MainContainer';

export function LayoutFactory() {
  const { appState } = useAppStateContext();

  const { routeData, routeError } = appState;

  if (routeError) {
    return <Error error={routeError} />;
  }

  if (routeData) {
    return <MainContainer route={routeData} context={appState.sitecoreContextData} />;
  }

   return null
}
