// http://stackoverflow.com/a/27691108
/** Expects `?` as first character of querystring argument. Returns empty object if `qs` parameter is undefined. */
export function qsToObject(qs: string): { [key: string]: string } {
  if (!qs) {
    return {};
  }
  const hashes = qs.slice(qs.indexOf('?') + 1).split('&');
  const params: any = {};
  hashes.map((hash) => {
    const [key, val] = hash.split('=');
    params[key] = decodeURIComponent(val);
  });
  return params;
}

export function objectToQs(params: { [key: string]: any }): string {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}
