import React, { useContext, useEffect, ReactElement } from 'react';
import { useAppStateContext } from './AppStateProvider';
import { __RouterContext, RouteComponentProps, match } from 'react-router';
import { matchRoute } from './routerUtils';

// Component responsible for fetching route data if needed.
// This could probably be converted to a hook.
export const RouteDataManager: React.FC = (props) => {
  const { appState, actions } = useAppStateContext();
  const routerContext = useContext(__RouterContext);
  const route = resolveRouterRoute(routerContext);
  const routeParams: {
    sitecoreRoute?: string;
    lang?: string;
  } = (route && route.params) || {};

  // routeParams take precedence over state
  // sitecoreRoute will only be populated if there is a value after `/` in the requested URL
  // appState.routePath is populated by server.js and index.js before initial render
  // appState.routePath is updated during route fetching

  // `sitecoreRoute` may be undefined when the current URL is `/` or
  // when the current URL starts with a language parameter, `/en-CA/`
  // If so, we need to "resolve" to the `/` path to ensure that
  // the `useEffect` below is triggered and route data is fetched.
  let resolvedRoute: string;
  if (!routeParams.sitecoreRoute && route && (route.url === '/' || route.url === `/en`)) {
    resolvedRoute = '/';
  } else {
    resolvedRoute = routeParams.sitecoreRoute || appState.routePath;
  }

  // remember that useEffect fires after initial render (no matter what)
  // and then fires on subsequent renders if either resolvedRoute or resolvedLanguage has changed
  useEffect(
    () => {
      // If we have route data from SSR, no need to fetch.
      // At this point, we also clear the SSR flag from state so that subsequent renders
      // will fetch routeData if needed.
      // This approach feels hacky... but it works.
      if (appState.routeData && appState.routeData.fromSSR) {
        actions.clearSSRFlag();
        return;
      }

      actions.fetchRoute(resolvedRoute, 'en');
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [resolvedRoute, 'en']
  );

  // need to cast as ReactElement to satisfy TypeScript
  return props.children as ReactElement;
};

// When accessing `__RouterContext` from react-router, the location and history
// properties of the context are correct, but the route parameters are not
// initialized. Therefore, we call the `matchRoute` function on the router context
// path to get the matched route parameters (i.e. `:sitecoreRoute`, `:lang`).
// This will likely change in a future version of React Router, but this works
// with the current version.
function resolveRouterRoute(routerContext: RouteComponentProps): match | null {
  const matchedRoute = matchRoute(routerContext.location.pathname);
  return matchedRoute;
}
