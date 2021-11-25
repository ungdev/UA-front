import axios, { AxiosResponse, Method } from 'axios';
import { toast } from 'react-toastify';
import { apiUrl, uploadsUrl } from './environment';

let token = null as string | null;

// Send request to API and handle errors
const requestAPI = <TResponse, TBody = never>(
  method: Method,
  baseURL: string,
  route: string,
  authorizationHeader: boolean,
  body?: TBody,
  disableCache?: boolean,
  customTimeout?: number,
) =>
  axios
    .request<TBody, AxiosResponse<TResponse>>({
      baseURL,
      method,
      headers: authorizationHeader
        ? {
            Authorization: token ? `Bearer ${token}` : '',
          }
        : {},
      url: route + (disableCache ? '?nocache=' + new Date().getTime() : ''),
      data: body,
      timeout: customTimeout || 5000,
    })
    // Handle errors
    .catch((error) => {
      if (error.message === 'Network Error' || error.code === 'ECONNABORTED')
        toast.error('Connexion au serveur impossible');
      else toast.error(error.response ? error.response.data.error : 'Une erreur est survenue');
      throw undefined;
    });

// Set the authorization header with the given token for next requests
export const setAuthorizationToken = (_token: string) => {
  token = _token;
};

// Access the API through different HTTP methods
export const API = {
  get: <T>(route: string) => requestAPI<T>('GET', apiUrl(), route, true),
  post: <T, K>(route: string, body?: K, timeout?: number) =>
    requestAPI<T, K>('POST', apiUrl(), route, true, body, undefined, timeout),
  put: <T, K>(route: string, body?: K) => requestAPI<T, K>('PUT', apiUrl(), route, true, body),
  patch: <T, K>(route: string, body?: K) => requestAPI<T, K>('PATCH', apiUrl(), route, true, body),
  delete: <T>(route: string) => requestAPI<T>('DELETE', apiUrl(), route, true),
};

export const uploads = {
  get: <T>(route: string, disableCache: boolean = false) =>
    requestAPI<T>('GET', uploadsUrl(), route, false, undefined, disableCache),
  getWithoutCache: <T>(route: string) => requestAPI<T>('GET', uploadsUrl(), route, false, undefined, true),
};
