import { matchPath, match } from 'react-router-dom';

// support languages in the URL prefix
// e.g. /fr-FR/path, or /en/path, or /path
export const routePatterns = [
  '/:lang([a-z]{2}-[A-Z]{2})/:sitecoreRoute*',
  '/:lang([a-z]{2})/:sitecoreRoute*',
  '/:sitecoreRoute*',
];

export interface RouteParams {
  sitecoreRoute?: string;
  lang?: string;
}

// use react-router-dom to find the route matching the incoming URL
// then return its match params
// we are using .some() as a way to loop with a short circuit (so that we stop evaluating route patterns after the first match)
export const matchRoute = (route: string): match<RouteParams> | null => {
  if (!route) {
    return null;
  }

  let result : match<RouteParams> | null = null;

  routePatterns.some((pattern) => {
    const match = matchPath<RouteParams>(route, { path: pattern });
    if (match !== null && match.params !== null) {
      result = match;
      return true;
    }

    return false;
  });

  return result;
};
