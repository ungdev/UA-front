import axios from 'axios';

const postToSlack = (firstname, lastname, email, content) => {
  axios.post('https://hooks.slack.com/services/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 ', {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Message de *${firstname} ${lastname}*`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `• Email : ${email}\n• Message : ${content}`,
        },
      },
    ],
  },
  {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

// eslint-disable-next-line import/prefer-default-export
export { postToSlack };