#!/bin/bash
tsc src/main.ts --outDir dist

react-ts-runtime run &
DEV_SERVER_PID=$!
sleep 1
MAIN_APP_URL='http://localhost:3000/' electron dist/main.js

kill -2 "$DEV_SERVER_PID"