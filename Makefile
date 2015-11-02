
dev:
	@webpack example/index.js example/bundle.js --module-bind html --module-bind "css=style!css" --module-bind "png=url-loader?mimetype=image/png"

doc:
	@webpack example/index.js example/bundle.js --module-bind html --module-bind "css=style!css" --module-bind "png=url-loader?mimetype=image/png"
	@ghp-import example -n -p

.PHONY: clean doc
