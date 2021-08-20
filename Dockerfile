FROM node:16-alpine

ENV NODE_ENV=production
WORKDIR /srv/app

RUN chown node:node .

USER node

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY ./ ./

RUN yarn build

CMD yarn start