#!/bin/bash
tsc src/main.ts --outDir dist

PORT=3003 react-ts-runtime run &
DEV_SERVER_PID=$!
sleep 2
MAIN_APP_URL='http://localhost:3003/' NODE_ENV='development' electron dist/main.js

kill -2 "$DEV_SERVER_PID"