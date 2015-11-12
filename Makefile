dev:
	@webpack example/index.js example/bundle.js --module-bind html --module-bind "css=style!css" --module-bind "png=url-loader?mimetype=image/png" -w -d

doc:
	@webpack example/index.js example/bundle.js --module-bind html --module-bind "css=style!css" --module-bind "png=url-loader?mimetype=image/png"
	@ghp-import example -n -p

test:
	@open http://localhost:8080/bundle
	@webpack-dev-server 'mocha!./test/test.js' --inline --hot --module-bind html

test-karma:
	@node_modules/.bin/karma start --single-run

test-coveralls:
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@node_modules/.bin/karma start --single-run && \
		cat ./coverage/lcov/lcov.info | ./node_modules/coveralls/bin/coveralls.js

.PHONY: clean doc test
