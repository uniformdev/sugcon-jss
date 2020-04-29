import serializeJavascript from 'serialize-javascript';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router';
import { ChunkExtractor } from '@loadable/server';
import nodePath from 'path';
import config from '../src/temp/config';
import AppRoot from '../src/AppRoot';
import { AppStateProvider } from '../src/lib/AppStateProvider';
import { matchRoute } from '../src/lib/routerUtils';
import indexTemplate from '../build/index.html';

/** Asserts that a string replace actually replaced something */
function assertReplace(string, value, replacement) {
  let success = false;
  const result = string.replace(value, () => {
    success = true;
    return replacement;
  });

  if (!success) {
    throw new Error(
      `Unable to match replace token '${value}' in public/index.html template. If the HTML shell for the app is modified, also fix the replaces in server.js. Server-side rendering has failed!`
    );
  }

  return result;
}

/** Export the API key. This will be used by default in Headless mode, removing the need to manually configure the API key on the proxy. */
export const apiKey = config.sitecoreApiKey;

/** Export the app name. This will be used by default in Headless mode, removing the need to manually configure the app name on the proxy. */
export const appName = config.jssAppName;

/**
 * Main entry point to the application when run via Server-Side Rendering,
 * either in Integrated Mode, or with a Node proxy host like the node-headless-ssr-proxy sample.
 * This function will be invoked by the server to return the rendered HTML.
 * @param {Function} callback Function to call when rendering is complete. Signature callback(error, successData).
 * @param {string} path Current route path being rendered
 * @param {string} data JSON Layout service data for the rendering from Sitecore
 * @param {string} viewBag JSON view bag data from Sitecore (extensible context stuff)
 */
export function renderView(callback, path, data, viewBag) {
  try {
    const sitecoreData: any = parseServerData(data, viewBag);

    /*
      App Rendering
    */

    const Router = (routerProps) => (
      <StaticRouter location={path} context={{}}>
        {routerProps.children}
      </StaticRouter>
    );

    // Add an arbitrary property to the state object to make it easily identifiable as server-side state.
    const state = {
      sitecoreContextData: sitecoreData.sitecore.context,
      routeData: {
        ...sitecoreData.sitecore.route,
        fromSSR: true,
      },
      routePath: path,
      dictionary: null,
    };

    const App = (
      <AppStateProvider initialState={state}>
        <AppRoot Router={Router} />
      </AppStateProvider>
    );

    const serverStatsFile = nodePath.join(__dirname, './loadable-stats-server.json');
    // Even though we're not doing anything with the output of the chunk extractor, we
    // still need to use the `collectChunks` method in order for dynamic chunks
    // to be rendered during SSR. ¯\_(ツ)_/¯
    const serverChunkExtractor = new ChunkExtractor({ statsFile: serverStatsFile });

    // Render the app.
    const renderedAppHtml = ReactDOMServer.renderToString(serverChunkExtractor.collectChunks(App));

    const helmet = Helmet.renderStatic();

    // Inject the rendered app into the index.html template (built from /public/index.html)
    // IMPORTANT: use serialize-javascript or similar instead of JSON.stringify() to emit initial state,
    // or else you're vulnerable to XSS.
    let html = indexTemplate;

    // Set proper language for html document.
    html = assertReplace(html, '<html lang="en"', `<html lang="en"`);

    // write the React app
    html = assertReplace(html, '<div id="root"></div>', `<div id="root">${renderedAppHtml}</div>`);
    // write the string version of our state
    html = assertReplace(
      html,
      '<script type="application/json" id="__JSS_STATE__">null',
      `<script type="application/json" id="__JSS_STATE__">${serializeJavascript(state, {
        isJSON: true,
      })}`
    );

    // render <head> contents from react-helmet and styled-components
    html = assertReplace(
      html,
      '<head>',
      `<head>${helmet.title.toString()}\n${helmet.meta.toString()}\n${helmet.link.toString()}\n`
    );

    // invoke the renderView callback so that the SSR caller can continue
    callback(null, { html });
  } catch (err) {
    // need to ensure the callback is always invoked no matter what or else SSR will hang
    callback(err, null);
  }
}

/**
 * Parses an incoming url to match against the route table. This function is implicitly used
 * by node-headless-ssr-proxy when rendering the site in headless mode. It enables rewriting the incoming path,
 * say '/en-US/hello', to the path and language to pass to Layout Service (a Sitecore item path), say
 * { sitecoreRoute: '/hello', lang: 'en-US' }.
 * This function is _not_ used in integrated mode, as Sitecore's built in route parsing is used.
 * If no URL transformations are required (i.e. single language site), then this function can be removed.
 * @param {string} url The incoming URL to the proxy server
 * @returns { sitecoreRoute?: string, lang?: string }
 */
export function parseRouteUrl(url) {
  if (!url) {
    return null;
  }

  const result = matchRoute(url);
  return result.params;
}

function parseServerData(data, viewBag) {
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  return {
    viewBag: parsedViewBag,
    sitecore: parsedData && parsedData.sitecore,
  };
}
