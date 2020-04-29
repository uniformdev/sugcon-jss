// This declaration exists to appease TypeScript. The JSS React component library doesn't export
// `ComponentFactoryReactContext`, so we need to "directly" import it in components via the
// library path,
// e.g. import { ComponentFactoryReactContext } from '@sitecore-jss/sitecore-jss-react/dist/components/SitecoreContext';

// However, that causes TypeScript to complain because there is no typings file
// available at `dist/components/SitecoreContext` - the typings file lives in
// `types/components/SitecoreContext`, so TypeScript can't resolve the typings.

// Therefore, we give TS a little help and tell it that it can use the `types/components/SitecoreContext` typings for
// `dist/components/SitecoreContext` and that everything will be ok and life will go on.

declare module '@sitecore-jss/sitecore-jss-react/dist/components/SitecoreContext' {
  export { ComponentFactoryReactContext } from '@sitecore-jss/sitecore-jss-react/types/components/SitecoreContext';
}
