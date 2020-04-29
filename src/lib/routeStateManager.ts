import { dataApi } from '@sitecore-jss/sitecore-jss-react';
import { dataFetcher } from './dataFetcher';
import config from '../temp/config';

export interface State {
  routeData: any;
  routeDataLoading?: boolean;
  routePath: string;
  routeError?: Error;
  sitecoreContextData: any;
}

export interface Action {
  type: string;
  payload: any;
  error?: Error;
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'clear-ssr-flag': {
      return { ...state, routeData: { ...state.routeData, fromSSR: false } };
    }
    case 'route-data-fetch-begin': {
      return { ...state, routeDataLoading: true, routePath: action.payload };
    }
    case 'route-data-fetch-success': {
      return {
        ...state,
        routeDataLoading: false,
        routeData: action.payload.routeData,
        sitecoreContextData: action.payload.sitecoreContextData,
        routeError: null,
      };
    }
    case 'route-data-fetch-404': {
      return {
        ...state,
        routeDataLoading: false,
        routeData: action.payload.routeData,
        sitecoreContextData: action.payload.sitecoreContextData,
        routeError: action.error,
      };
    }
    case 'route-data-fetch-error': {
      return {
        ...state,
        routeDataLoading: false,
        routeData: null,
        sitecoreContextData: null,
        routeError: action.error,
      };
    }
    default: {
      return state;
    }
  }
}

export type FetchRouteFunction = (
  routePath: string,
  language: string
) => (dispatch: any) => Promise<any> | void;

export const fetchRoute: FetchRouteFunction = (routePath: string, language: string) => {
  return (dispatch: any) => {
    // Signal that we're about to start fetching data. Typically use this
    // to set loading state to `true`.
    dispatch({
      type: 'route-data-fetch-begin',
      payload: routePath,
    });

    getRouteData(routePath, language)
      .then((sitecoreData) => {
        dispatch({
          type: 'route-data-fetch-success',
          payload: {
            routeData: sitecoreData.sitecore.route,
            sitecoreContextData: sitecoreData.sitecore.context,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        
        // 404 errors may contain context data to be used for rendering
        if (error.response && error.response.status === 404 && error.response.data) {
          dispatch({
            type: 'route-data-fetch-404',
            payload: {
              routeData: error.response.data.sitecore ? error.response.data.sitecore.route : null,
              sitecoreContextData: error.response.data.sitecore
                ? error.response.data.sitecore.context
                : { language },
            },
            error: null,
          });
        } else {
          dispatch({
            type: 'route-data-fetch-error',
            error,
          });
        }
      });
  };
};

export type ClearSSRFlagFunction = () => (dispatch: any) => Promise<any> | void;

export const clearSSRFlag: ClearSSRFlagFunction = () => {
  return (dispatch: any) => {
    dispatch({ type: 'clear-ssr-flag' });
  };
};

/**
 * Gets route data from Sitecore. This data is used to construct the component layout for a JSS route.
 * @param {string} route Route path to get data for (e.g. /about)
 * @param {string} language Language to get route data in (content language, e.g. 'en')
 */
function getRouteData(route: string, language: string) {
  const formattedRoute = ensureLeadingSlash(route);

  const fetchOptions = {
    layoutServiceConfig: { host: config.sitecoreApiHost },
    querystringParams: { sc_lang: language, sc_apikey: config.sitecoreApiKey, sc_site: config.jssAppName },
    fetcher: dataFetcher,
  };

  return dataApi.fetchRouteData(formattedRoute, fetchOptions);
}

function ensureLeadingSlash(route: string) {
  const formattedRoute = !route.startsWith('/') ? `/${route}` : route;
  return formattedRoute;
}
