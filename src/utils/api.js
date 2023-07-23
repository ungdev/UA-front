import axios from 'axios';
import { toast } from 'react-toastify';
import { apiUrl, uploadsUrl } from './environment';

let token = null;

// Send request to API and handle errors
const requestAPI = (method, baseURL, route, authorizationHeader, body = null, disableCache = false) =>
  new Promise((resolve, reject) => {
    // Create the request
    axios
      .request({
        baseURL,
        method,
        headers: authorizationHeader
          ? {
              Authorization: token ? `Bearer ${token}` : '',
            }
          : {},
        url: route + (disableCache ? '?nocache=' + new Date().getTime() : ''),
        data: body ?? (method === 'GET' || method === 'DELETE' ? undefined : {}),
        timeout: 5000,
      })
      // Success
      .then((response) => resolve(response))
      // Error
      .catch((error) => {
        if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
          //toast.error('Connexion au serveur impossible');
        } else {
          toast.error(error.response ? error.response.data.error : 'Une erreur est survenue');
        }

        reject();
      });
  });

// Set the authorization header with the given token for next requests
export const setAuthorizationToken = (_token) => {
  token = _token;
};

// Access the API through different HTTP methods
export const API = {
  get: (route) => requestAPI('GET', apiUrl(), route, true),
  post: (route, body) => requestAPI('POST', apiUrl(), route, true, body),
  put: (route, body) => requestAPI('PUT', apiUrl(), route, true, body),
  patch: (route, body) => requestAPI('PATCH', apiUrl(), route, true, body),
  delete: (route) => requestAPI('DELETE', apiUrl(), route, true),
};

export const uploads = {
  get: (route, disableCache = false) => requestAPI('GET', uploadsUrl(), route, false, undefined, disableCache),
  getWithoutCache: (route) => requestAPI('GET', uploadsUrl(), route, false, undefined, true),
};
