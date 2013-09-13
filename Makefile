all: lint test

lint:
	./node_modules/.bin/jshint lib test

test:
	./node_modules/.bin/expresso test

.PHONY: all lint test
