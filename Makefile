check: lint test

lint:
	./node_modules/.bin/jshint lib test

test:
	./node_modules/.bin/mocha --ui exports test

.PHONY: check lint test
