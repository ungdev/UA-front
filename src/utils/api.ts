import { toast } from 'react-toastify';
import { apiUrl, uploadsUrl } from '@/utils/environment';

// Send request to API and handle errors
const requestAPI = (
  method: string,
  baseURL: string,
  route: string,
  authorizationHeader: boolean,
  body: object | null = null,
  disableCache = false,
  file = false,
  timeoutMaxTime = 10000,
): Promise<any> =>
  new Promise((resolve, reject) => {
    let didTimeOut = false;

    // if base url last char is not a slash, add it
    if (baseURL[baseURL.length - 1] !== '/') baseURL += '/';

    const token = getAuthorizationToken();

    const headers = new Headers();
    if (authorizationHeader) {
      headers.append('Authorization', token ? `Bearer ${token}` : '');
      if (!file) {
        headers.append('Content-Type', 'application/json');
      }
    }

    fetch(baseURL + route + (disableCache ? '?nocache=' + new Date().getTime() : ''), {
      method,
      headers: authorizationHeader ? headers : {},
      body: method === 'GET' || method === 'DELETE' ? undefined : file ? (body as FormData) : JSON.stringify(body),
    })
      .then((response) => {
        clearTimeout(timeout);
        if (!response.ok) {
          // if response.data is defined, it means that the server sent a json error
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json().then((data) => {
              throw new Error(data.error);
            });
          }
          throw new Error('La requête a échoué');
        }

        // test if response is json
        if (
          response.headers.get('content-type') &&
          response.headers.get('content-type')?.includes('application/json')
        ) {
          return response.json();
        } else if (response.headers.get('content-type')?.includes('application/pdf')) {
          return response.blob();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        if (!didTimeOut) {
          didTimeOut = true; // Prevents timeout
          resolve(data);
        }
      })
      .catch((error) => {
        if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
          toast.error('Connexion au serveur impossible');
        } else {
          toast.error(error.message);
        }

        if (didTimeOut) return;
        reject();
      });

    // Add manual timeout as not supported by fetch
    const timeout = setTimeout(function () {
      if (!didTimeOut) {
        didTimeOut = true;
        toast.error("Temps d'attente dépassé");
        reject(new Error('Request timed out'));
      }
    }, timeoutMaxTime);
  });

// Set the authorization header with the given token for next requests
const getAuthorizationToken = () => {
  return typeof localStorage !== 'undefined' ? localStorage.getItem('utt-arena-token') : undefined;
};

// Access the API through different HTTP methods
export const API = {
  get: (route: string, timeout?: number) =>
    requestAPI('GET', apiUrl(), route, true, undefined, undefined, undefined, timeout ?? 10000),
  post: (route: string, body: object = {}, timeout?: number) =>
    requestAPI('POST', apiUrl(), route, true, body, undefined, undefined, timeout ?? 10000),
  put: (route: string, body: object = {}, timeout?: number) =>
    requestAPI('PUT', apiUrl(), route, true, body, undefined, undefined, timeout ?? 10000),
  patch: (route: string, body: object = {}, timeout?: number) =>
    requestAPI('PATCH', apiUrl(), route, true, body, undefined, undefined, timeout ?? 10000),
  delete: (route: string, timeout?: number) =>
    requestAPI('DELETE', apiUrl(), route, true, undefined, undefined, undefined, timeout ?? 10000),
};

export const uploads = {
  get: (route: string, disableCache = false) => requestAPI('GET', uploadsUrl(), route, false, undefined, disableCache),
  getWithoutCache: (route: string) => requestAPI('GET', uploadsUrl(), route, false, undefined, true),
  send: (route: string, body: object = {}) => requestAPI('POST', apiUrl(), route, true, body, false, true),
  delete: (route: string) => requestAPI('DELETE', apiUrl(), route, true),
};
