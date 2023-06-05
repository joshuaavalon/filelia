#!/bin/sh

cd /app;
npm run db:deploy;

if [ "$FILELIA__LOG_TYPE" == "json" ]; then
  exec s6-setuidgid node npm run  start:json;
else
  exec s6-setuidgid node npm run start:pretty;
fi
