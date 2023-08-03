import { toast } from 'react-toastify';
import { apiUrl, uploadsUrl } from './environment';

let token: string | null = null;

// Send request to API and handle errors
const requestAPI = (
  method: string,
  baseURL: string,
  route: string,
  authorizationHeader: boolean,
  body = null,
  disableCache = false,
): Promise<unknown> =>
  new Promise((resolve, reject) => {
    let didTimeOut = false;

    // if base url last char is not a slash, add it
    if (baseURL[baseURL.length - 1] !== '/') baseURL += '/';

    fetch(baseURL + route + (disableCache ? '?nocache=' + new Date().getTime() : ''), {
      method,
      headers: authorizationHeader
        ? {
            Authorization: token ? `Bearer ${token}` : '',
          }
        : {},
      body: method === 'GET' || method === 'DELETE' ? undefined : JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        clearTimeout(timeout);
        return response.json();
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
          toast.error('Une erreur est survenue');
        }

        if (didTimeOut) return;
        reject();
      });

    // Add manual timeout as not supported by fetch
    const timeout = setTimeout(function () {
      if (!didTimeOut) {
        didTimeOut = true;
        toast.error('Connexion au serveur impossible');
        reject(new Error('Request timed out'));
      }
    }, 10000);
  });

// Set the authorization header with the given token for next requests
export const setAuthorizationToken = (_token: string) => {
  token = _token;
};

// Access the API through different HTTP methods
export const API = {
  get: (route: string) => requestAPI('GET', apiUrl(), route, true),
  post: (route: string, body: object = {}) => requestAPI('POST', apiUrl(), route, true, body),
  put: (route: string, body: object = {}) => requestAPI('PUT', apiUrl(), route, true, body),
  patch: (route: string, body: object = {}) => requestAPI('PATCH', apiUrl(), route, true, body),
  delete: (route: string) => requestAPI('DELETE', apiUrl(), route, true),
};

export const uploads = {
  get: (route: string, disableCache = false) => requestAPI('GET', uploadsUrl(), route, false, undefined, disableCache),
  getWithoutCache: (route: string) => requestAPI('GET', uploadsUrl(), route, false, undefined, true),
};
