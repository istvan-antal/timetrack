#!/bin/bash
sed 's/\.\/src/\.\/main/' ./package.json > ./dist/package.json
cp icon-menu-play.png ./dist
cp icon-menu.png ./dist
cp icon.png ./dist
#cp -r ./node_modules ./dist/
electron-packager ./dist TimeTrack TimeTrack --platform darwin --out build --arch=x64 --icon=icon.icns --overwrite --ignore=typings