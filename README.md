# SUGCON demo site

This site is built with Sitecore JSS and is used to support the presentation on "How to get to the sub-second page load times in the real world with Sitecore JSS" by [Alex Shyba](https://twitter.com/@alexshyba).

## Getting started (disconnected)

1. `npm install`
1. `npm run dev` or `jss dev`.

### Environment variables

1. For GA, acquire your tracking code `UA-xxxx-x` from GA and pass as an environment variable in `.env` file:
    ```
    REACT_APP_GA=UA-xxxx-x
    ```
    See `.env.example`.
  
1. The app is using Google Maps API. You would need to acquire your own key via Google Cloud Console (the one for the Google Maps JavaScript API) and provide it here:
    ```
    REACT_APP_MAPS_API=abc
    ```
     See `.env.example`.

## Deployment to Sitecore
1. `jss setup` and follow the steps in CLI
1. `jss deploy app -c` to deploy the app: code and content. 

## Running connected

1. `npm run start:connected`