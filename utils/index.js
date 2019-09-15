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

// eslint-disable-next-line import/prefer-default-export
export { postToSlack };