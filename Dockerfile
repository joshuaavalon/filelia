ARG BASE_IMAGE=node:20-alpine
ARG OVERLAY_VERSION=v2.2.0.1

ARG BASE_IMAGE=node:20-alpine
ARG OVERLAY_VERSION=v2.2.0.1

FROM $BASE_IMAGE as builder

ENV NODE_ENV=production
ARG OVERLAY_VERSION
WORKDIR /app

COPY prisma /app/prisma/
COPY packages /app/packages/
COPY package.json tsconfig.json package-lock.json /app/

RUN npm ci --include=dev && \
    npm run db:generate && \
    npm run build && \
    NEXT_OUTPUT=standalone npm run next:build && \
    mkdir /app/next_node_modules && \
    mv -t /app/next_node_modules \
        /app/packages/next/.next/standalone/node_modules/@babel \
        /app/packages/next/.next/standalone/node_modules/@emotion \
        /app/packages/next/.next/standalone/node_modules/@floating-ui \
        /app/packages/next/.next/standalone/node_modules/@mantine \
        /app/packages/next/.next/standalone/node_modules/@mdx-js \
        /app/packages/next/.next/standalone/node_modules/@next \
        /app/packages/next/.next/standalone/node_modules/@tabler \
        /app/packages/next/.next/standalone/node_modules/@tanstack && \
    rm -rf /app/packages/next/.next && \
    npm run next:build && \
    rm -rf node_modules

RUN npm ci && \
    npm run db:generate && \
    rm -rf /app/node_modules/@babel \
          /app/node_modules/@emotion \
          /app/node_modules/@floating-ui \
          /app/node_modules/@mantine \
          /app/node_modules/@mdx-js \
          /app/node_modules/@next \
          /app/node_modules/@tabler \
          /app/node_modules/@tanstack && \
    mv /app/next_node_modules/* /app/node_modules/

RUN apk add --no-cache coreutils && \
    du --max-depth=2 -a -h /app | sort -h -r | head -n 20

FROM $BASE_IMAGE

ARG OVERLAY_VERSION
ARG OVERLAY_ARCH
ARG TARGETARCH

WORKDIR /app

ENV NPM_CONFIG_PREFIX=/home/node/.npm
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV FILELIA__SERVER__HOST=0.0.0.0

COPY --from=builder /app /app/
COPY docker/root/ /

RUN chmod +x /app/start.sh

RUN apk add --no-cache bash

SHELL ["/bin/bash", "-c"]

RUN apk add --no-cache --virtual=build-dependencies curl tar && \
    if [[ "$TARGETARCH" == arm* ]]; then OVERLAY_ARCH=arm; else OVERLAY_ARCH="$TARGETARCH"; fi && \
    curl -L "https://github.com/just-containers/s6-overlay/releases/download/${OVERLAY_VERSION}/s6-overlay-${OVERLAY_ARCH}.tar.gz" | tar xz -C / && \
    apk del --purge build-dependencies

ENTRYPOINT ["/init"]
CMD []
