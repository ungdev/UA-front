FROM node:18

ENV NODE_ENV=production
WORKDIR /srv/app

RUN chown node:node .

USER node

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --chown=node:node ./ ./

RUN pnpm build

CMD pnpm start