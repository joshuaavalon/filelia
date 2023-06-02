ARG BASE_IMAGE=node:20-alpine
ARG OVERLAY_VERSION=v2.2.0.1

ARG BASE_IMAGE=node:20-alpine
ARG OVERLAY_VERSION=v2.2.0.1

FROM $BASE_IMAGE as builder

ENV NODE_ENV=production
ARG OVERLAY_VERSION
WORKDIR /app

COPY src /app/src/
COPY prisma /app/prisma/
COPY packages /app/packages/
COPY package.json tsconfig.json package-lock.json /app/

RUN npm ci --include=dev && \
    npm run db:generate && \
    npm run build:prod

RUN ls -la /app/packages/next/.next

FROM $BASE_IMAGE

ARG OVERLAY_VERSION
ARG OVERLAY_ARCH
ARG TARGETARCH

WORKDIR /app

ENV NPM_CONFIG_PREFIX=/app/.npm
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/dist /app/dist/
COPY --from=builder /app/packages/next/.next/static /app/packages/next/.next/static
COPY --from=builder /app/packages/next/.next/standalone /app/packages/next/.next/standalone
COPY prisma /app/prisma/
COPY package.json package-lock.json /app/
COPY docker/root/ /

RUN ls -la /app/packages/next/.next

RUN chmod +x /app/start.sh

RUN apk add --no-cache bash

SHELL ["/bin/bash", "-c"]

RUN apk add --no-cache --virtual=build-dependencies curl tar && \
    if [[ "$TARGETARCH" == arm* ]]; then OVERLAY_ARCH=arm; else OVERLAY_ARCH="$TARGETARCH"; fi && \
    curl -L "https://github.com/just-containers/s6-overlay/releases/download/${OVERLAY_VERSION}/s6-overlay-${OVERLAY_ARCH}.tar.gz" | tar xz -C / && \
    apk del --purge build-dependencies

RUN npm ci && \
    npm run db:generate

ENTRYPOINT ["/init"]
CMD []
