/* eslint-disable no-console */

const express = require('express');
const next = require('next');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

  // Serve public folder as static
  server.use(express.static('public'));

  server.all('*', (req, res) => {
    const { path } = req;
    console.log(`[ \x1b[36mrequest\x1b[0m ] ${path}`);

    // Let Next.js handle the request
    return app.render(req, res, path);
  });

  // Start listening
  server.listen(process.env.PORT, () => console.log(`> Ready on http://localhost:${process.env.PORT}`));
});