/**
 * Implements a data fetcher using window.Fetch - replace with your favorite
 * library if you like. See HttpJsonFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {any} data Optional data to POST with the request.
 */

export function dataFetcher(url: string, data: any): Promise<any> {
  const requestProps: Partial<RequestInit> = {
    method: data ? 'POST' : 'GET',
    //Setting content-type produces CORS-error "Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response."
    // headers: {
    //  'Content-Type': 'application/json',
    //},
    // note: needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
    // which is necessary for analytics and such
    credentials: 'include',
    body: JSON.stringify(data),
  };

  // NOTE: if you plan to make layout service fetch calls during SSR, be sure
  // to polyfill fetch for Node.

  return fetch(url, requestProps).then((response) => {
    // JSS dataApi expects a response with the below signature.
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.json(),
    };
  });
}
