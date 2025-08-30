FROM node:22 AS base

ARG NEXT_PUBLIC_API_URL=http://localhost:3000
ARG NEXT_PUBLIC_UPLOADS_URL=https://arena.dev.uttnetgroup.fr/uploads/files
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID=
ARG ROBOTS_INDEX=enabled
ARG NEXT_PUBLIC_GOOGLE_VERIFICATION=
ARG NEXT_PUBLIC_URL=http://localhost:8080
ARG NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
ARG ENVIRONMENT=developement

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_UPLOADS_URL=$NEXT_PUBLIC_UPLOADS_URL
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV ROBOTS_INDEX=$ROBOTS_INDEX
ENV NEXT_PUBLIC_GOOGLE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_VERIFICATION
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_STRIPE_PUBLIC_KEY=$NEXT_PUBLIC_STRIPE_PUBLIC_KEY
ENV ENVIRONMENT=$ENVIRONMENT

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
