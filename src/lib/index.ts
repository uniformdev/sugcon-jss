import { Field } from '@sitecore-jss/sitecore-jss-react';

export const getMediaHost = () => (process.env.REACT_APP_MEDIA_HOST ? process.env.REACT_APP_MEDIA_HOST : '/');

export function pathJoin(parts: Array<string>, separator: string = '/') {
  const replace = new RegExp(separator + '{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
}

export function get(obj: any, propPath: string, defaultValue?: any) {
  return getPropertyByPath(obj, propPath, defaultValue);
}

export function getPropertyByPath(obj: any, propPath: string, defaultValue?: any) {
  return propPath.split('.').reduce((o, p) => (o && o[p]) || defaultValue, obj);
}

export const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export interface JssField<T> {
  jss: Field<T>;
}
