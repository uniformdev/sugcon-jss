import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRoot from './AppRoot';
import { matchRoute } from './lib/routerUtils';
import { AppStateProvider, AppState } from './lib/AppStateProvider';
// import { loadableReady } from '@loadable/component';

/* eslint-disable no-underscore-dangle */

/*
  App Rendering
*/

renderApp();

function renderApp() {
  const initialState = resolveInitialAppState();

  // HTML element to place the app into
  const rootElement = document.getElementById('root');

  // Create the Router component that will be used for client-side routing.
  const Router: React.FC = (routerProps) => <BrowserRouter>{routerProps.children}</BrowserRouter>;

  // when React initializes from a SSR-based initial state, you need to render with `hydrate` instead of `render`
  const renderFunction = initialState.routeData ? ReactDOM.hydrate : ReactDOM.render;

  // loadableReady(() => {
  renderFunction(
    <AppStateProvider initialState={initialState}>
      <AppRoot Router={Router} />
    </AppStateProvider>,
    rootElement
  );
  // });
}

/*
  SSR Data
  If we're running in a server-side rendering scenario,
  the server will provide JSON in the #__JSS_STATE__ element
  for us to acquire the initial state to run with on the client.

  This enables us to skip a network request to load up the layout data.
  We are emitting a quiescent script with JSON so that we can take advantage
  of JSON.parse()'s speed advantage over parsing full JS, and enable
  working without needing `unsafe-inline` in Content Security Policies.

  SSR is initiated from /server/server.js.
*/

function resolveInitialAppState() {
  const ssrRawJson = document.getElementById('__JSS_STATE__');
  const ssrState = ssrRawJson ? JSON.parse(ssrRawJson.innerHTML) : null;

  const routePath = resolveRoutePath();

  /*
  Language Resolving
  Attempt to resolve the app language prior to rendering the app.
  */

  const appState: AppState = {
    routePath,
    routeData: null,
    sitecoreContextData: {},
  };

  if (ssrState) {
    const { dictionary, routeData, sitecoreContextData } = ssrState;

    return {
      ...appState,
      dictionary: dictionary || null,
      routeData: routeData || null,
      sitecoreContextData,
    } as AppState;
  }

  return appState;
}

// Resolve the current matched router path
function resolveRoutePath() {
  const matchedRoute = matchRoute(window.location.pathname);
  const routeParams: { sitecoreRoute?: string } = (matchedRoute && matchedRoute.params) || {};
  return (routeParams && routeParams.sitecoreRoute) || '/';
}
