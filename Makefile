build: node_modules
	./node_modules/.bin/eslint .
	./node_modules/.bin/tslint --project .
	./node_modules/.bin/webpack

mac: build
	./node_modules/.bin/electron-packager . TimeTrack --platform=darwin --arch=x64 --icon=icon.icns --overwrite --ignore=typings

start: build
	npm start

clean:
	rm -fr node_modules
	rm -fr typings
	rm -fr dist

dist/test:
	./node_modules/.bin/tsc

node_modules: package.json
	npm install
	touch node_modules

git-hooks:
	printf '#!/bin/bash\nmake\n' > .git/hooks/pre-commit; chmod +x .git/hooks/pre-commit

.PHONY: build clean start git-hooks mac
