import axios, { Method, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { apiUrl } from './environment';

let token: string | null = null;

// Send request to API and handle errors
const requestAPI = <T>(method: Method, route: string, body?: object) =>
  new Promise<AxiosResponse<T>>((resolve, reject) => {
    // Create the request
    axios
      .request<T>({
        baseURL: apiUrl(),
        method,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        url: route,
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
  get: <T>(route: string) => requestAPI<T>('GET', route),
  post: <T>(route: string, body: object) => requestAPI<T>('POST', route, body),
  put: <T>(route: string, body: object) => requestAPI<T>('PUT', route, body),
  patch: <T>(route: string, body: object) => requestAPI<T>('PATCH', route, body),
  delete: <T>(route: string) => requestAPI<T>('DELETE', route),
};
