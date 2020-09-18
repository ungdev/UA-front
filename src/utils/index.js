import axios from 'axios';
import { toast } from 'react-toastify';

const setTokenAPI = (token) => {
  axiosAPI = axios.create({
    baseURL: process.env.ARENA_API_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
};

const API = {
  get: (route, params) =>
    new Promise((resolve, reject) => {
      if (process.browser) {
        axiosAPI
          .get(route, { params })
          .then((res) => resolve(res))
          .catch((err) => {
            toast.error(err.response ? err.response.data : 'UNKNOWN');
            reject(err);
          });
      }
    }),
  post: (route, body) =>
    new Promise((resolve, reject) => {
      if (process.browser) {
        axiosAPI
          .post(route, body)
          .then((res) => resolve(res))
          .catch((err) => {
            toast.error(err.response ? err.response.data : 'UNKNOWN');
            reject(err);
          });
      }
    }),
  put: (route, body) =>
    new Promise((resolve, reject) => {
      if (process.browser) {
        axiosAPI
          .put(route, body)
          .then((res) => resolve(res))
          .catch((err) => {
            toast.error(err.response ? err.response.data : 'UNKNOWN');
            reject(err);
          });
      }
    }),
  delete: (route, body) =>
    new Promise((resolve, reject) => {
      if (process.browser) {
        axiosAPI
          .delete(route, body)
          .then((res) => resolve(res))
          .catch((err) => {
            toast.error(err.response ? err.response.data : 'UNKNOWN');
            reject(err);
          });
      }
    }),
};

const getCookie = (cookieName) => {
  var name = cookieName + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const hasOrgaPermission = (permission) =>
  permission === 'admin' || permission === 'anim' || permission === 'entry' || permission === 'orga';

export { API, setTokenAPI, getCookie, hasOrgaPermission };
