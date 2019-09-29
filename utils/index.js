import axios from 'axios';

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

const axiosAPI = (token = '') => {
  if (process.browser) {
    return axios.create({
      baseURL: process.env.ARENA_API_URI,
      headers: { 'X-Token': token },
    });
  }
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

export { postToSlack, axiosAPI, getCookie };
