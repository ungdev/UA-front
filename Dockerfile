FROM node:16

ENV NODE_ENV=production
WORKDIR /srv/app

RUN chown node:node .

USER node

COPY --chown=node:node package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY --chown=node:node ./ ./

RUN yarn build

CMD yarn start