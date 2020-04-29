import React from "react";
import { Route, Switch } from "react-router-dom";
import Helmet from "react-helmet";
import { routePatterns } from "./lib/routerUtils";
import { LayoutFactory } from "./layout/LayoutFactory";
import { withTracker } from "./lib/withTracker";

/*
  APP LAYOUT
  This is where the app's HTML "shell" should be defined.

  All routes share this root layout by default,
  but components added to inner placeholders are route-specific.
*/

function Layout() {
  return (
    <React.Fragment>
      {/* react-helmet enables setting <head> contents, like title and OG meta tags */}
      <Helmet></Helmet>
      <main className="main">
        <Switch>
          {routePatterns.map((routePattern) => (
            <Route
              key={routePattern}
              path={routePattern}
              component={withTracker(LayoutFactory, {
                /* additional attributes */
              })}
            />
          ))}
        </Switch>
      </main>
      {/*
      We need to provide content for the loading placeholder used for the footer. This ensures
      that the dynamic loading script triggers for the Footer component. Without any content, it
      seems that the IntersectionObserver never intersects with the Footer component and therefore
      the dynamic loading script doesn't load the component.

      NOTE: most components will not need content in order for dynamic loading to work. The Footer
      seems to be more of an edge case.
      */}
    </React.Fragment>
  );
}

export default Layout;
