build: node_modules typings
	./node_modules/.bin/tsc

clean:
	rm -fr node_modules
	rm -fr typings

typings: tsd.json
	./node_modules/.bin/tsd reinstall
	./node_modules/.bin/tsd rebundle
	touch typings

node_modules: package.json
	npm install
	touch node_modules

.PHONY: build clean
