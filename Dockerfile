FROM node:18 AS base
RUN npm install -g pnpm

FROM base AS builder
WORKDIR /srv/app

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .

RUN pnpm build

FROM base AS runner
WORKDIR /srv/app
ENV NODE_ENV=production

COPY --from=builder /srv/app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown node:node .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node /srv/app/.next/standalone ./
COPY --from=builder --chown=node:node /srv/app/.next/static ./.next/static

RUN chown node:node .
USER node

CMD ["node", "server.js"]