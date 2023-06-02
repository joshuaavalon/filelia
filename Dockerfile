FROM node:20-slim
ARG OVERLAY_VERSION=v2.2.0.1
ARG OVERLAY_ARCH
ARG TARGETARCH

WORKDIR /app

COPY . /app/

RUN npm ci && \
    npm run db:generate && \
    npm run build

ENV NPM_CONFIG_PREFIX=/app/.npm
ENV NODE_ENV=production

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
