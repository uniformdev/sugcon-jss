import React from "react";
import Layout from "./Layout";
import componentFactory from "./temp/componentFactory";
import { RouteDataManager } from "./lib/RouteDataManager";
import { useAppStateContext } from "./lib/AppStateProvider";
import { ComponentFactoryContextProvider } from "./lib/ComponentFactoryProvider";
import { SitecoreContextReactContext as ComponentsSitecoreContext } from "./lib/SitecoreContextReactContext";
import GoogleAnalytics from "react-ga";

const gaTrackingId = process.env.REACT_APP_GA ? process.env.REACT_APP_GA : "";
GoogleAnalytics.initialize(gaTrackingId);

// This is the main entry point of the app invoked by the renderer (server or client rendering).
const AppRoot = ({ Router }: { Router: any }) => {
  const { appState } = useAppStateContext();

  const sitecoreContextData: any = {
    route: null,
    pageEditing: false,
  };

  if (appState.routeData && appState.sitecoreContextData) {
    sitecoreContextData.route = appState.routeData;
    Object.assign(sitecoreContextData, appState.sitecoreContextData);
  }

  return (
    <Router>
      <RouteDataManager>
        <ComponentFactoryContextProvider componentFactory={componentFactory}>
          <ComponentsSitecoreContext.Provider value={sitecoreContextData}>
            <Layout />
          </ComponentsSitecoreContext.Provider>
        </ComponentFactoryContextProvider>
      </RouteDataManager>
    </Router>
  );
};

export default AppRoot;
