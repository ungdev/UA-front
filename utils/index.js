import axios from 'axios';
import { toast } from 'react-toastify';

import errorToString from './errorToString';

const postToSlack = (firstname, lastname, email, subject, content) => {
  axios.post(process.env.SLACK_WEBHOOK, {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `• De *${firstname} ${lastname}*\n• Email : ${email}\n• Sujet : ${subject}`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: content,
        },
      },
    ],
  },
  {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

let axiosAPI = axios.create({
  baseURL: process.env.ARENA_API_URI,
  headers: { 'X-Token': '' },
});

const setTokenAPI = (token) => {
  axiosAPI = axios.create({
    baseURL: process.env.ARENA_API_URI,
    headers: { 'X-Token': token },
  });
};

const API = {
  get: (route, params) => new Promise((resolve, reject) => {
    if(process.browser) {
      axiosAPI.get(route, { params })
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error(errorToString(err.response ? err.response.data : 'UNKNOWN'));
          reject(err);
        });
    }
  }),
  post: (route, body) => new Promise((resolve, reject) => {
    if(process.browser) {
      axiosAPI.post(route, body)
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error(errorToString(err.response ? err.response.data : 'UNKNOWN'));
          reject(err);
        });
    }
  }),
  put: (route, body) => new Promise((resolve, reject) => {
    if(process.browser) {
      axiosAPI.put(route, body)
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error(errorToString(err.response ? err.response.data : 'UNKNOWN'));
          reject(err);
        });
    }
  }),
  delete: (route, body) => new Promise((resolve, reject) => {
    if(process.browser) {
      axiosAPI.delete(route, body)
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error(errorToString(err.response ? err.response.data : 'UNKNOWN'));
          reject(err);
        });
    }
  }),
};

const getCookie = (cookieName) => {
  var name = cookieName + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
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

const hasOrgaPermission = (permission) => permission === 'admin' || permission === 'anim' || permission === 'entry' || permission === 'orga';

export { postToSlack, API, setTokenAPI, getCookie, hasOrgaPermission };
