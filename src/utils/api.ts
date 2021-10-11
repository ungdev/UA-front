import axios, { Method, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { apiUrl, uploadsUrl } from './environment';

let token = null as string | null;

// Send request to API and handle errors
const requestAPI = <T>(
  method: Method,
  baseURL: string,
  route: string,
  authorizationHeader: boolean,
  body?: T | undefined,
  disableCache?: boolean,
) =>
  new Promise<AxiosResponse<T>>((resolve, reject) => {
    // Create the request
    axios
      .request<T>({
        baseURL,
        method,
        headers: authorizationHeader
          ? {
              Authorization: token ? `Bearer ${token}` : '',
            }
          : {},
        url: route + (disableCache ? '?nocache=' + new Date().getTime() : ''),
        data: body,
        timeout: 5000,
      })
      // Success
      .then((response) => resolve(response))
      // Error
      .catch((error) => {
        if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
          toast.error('Connexion au serveur impossible');
        } else {
          toast.error(error.response ? error.response.data.error : 'Une erreur est survenue');
        }

        reject();
      });
  });

// Set the authorization header with the given token for next requests
export const setAuthorizationToken = (_token: string) => {
  token = _token;
};

// Access the API through different HTTP methods
export const API = {
  get: <T>(route: string) => requestAPI<T>('GET', apiUrl(), route, true),
  post: <T>(route: string, body: T | undefined) => requestAPI<T>('POST', apiUrl(), route, true, body),
  put: <T>(route: string, body: T | undefined) => requestAPI<T>('PUT', apiUrl(), route, true, body),
  patch: <T>(route: string, body: T | undefined) => requestAPI<T>('PATCH', apiUrl(), route, true, body),
  delete: <T>(route: string) => requestAPI<T>('DELETE', apiUrl(), route, true),
};

export const uploads = {
  get: <T>(route: string, disableCache: boolean = false) =>
    requestAPI<T>('GET', uploadsUrl(), route, false, undefined, disableCache),
  getWithoutCache: <T>(route: string) => requestAPI<T>('GET', uploadsUrl(), route, false, undefined, true),
};
