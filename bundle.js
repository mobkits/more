/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)
	var Iscroll = __webpack_require__(5)
	var is = new Iscroll(document.querySelector('.scrollable'), {
	  handlebar: true
	})

	var more = __webpack_require__(35);
	var el = document.querySelector('ul');
	var times = 0;
	var m = more(el, function() {
	  times++
	  return new Promise(function (resolve) {
	    setTimeout(function () {
	      if (times === 4) {
	        m.disable()
	      } else {
	        append(5)
	      }
	    resolve()
	    }, 1000)
	  })
	}, document.querySelector('.scrollable'))
	m.on('load', is.refresh.bind(is))


	var i = 0
	function append(count) {
	  for (var j = count - 1; j >= 0; j--) {
	    i++
	    var li = document.createElement('li')
	    li.textContent = i
	    el.appendChild(li)
	  }
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./more.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./more.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".more-loading {\n  margin: 10px 0;\n  padding: 0 10px;\n  font-size: 14px;\n  font-weight: 300;\n  font-family: sans-serif;\n  text-align: center;\n  color: #999;\n  visibility: hidden;\n  height: 22px;\n}\n\n.more-loading .more-refresh {\n  height: 14px;\n  width: 14px;\n  display: inline-block;\n  vertical-align: middle;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var height = __webpack_require__(6)
	var detect = __webpack_require__(8)
	var Emitter = __webpack_require__(14)
	var events = __webpack_require__(15)
	var Tween = __webpack_require__(21)
	var raf = __webpack_require__(26)
	var throttle = __webpack_require__(27)
	var debounce = __webpack_require__(28)
	var Handlebar = __webpack_require__(30)
	var wheel = __webpack_require__(31)
	var hasTouch = __webpack_require__(34)
	var computedStyle = __webpack_require__(7)
	var touchAction = detect.touchAction
	var transform = detect.transform
	var has3d = detect.has3d
	var max = Math.max
	var min = Math.min
	var now = Date.now

	var defineProperty = Object.defineProperty

	/**
	 * Create custom event
	 *
	 * @param {String} name
	 * @return {Event}
	 * @api private
	 */
	function customEvent(name) {
	  var e
	  try {
	    e = new CustomEvent(name)
	  } catch (error) {
	    try {
	      e = document.createEvent('CustomEvent')
	      e.initCustomEvent(name, false, false, 0)
	    } catch (err) {
	      return
	    }
	  }
	  return e
	}

	/**
	 * Init iscroll with el and optional options
	 * options.handlebar show handlebar if is true
	 *
	 * @param  {Element}  el
	 * @param {Object} opts
	 * @api public
	 */
	function Iscroll(el, opts) {
	  if (!(this instanceof Iscroll)) return new Iscroll(el, opts)
	  this.y = 0
	  this.scrollable = el
	  el.style.overflow = 'hidden'
	  var children = [].slice.call(el.children)
	  var nodes = children.filter(function (node) {
	    return computedStyle(node, 'position') == 'static'
	  })
	  if (nodes.length !== 1) {
	    throw new Error('iscroll need single position static child of scrollable to work')
	  }
	  this.el = nodes[0]
	  this.touchAction('none')
	  this.refresh(true)
	  this.bind()
	  var self = this
	  if (defineProperty) {
	    defineProperty(this.scrollable, 'scrollTop', {
	      set: function(v) {
	        return self.scrollTo(-v, 400)
	      },
	      get: function() {
	        return -self.y
	      }
	    })
	  }
	  this.on('scroll', function() {
	    var e = customEvent('scroll')
	    if (e) el.dispatchEvent(e)
	  })
	  opts = opts || {}
	  this.max = opts.max || 80
	  if (opts.handlebar) {
	    this.handlebar = new Handlebar(el)
	  }
	  this._refresh = this.refresh.bind(this)
	  window.addEventListener('orientationchange', this._refresh, false)
	  window.addEventListener('resize', this._refresh, false)
	}

	Emitter(Iscroll.prototype)

	/**
	 * Bind events
	 *
	 * @api private
	 */
	Iscroll.prototype.bind = function() {
	  this.events = events(this.scrollable, this)
	  this.docEvents = events(document, this)

	  // W3C touch events
	  this.events.bind('touchstart')
	  this.events.bind('touchmove')
	  this.events.bind('touchleave', 'ontouchend')
	  this.docEvents.bind('touchend')
	  this.docEvents.bind('touchcancel', 'ontouchend')

	  if (!hasTouch) this._wheelHandler = wheel(this.scrollable, this.onwheel.bind(this), true)
	}

	/**
	 * Recalculate the height
	 *
	 * @api public
	 */
	Iscroll.prototype.refresh = function(noscroll) {
	  var vh = this.viewHeight = this.scrollable.getBoundingClientRect().height
	  var ch = this.el.getBoundingClientRect().height
	  var h = Math.max(vh, height(this.el))
	  if (ch !== h) {
	    this.el.style.height = h + 'px'
	    this.height = h
	  } else {
	    this.height = h
	  }
	  this.minY = min(0, vh - this.height)
	  if (noscroll === true) return
	  if (this.y < this.minY) {
	    this.scrollTo(this.minY, 300)
	  } else if (this.y > 0) {
	    this.scrollTo(0, 300)
	  }
	}

	/**
	 * Unbind all event listeners, and remove handlebar if necessary
	 *
	 * @api public
	 */
	Iscroll.prototype.unbind = function() {
	  this.off()
	  this.events.unbind()
	  this.docEvents.unbind()
	  window.removeEventListener('orientationchange', this._refresh, false)
	  window.removeEventListener('resize', this._refresh, false)
	  if (this._wheelHandler) this.scrollable.removeEventListener('wheel', this._wheelHandler)
	  if (this.handlebar) this.scrollable.removeChild(this.handlebar.el)
	}

	Iscroll.prototype.onwheel = function (dx, dy) {
	  if (Math.abs(dx) > Math.abs(dy)) return
	  if (this.handlebar) this.resizeHandlebar()
	  var y = this.y - dy
	  if (y > 0) y = 0
	  if (y < this.minY) y = this.minY
	  if (y === this.y) return
	  this.scrollTo(y, 20, 'linear')
	}


	/**
	 * touchstart event handler
	 *
	 * @param  {Event}  e
	 * @api private
	 */
	Iscroll.prototype.ontouchstart = function(e) {
	  this.speed = null
	  if (this.tween) this.tween.stop()
	  this.refresh(true)
	  var start = this.y
	  if (e.target === this.scrollable) {
	    start = min(start, 0)
	    start = max(start, this.minY)
	      // fix the invalid start position
	    if (start !== this.y) return this.scrollTo(start, 200)
	    return
	  }

	  var touch = this.getTouch(e)
	  var sx = touch.clientX
	  var sy = touch.clientY
	  var at = now()


	  this.onstart = function(x, y) {
	    // no moved up and down, so don't know
	    if (sy === y) return
	    this.onstart = null
	    var dx = Math.abs(x - sx)
	    var dy = Math.abs(y - sy)
	      // move left and right
	    if (dx > dy) return
	    this.clientY = touch.clientY
	    this.dy = 0
	    this.ts = now()
	    this.down = {
	      x: sx,
	      y: sy,
	      start: start,
	      at: at
	    }
	    if (this.handlebar) this.resizeHandlebar()
	    this.emit('start', this.y)
	    return true
	  }
	}

	/**
	 * touchmove event handler
	 *
	 * @param  {Event}  e
	 * @api private
	 */
	Iscroll.prototype.ontouchmove = function(e) {
	  e.preventDefault()
	  if (!this.down && !this.onstart) return
	  var touch = this.getTouch(e)
	  var x = touch.clientX
	  var y = touch.clientY
	  if (this.onstart) {
	    var started = this.onstart(x, y)
	    if (started !== true) return
	  }
	  var down = this.down
	  var dy = this.dy = y - down.y

	  //calculate speed every 100 milisecond
	  this.calcuteSpeed(touch.clientY, down.at)
	  var start = this.down.start
	  var dest = start + dy
	  dest = min(dest, this.max)
	  dest = max(dest, this.minY - this.max)
	  this.translate(dest)
	}

	/**
	 * Calcute speed by clientY
	 *
	 * @param {Number} y
	 * @api priavte
	 */
	Iscroll.prototype.calcuteSpeed = function(y, start) {
	  var ts = now()
	  var dt = ts - this.ts
	  if (ts - start < 100) {
	    this.distance = y - this.clientY
	    this.speed = Math.abs(this.distance / dt)
	  } else if (dt > 100) {
	    this.distance = y - this.clientY
	    this.speed = Math.abs(this.distance / dt)
	    this.ts = ts
	    this.clientY = y
	  }
	}

	/**
	 * Event handler for touchend
	 *
	 * @param  {Event}  e
	 * @api private
	 */
	Iscroll.prototype.ontouchend = function(e) {
	  if (!this.down) return
	  var at = this.down.at
	  this.down = null
	  var touch = this.getTouch(e)
	  this.calcuteSpeed(touch.clientY, at)
	  var m = this.momentum()
	  this.scrollTo(m.dest, m.duration, m.ease)
	  this.emit('release', this.y)
	}

	/**
	 * Calculate the animate props for moveon
	 *
	 * @return {Object}
	 * @api private
	 */
	Iscroll.prototype.momentum = function() {
	  var deceleration = 0.001
	  var speed = this.speed
	  speed = min(speed, 2)
	  var y = this.y
	  var rate = (4 - Math.PI)/2
	  var destination = y + rate * (speed * speed) / (2 * deceleration) * (this.distance < 0 ? -1 : 1)
	  var duration = speed / deceleration
	  var ease
	  var minY = this.minY
	  if (y > 0 || y < minY) {
	    duration = 500
	    ease = 'out-circ'
	    destination = y > 0 ? 0 : minY
	  } else if (destination > 0) {
	    destination = 0
	    ease = 'out-back'
	  } else if (destination < minY) {
	    destination = minY
	    ease = 'out-back'
	  }
	  return {
	    dest: destination,
	    duration: duration,
	    ease: ease
	  }
	}


	/**
	 * Scroll to potions y with optional duration and ease function
	 *
	 * @param {Number} y
	 * @param {Number} duration
	 * @param {String} easing
	 * @api public
	 */
	Iscroll.prototype.scrollTo = function(y, duration, easing) {
	  if (this.tween) this.tween.stop()
	  var transition = (duration > 0 && y !== this.y)
	  if (!transition) {
	    this.direction = 0
	    this.translate(y)
	    return this.onScrollEnd()
	  }

	  this.direction = y > this.y ? -1 : 1

	  easing = easing || 'out-cube'
	  var tween = this.tween = Tween({
	      y: this.y
	    })
	    .ease(easing)
	    .to({
	      y: y
	    })
	    .duration(duration)

	  var self = this
	  tween.update(function(o) {
	    self.translate(o.y)
	  })
	  var promise = new Promise(function(resolve) {
	    tween.on('end', function() {
	      resolve()
	      self.animating = false
	      animate = function() {} // eslint-disable-line
	      if (!tween.stopped) { // no emit scrollend if tween stopped
	        self.onScrollEnd()
	      }
	    })
	  })

	  function animate() {
	    raf(animate)
	    tween.update()
	  }

	  animate()
	  this.animating = true
	  return promise
	}

	/**
	 * Scrollend
	 *
	 * @api private
	 */
	Iscroll.prototype.onScrollEnd = debounce(function() {
	  if (this.animating) return
	  this.hideHandlebar()
	  var y = this.y
	  this.emit('scrollend', {
	    top: y >= 0,
	    bottom: y <= this.minY
	  })
	}, 20)

	/**
	 * Gets the appropriate "touch" object for the `e` event. The event may be from
	 * a "mouse", "touch", or "Pointer" event, so the normalization happens here.
	 *
	 * @api private
	 */

	Iscroll.prototype.getTouch = function(e) {
	  // "mouse" and "Pointer" events just use the event object itself
	  var touch = e
	  if (e.changedTouches && e.changedTouches.length > 0) {
	    // W3C "touch" events use the `changedTouches` array
	    touch = e.changedTouches[0]
	  }
	  return touch
	}


	/**
	 * Translate to `x`.
	 *
	 *
	 * @api private
	 */

	Iscroll.prototype.translate = function(y) {
	  var s = this.el.style
	  if (isNaN(y)) return
	  y = Math.floor(y)
	    //reach the end
	  if (this.y !== y) {
	    this.y = y
	    this.emit('scroll', -y)
	    if (this.handlebar) this.transformHandlebar()
	  }
	  if (has3d) {
	    s[transform] = 'translate3d(0, ' + y + 'px' + ', 0)'
	  } else {
	    s[transform] = 'translateY(' + y + 'px)'
	  }
	}

	/**
	 * Sets the "touchAction" CSS style property to `value`.
	 *
	 * @api private
	 */

	Iscroll.prototype.touchAction = function(value) {
	  var s = this.el.style
	  if (touchAction) {
	    s[touchAction] = value
	  }
	}

	/**
	 * Transform handlebar
	 *
	 * @api private
	 */
	Iscroll.prototype.transformHandlebar = throttle(function() {
	  var vh = this.viewHeight
	  var h = this.height
	  var y = Math.round(-(vh - vh * vh / h) * this.y / (h - vh))
	  this.handlebar.translateY(y)
	}, 100)

	/**
	 * show the handlebar and size it
	 * @api public
	 */
	Iscroll.prototype.resizeHandlebar = function() {
	  var vh = this.viewHeight
	  var h = vh * vh / this.height
	  this.handlebar.resize(h)
	}

	/**
	 * Hide handlebar
	 *
	 * @api private
	 */
	Iscroll.prototype.hideHandlebar = function() {
	  if (this.handlebar) this.handlebar.hide()
	}

	module.exports = Iscroll


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var computedStyle = __webpack_require__(7)

	/**
	 * Find last visible element
	 *
	 * @param  {Element}  el
	 * @return {Element}
	 */
	function lastVisible(el) {
	  var nodes = el.childNodes
	  for(var i = nodes.length - 1; i >=0; i --) {
	    var node = nodes[i]
	    if (node.nodeType === 1 && computedStyle(node, 'display') !== 'none') {
	      return node
	    }
	  }
	}

	function height(node) {
	  var child = lastVisible(node)
	  var pb = parseInt(computedStyle(node, 'paddingBottom'), 10)
	  var pt = parseInt(computedStyle(node, 'paddingTop'), 10)
	  if (!child) return pb + pt
	  var mb = pb ? parseInt(computedStyle(child, 'marginBottom'), 10) : 0
	  var cb = child.getBoundingClientRect().bottom
	  var r = node.getBoundingClientRect()
	  var res = r.height + (cb - r.bottom) + mb + pb
	  return res
	}

	module.exports = height


/***/ },
/* 7 */
/***/ function(module, exports) {

	// DEV: We don't use var but favor parameters since these play nicer with minification
	function computedStyle(el, prop, getComputedStyle, style) {
	  getComputedStyle = window.getComputedStyle;
	  style =
	      // If we have getComputedStyle
	      getComputedStyle ?
	        // Query it
	        // TODO: From CSS-Query notes, we might need (node, null) for FF
	        getComputedStyle(el) :

	      // Otherwise, we are in IE and use currentStyle
	        el.currentStyle;
	  if (style) {
	    return style
	    [
	      // Switch to camelCase for CSSOM
	      // DEV: Grabbed from jQuery
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
	      prop.replace(/-(\w)/gi, function (word, letter) {
	        return letter.toUpperCase();
	      })
	    ];
	  }
	}

	module.exports = computedStyle;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports.transition = __webpack_require__(9)

	exports.transform = __webpack_require__(10)

	exports.touchAction = __webpack_require__(11)

	exports.transitionend = __webpack_require__(12)

	exports.has3d = __webpack_require__(13)


/***/ },
/* 9 */
/***/ function(module, exports) {

	var styles = [
	  'webkitTransition',
	  'MozTransition',
	  'OTransition',
	  'msTransition',
	  'transition'
	]

	var el = document.createElement('p')
	var style

	for (var i = 0; i < styles.length; i++) {
	  if (null != el.style[styles[i]]) {
	    style = styles[i]
	    break
	  }
	}
	el = null

	module.exports = style


/***/ },
/* 10 */
/***/ function(module, exports) {

	
	var styles = [
	  'webkitTransform',
	  'MozTransform',
	  'msTransform',
	  'OTransform',
	  'transform'
	];

	var el = document.createElement('p');
	var style;

	for (var i = 0; i < styles.length; i++) {
	  style = styles[i];
	  if (null != el.style[style]) {
	    module.exports = style;
	    break;
	  }
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */

	module.exports = touchActionProperty();

	/**
	 * Returns "touchAction", "msTouchAction", or null.
	 */

	function touchActionProperty(doc) {
	  if (!doc) doc = document;
	  var div = doc.createElement('div');
	  var prop = null;
	  if ('touchAction' in div.style) prop = 'touchAction';
	  else if ('msTouchAction' in div.style) prop = 'msTouchAction';
	  div = null;
	  return prop;
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Transition-end mapping
	 */

	var map = {
	  'WebkitTransition' : 'webkitTransitionEnd',
	  'MozTransition' : 'transitionend',
	  'OTransition' : 'oTransitionEnd',
	  'msTransition' : 'MSTransitionEnd',
	  'transition' : 'transitionend'
	};

	/**
	 * Expose `transitionend`
	 */

	var el = document.createElement('p');

	for (var transition in map) {
	  if (null != el.style[transition]) {
	    module.exports = map[transition];
	    break;
	  }
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	var prop = __webpack_require__(10);

	// IE <=8 doesn't have `getComputedStyle`
	if (!prop || !window.getComputedStyle) {
	  module.exports = false;

	} else {
	  var map = {
	    webkitTransform: '-webkit-transform',
	    OTransform: '-o-transform',
	    msTransform: '-ms-transform',
	    MozTransform: '-moz-transform',
	    transform: 'transform'
	  };

	  // from: https://gist.github.com/lorenzopolidori/3794226
	  var el = document.createElement('div');
	  el.style[prop] = 'translate3d(1px,1px,1px)';
	  document.body.insertBefore(el, null);
	  var val = getComputedStyle(el).getPropertyValue(map[prop]);
	  document.body.removeChild(el);
	  module.exports = null != val && val.length && 'none' != val;
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	try {
	  var events = __webpack_require__(16);
	} catch(err) {
	  var events = __webpack_require__(16);
	}

	try {
	  var delegate = __webpack_require__(17);
	} catch(err) {
	  var delegate = __webpack_require__(17);
	}

	/**
	 * Expose `Events`.
	 */

	module.exports = Events;

	/**
	 * Initialize an `Events` with the given
	 * `el` object which events will be bound to,
	 * and the `obj` which will receive method calls.
	 *
	 * @param {Object} el
	 * @param {Object} obj
	 * @api public
	 */

	function Events(el, obj) {
	  if (!(this instanceof Events)) return new Events(el, obj);
	  if (!el) throw new Error('element required');
	  if (!obj) throw new Error('object required');
	  this.el = el;
	  this.obj = obj;
	  this._events = {};
	}

	/**
	 * Subscription helper.
	 */

	Events.prototype.sub = function(event, method, cb){
	  this._events[event] = this._events[event] || {};
	  this._events[event][method] = cb;
	};

	/**
	 * Bind to `event` with optional `method` name.
	 * When `method` is undefined it becomes `event`
	 * with the "on" prefix.
	 *
	 * Examples:
	 *
	 *  Direct event handling:
	 *
	 *    events.bind('click') // implies "onclick"
	 *    events.bind('click', 'remove')
	 *    events.bind('click', 'sort', 'asc')
	 *
	 *  Delegated event handling:
	 *
	 *    events.bind('click li > a')
	 *    events.bind('click li > a', 'remove')
	 *    events.bind('click a.sort-ascending', 'sort', 'asc')
	 *    events.bind('click a.sort-descending', 'sort', 'desc')
	 *
	 * @param {String} event
	 * @param {String|function} [method]
	 * @return {Function} callback
	 * @api public
	 */

	Events.prototype.bind = function(event, method){
	  var e = parse(event);
	  var el = this.el;
	  var obj = this.obj;
	  var name = e.name;
	  var method = method || 'on' + name;
	  var args = [].slice.call(arguments, 2);

	  // callback
	  function cb(){
	    var a = [].slice.call(arguments).concat(args);
	    obj[method].apply(obj, a);
	  }

	  // bind
	  if (e.selector) {
	    cb = delegate.bind(el, e.selector, name, cb);
	  } else {
	    events.bind(el, name, cb);
	  }

	  // subscription for unbinding
	  this.sub(name, method, cb);

	  return cb;
	};

	/**
	 * Unbind a single binding, all bindings for `event`,
	 * or all bindings within the manager.
	 *
	 * Examples:
	 *
	 *  Unbind direct handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * Unbind delegate handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * @param {String|Function} [event]
	 * @param {String|Function} [method]
	 * @api public
	 */

	Events.prototype.unbind = function(event, method){
	  if (0 == arguments.length) return this.unbindAll();
	  if (1 == arguments.length) return this.unbindAllOf(event);

	  // no bindings for this event
	  var bindings = this._events[event];
	  if (!bindings) return;

	  // no bindings for this method
	  var cb = bindings[method];
	  if (!cb) return;

	  events.unbind(this.el, event, cb);
	};

	/**
	 * Unbind all events.
	 *
	 * @api private
	 */

	Events.prototype.unbindAll = function(){
	  for (var event in this._events) {
	    this.unbindAllOf(event);
	  }
	};

	/**
	 * Unbind all events for `event`.
	 *
	 * @param {String} event
	 * @api private
	 */

	Events.prototype.unbindAllOf = function(event){
	  var bindings = this._events[event];
	  if (!bindings) return;

	  for (var method in bindings) {
	    this.unbind(event, method);
	  }
	};

	/**
	 * Parse `event`.
	 *
	 * @param {String} event
	 * @return {Object}
	 * @api private
	 */

	function parse(event) {
	  var parts = event.split(/ +/);
	  return {
	    name: parts.shift(),
	    selector: parts.join(' ')
	  }
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
	    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
	    prefix = bind !== 'addEventListener' ? 'on' : '';

	/**
	 * Bind `el` event `type` to `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.bind = function(el, type, fn, capture){
	  el[bind](prefix + type, fn, capture || false);
	  return fn;
	};

	/**
	 * Unbind `el` event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.unbind = function(el, type, fn, capture){
	  el[unbind](prefix + type, fn, capture || false);
	  return fn;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	try {
	  var closest = __webpack_require__(18);
	} catch(err) {
	  var closest = __webpack_require__(18);
	}

	try {
	  var event = __webpack_require__(16);
	} catch(err) {
	  var event = __webpack_require__(16);
	}

	/**
	 * Delegate event `type` to `selector`
	 * and invoke `fn(e)`. A callback function
	 * is returned which may be passed to `.unbind()`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.bind = function(el, selector, type, fn, capture){
	  return event.bind(el, type, function(e){
	    var target = e.target || e.srcElement;
	    e.delegateTarget = closest(target, selector, true, el);
	    if (e.delegateTarget) fn.call(el, e);
	  }, capture);
	};

	/**
	 * Unbind event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @api public
	 */

	exports.unbind = function(el, type, fn, capture){
	  event.unbind(el, type, fn, capture);
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */

	try {
	  var matches = __webpack_require__(19)
	} catch (err) {
	  var matches = __webpack_require__(19)
	}

	/**
	 * Export `closest`
	 */

	module.exports = closest

	/**
	 * Closest
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {Element} scope (optional)
	 */

	function closest (el, selector, scope) {
	  scope = scope || document.documentElement;

	  // walk up the dom
	  while (el && el !== scope) {
	    if (matches(el, selector)) return el;
	    el = el.parentNode;
	  }

	  // check scope for match
	  return matches(el, selector) ? el : null;
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	try {
	  var query = __webpack_require__(20);
	} catch (err) {
	  var query = __webpack_require__(20);
	}

	/**
	 * Element prototype.
	 */

	var proto = Element.prototype;

	/**
	 * Vendor function.
	 */

	var vendor = proto.matches
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

	/**
	 * Expose `match()`.
	 */

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (!el || el.nodeType !== 1) return false;
	  if (vendor) return vendor.call(el, selector);
	  var nodes = query.all(selector, el.parentNode);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	function one(selector, el) {
	  return el.querySelector(selector);
	}

	exports = module.exports = function(selector, el){
	  el = el || document;
	  return one(selector, el);
	};

	exports.all = function(selector, el){
	  el = el || document;
	  return el.querySelectorAll(selector);
	};

	exports.engine = function(obj){
	  if (!obj.one) throw new Error('.one callback required');
	  if (!obj.all) throw new Error('.all callback required');
	  one = obj.one;
	  exports.all = obj.all;
	  return exports;
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(22);
	var clone = __webpack_require__(23);
	var type = __webpack_require__(24);
	var ease = __webpack_require__(25);

	/**
	 * Expose `Tween`.
	 */

	module.exports = Tween;

	/**
	 * Initialize a new `Tween` with `obj`.
	 *
	 * @param {Object|Array} obj
	 * @api public
	 */

	function Tween(obj) {
	  if (!(this instanceof Tween)) return new Tween(obj);
	  this._from = obj;
	  this.ease('linear');
	  this.duration(500);
	}

	/**
	 * Mixin emitter.
	 */

	Emitter(Tween.prototype);

	/**
	 * Reset the tween.
	 *
	 * @api public
	 */

	Tween.prototype.reset = function(){
	  this.isArray = 'array' === type(this._from);
	  this._curr = clone(this._from);
	  this._done = false;
	  this._start = Date.now();
	  return this;
	};

	/**
	 * Tween to `obj` and reset internal state.
	 *
	 *    tween.to({ x: 50, y: 100 })
	 *
	 * @param {Object|Array} obj
	 * @return {Tween} self
	 * @api public
	 */

	Tween.prototype.to = function(obj){
	  this.reset();
	  this._to = obj;
	  return this;
	};

	/**
	 * Set duration to `ms` [500].
	 *
	 * @param {Number} ms
	 * @return {Tween} self
	 * @api public
	 */

	Tween.prototype.duration = function(ms){
	  this._duration = ms;
	  return this;
	};

	/**
	 * Set easing function to `fn`.
	 *
	 *    tween.ease('in-out-sine')
	 *
	 * @param {String|Function} fn
	 * @return {Tween}
	 * @api public
	 */

	Tween.prototype.ease = function(fn){
	  fn = 'function' == typeof fn ? fn : ease[fn];
	  if (!fn) throw new TypeError('invalid easing function');
	  this._ease = fn;
	  return this;
	};

	/**
	 * Stop the tween and immediately emit "stop" and "end".
	 *
	 * @return {Tween}
	 * @api public
	 */

	Tween.prototype.stop = function(){
	  this.stopped = true;
	  this._done = true;
	  this.emit('stop');
	  this.emit('end');
	  return this;
	};

	/**
	 * Perform a step.
	 *
	 * @return {Tween} self
	 * @api private
	 */

	Tween.prototype.step = function(){
	  if (this._done) return;

	  // duration
	  var duration = this._duration;
	  var now = Date.now();
	  var delta = now - this._start;
	  var done = delta >= duration;

	  // complete
	  if (done) {
	    this._from = this._to;
	    this._update(this._to);
	    this._done = true;
	    this.emit('end');
	    return this;
	  }

	  // tween
	  var from = this._from;
	  var to = this._to;
	  var curr = this._curr;
	  var fn = this._ease;
	  var p = (now - this._start) / duration;
	  var n = fn(p);

	  // array
	  if (this.isArray) {
	    for (var i = 0; i < from.length; ++i) {
	      curr[i] = from[i] + (to[i] - from[i]) * n;
	    }

	    this._update(curr);
	    return this;
	  }

	  // objech
	  for (var k in from) {
	    curr[k] = from[k] + (to[k] - from[k]) * n;
	  }

	  this._update(curr);
	  return this;
	};

	/**
	 * Set update function to `fn` or
	 * when no argument is given this performs
	 * a "step".
	 *
	 * @param {Function} fn
	 * @return {Tween} self
	 * @api public
	 */

	Tween.prototype.update = function(fn){
	  if (0 == arguments.length) return this.step();
	  this._update = fn;
	  return this;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var type;
	try {
	  type = __webpack_require__(24);
	} catch (_) {
	  type = __webpack_require__(24);
	}

	/**
	 * Module exports.
	 */

	module.exports = clone;

	/**
	 * Clones objects.
	 *
	 * @param {Mixed} any object
	 * @api public
	 */

	function clone(obj){
	  switch (type(obj)) {
	    case 'object':
	      var copy = {};
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          copy[key] = clone(obj[key]);
	        }
	      }
	      return copy;

	    case 'array':
	      var copy = new Array(obj.length);
	      for (var i = 0, l = obj.length; i < l; i++) {
	        copy[i] = clone(obj[i]);
	      }
	      return copy;

	    case 'regexp':
	      // from millermedeiros/amd-utils - MIT
	      var flags = '';
	      flags += obj.multiline ? 'm' : '';
	      flags += obj.global ? 'g' : '';
	      flags += obj.ignoreCase ? 'i' : '';
	      return new RegExp(obj.source, flags);

	    case 'date':
	      return new Date(obj.getTime());

	    default: // string, number, boolean, …
	      return obj;
	  }
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * toString ref.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */

	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }

	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';

	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)

	  return typeof val;
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	
	// easing functions from "Tween.js"

	exports.linear = function(n){
	  return n;
	};

	exports.inQuad = function(n){
	  return n * n;
	};

	exports.outQuad = function(n){
	  return n * (2 - n);
	};

	exports.inOutQuad = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n;
	  return - 0.5 * (--n * (n - 2) - 1);
	};

	exports.inCube = function(n){
	  return n * n * n;
	};

	exports.outCube = function(n){
	  return --n * n * n + 1;
	};

	exports.inOutCube = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n;
	  return 0.5 * ((n -= 2 ) * n * n + 2);
	};

	exports.inQuart = function(n){
	  return n * n * n * n;
	};

	exports.outQuart = function(n){
	  return 1 - (--n * n * n * n);
	};

	exports.inOutQuart = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n;
	  return -0.5 * ((n -= 2) * n * n * n - 2);
	};

	exports.inQuint = function(n){
	  return n * n * n * n * n;
	}

	exports.outQuint = function(n){
	  return --n * n * n * n * n + 1;
	}

	exports.inOutQuint = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n * n;
	  return 0.5 * ((n -= 2) * n * n * n * n + 2);
	};

	exports.inSine = function(n){
	  return 1 - Math.cos(n * Math.PI / 2 );
	};

	exports.outSine = function(n){
	  return Math.sin(n * Math.PI / 2);
	};

	exports.inOutSine = function(n){
	  return .5 * (1 - Math.cos(Math.PI * n));
	};

	exports.inExpo = function(n){
	  return 0 == n ? 0 : Math.pow(1024, n - 1);
	};

	exports.outExpo = function(n){
	  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
	};

	exports.inOutExpo = function(n){
	  if (0 == n) return 0;
	  if (1 == n) return 1;
	  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
	  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
	};

	exports.inCirc = function(n){
	  return 1 - Math.sqrt(1 - n * n);
	};

	exports.outCirc = function(n){
	  return Math.sqrt(1 - (--n * n));
	};

	exports.inOutCirc = function(n){
	  n *= 2
	  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
	  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
	};

	exports.inBack = function(n){
	  var s = 1.70158;
	  return n * n * (( s + 1 ) * n - s);
	};

	exports.outBack = function(n){
	  var s = 1.70158;
	  return --n * n * ((s + 1) * n + s) + 1;
	};

	exports.inOutBack = function(n){
	  var s = 1.70158 * 1.525;
	  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
	  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
	};

	exports.inBounce = function(n){
	  return 1 - exports.outBounce(1 - n);
	};

	exports.outBounce = function(n){
	  if ( n < ( 1 / 2.75 ) ) {
	    return 7.5625 * n * n;
	  } else if ( n < ( 2 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
	  } else if ( n < ( 2.5 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
	  } else {
	    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
	  }
	};

	exports.inOutBounce = function(n){
	  if (n < .5) return exports.inBounce(n * 2) * .5;
	  return exports.outBounce(n * 2 - 1) * .5 + .5;
	};

	// aliases

	exports['in-quad'] = exports.inQuad;
	exports['out-quad'] = exports.outQuad;
	exports['in-out-quad'] = exports.inOutQuad;
	exports['in-cube'] = exports.inCube;
	exports['out-cube'] = exports.outCube;
	exports['in-out-cube'] = exports.inOutCube;
	exports['in-quart'] = exports.inQuart;
	exports['out-quart'] = exports.outQuart;
	exports['in-out-quart'] = exports.inOutQuart;
	exports['in-quint'] = exports.inQuint;
	exports['out-quint'] = exports.outQuint;
	exports['in-out-quint'] = exports.inOutQuint;
	exports['in-sine'] = exports.inSine;
	exports['out-sine'] = exports.outSine;
	exports['in-out-sine'] = exports.inOutSine;
	exports['in-expo'] = exports.inExpo;
	exports['out-expo'] = exports.outExpo;
	exports['in-out-expo'] = exports.inOutExpo;
	exports['in-circ'] = exports.inCirc;
	exports['out-circ'] = exports.outCirc;
	exports['in-out-circ'] = exports.inOutCirc;
	exports['in-back'] = exports.inBack;
	exports['out-back'] = exports.outBack;
	exports['in-out-back'] = exports.inOutBack;
	exports['in-bounce'] = exports.inBounce;
	exports['out-bounce'] = exports.outBounce;
	exports['in-out-bounce'] = exports.inOutBounce;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Expose `requestAnimationFrame()`.
	 */

	exports = module.exports = window.requestAnimationFrame
	  || window.webkitRequestAnimationFrame
	  || window.mozRequestAnimationFrame
	  || fallback;

	/**
	 * Fallback implementation.
	 */

	var prev = new Date().getTime();
	function fallback(fn) {
	  var curr = new Date().getTime();
	  var ms = Math.max(0, 16 - (curr - prev));
	  var req = setTimeout(fn, ms);
	  prev = curr;
	  return req;
	}

	/**
	 * Cancel.
	 */

	var cancel = window.cancelAnimationFrame
	  || window.webkitCancelAnimationFrame
	  || window.mozCancelAnimationFrame
	  || window.clearTimeout;

	exports.cancel = function(id){
	  cancel.call(window, id);
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = throttle;

	/**
	 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
	 *
	 * @param {Function} func Function to wrap.
	 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
	 * @return {Function} A new function that wraps the `func` function passed in.
	 */

	function throttle (func, wait) {
	  var ctx, args, rtn, timeoutID; // caching
	  var last = 0;

	  return function throttled () {
	    ctx = this;
	    args = arguments;
	    var delta = new Date() - last;
	    if (!timeoutID)
	      if (delta >= wait) call();
	      else timeoutID = setTimeout(call, wait - delta);
	    return rtn;
	  };

	  function call () {
	    timeoutID = 0;
	    last = +new Date();
	    rtn = func.apply(ctx, args);
	    ctx = null;
	    args = null;
	  }
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var now = __webpack_require__(29);

	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 * @source underscore.js
	 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
	 * @param {Function} function to wrap
	 * @param {Number} timeout in ms (`100`)
	 * @param {Boolean} whether to execute at the beginning (`false`)
	 * @api public
	 */

	module.exports = function debounce(func, wait, immediate){
	  var timeout, args, context, timestamp, result;
	  if (null == wait) wait = 100;

	  function later() {
	    var last = now() - timestamp;

	    if (last < wait && last > 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      if (!immediate) {
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      }
	    }
	  };

	  return function debounced() {
	    context = this;
	    args = arguments;
	    timestamp = now();
	    var callNow = immediate && !timeout;
	    if (!timeout) timeout = setTimeout(later, wait);
	    if (callNow) {
	      result = func.apply(context, args);
	      context = args = null;
	    }

	    return result;
	  };
	};


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = Date.now || now

	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var detect = __webpack_require__(8)
	var has3d = detect.has3d
	var transform = detect.transform

	/**
	 * Handlebar contructor
	 *
	 * @param {Element} scrollable
	 * @contructor
	 * @api public
	 */
	function handlebar(scrollable) {
	  var el = this.el = document.createElement('div')
	  el.className = 'iscroll-handlebar'
	  scrollable.appendChild(el)
	}

	/**
	 * Show the handlebar and resize it
	 *
	 * @param {Number} h
	 * @api public
	 */
	handlebar.prototype.resize = function (h) {
	  var s = this.el.style
	  s.height = h + 'px'
	  s.backgroundColor = 'rgba(0,0,0,0.4)'
	}

	/**
	 * Hide this handlebar
	 *
	 * @api public
	 */
	handlebar.prototype.hide = function () {
	  this.el.style.backgroundColor = 'transparent'
	}

	/**
	 * Move handlebar by translateY
	 *
	 * @param {Number} y
	 * @api public
	 */
	handlebar.prototype.translateY= function(y){
	  var s = this.el.style
	  if (has3d) {
	    s[transform] = 'translate3d(0, ' + y + 'px' + ', 0)'
	  } else {
	    s[transform] = 'translateY(' + y + 'px)'
	  }
	}

	module.exports = handlebar


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var toPX = __webpack_require__(32)

	module.exports = mouseWheelListen

	function mouseWheelListen(element, callback, noScroll) {
	  if(typeof element === 'function') {
	    noScroll = !!callback
	    callback = element
	    element = window
	  }
	  var lineHeight = toPX('ex', element)
	  var listener = function(ev) {
	    if(noScroll) {
	      ev.preventDefault()
	    }
	    var dx = ev.deltaX || 0
	    var dy = ev.deltaY || 0
	    var dz = ev.deltaZ || 0
	    var mode = ev.deltaMode
	    var scale = 1
	    switch(mode) {
	      case 1:
	        scale = lineHeight
	      break
	      case 2:
	        scale = window.innerHeight
	      break
	    }
	    dx *= scale
	    dy *= scale
	    dz *= scale
	    if(dx || dy || dz) {
	      return callback(dx, dy, dz)
	    }
	  }
	  element.addEventListener('wheel', listener)
	  return listener
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var parseUnit = __webpack_require__(33)

	module.exports = toPX

	var PIXELS_PER_INCH = 96

	function getPropertyInPX(element, prop) {
	  var parts = parseUnit(getComputedStyle(element).getPropertyValue(prop))
	  return parts[0] * toPX(parts[1], element)
	}

	//This brutal hack is needed
	function getSizeBrutal(unit, element) {
	  var testDIV = document.createElement('div')
	  testDIV.style['font-size'] = '128' + unit
	  element.appendChild(testDIV)
	  var size = getPropertyInPX(testDIV, 'font-size') / 128
	  element.removeChild(testDIV)
	  return size
	}

	function toPX(str, element) {
	  element = element || document.body
	  str = (str || 'px').trim().toLowerCase()
	  if(element === window || element === document) {
	    element = document.body 
	  }
	  switch(str) {
	    case '%':  //Ambiguous, not sure if we should use width or height
	      return element.clientHeight / 100.0
	    case 'ch':
	    case 'ex':
	      return getSizeBrutal(str, element)
	    case 'em':
	      return getPropertyInPX(element, 'font-size')
	    case 'rem':
	      return getPropertyInPX(document.body, 'font-size')
	    case 'vw':
	      return window.innerWidth/100
	    case 'vh':
	      return window.innerHeight/100
	    case 'vmin':
	      return Math.min(window.innerWidth, window.innerHeight) / 100
	    case 'vmax':
	      return Math.max(window.innerWidth, window.innerHeight) / 100
	    case 'in':
	      return PIXELS_PER_INCH
	    case 'cm':
	      return PIXELS_PER_INCH / 2.54
	    case 'mm':
	      return PIXELS_PER_INCH / 25.4
	    case 'pt':
	      return PIXELS_PER_INCH / 72
	    case 'pc':
	      return PIXELS_PER_INCH / 6
	  }
	  return 1
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function parseUnit(str, out) {
	    if (!out)
	        out = [ 0, '' ]

	    str = String(str)
	    var num = parseFloat(str, 10)
	    out[0] = num
	    out[1] = str.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
	    return out
	}

/***/ },
/* 34 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = 'ontouchstart' in global || (global.DocumentTouch && document instanceof DocumentTouch)
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var offset = __webpack_require__(36)
	var ispinner = __webpack_require__(37)
	var domify = __webpack_require__(38)
	var debounce = __webpack_require__(28)
	var template = __webpack_require__(42)
	var events = __webpack_require__(16)
	var Emitter = __webpack_require__(43)

	/**
	 * Init more with element(for insertAfter), callback ,and scrollable
	 *
	 * @param {Function} fn
	 * @param {Element}  el
	 * @param {Element}  scrollable
	 * @api public
	 */
	function More(el, fn, scrollable) {
	  if (!(this instanceof More)) return new More(el, fn, scrollable)
	  this.el = el
	  this.callback = fn
	  this.div = domify(template)
	  insertAfter(this.el, this.div)
	  this.spin = ispinner(this.div.querySelector('.more-refresh'), {width: '20px'})
	  scrollable = scrollable || el.parentNode
	  this.scrollable = scrollable
	  this._onscroll = debounce(this.onscroll.bind(this), 10)
	  events.bind(scrollable, 'scroll', this._onscroll)
	}

	Emitter(More.prototype)

	/**
	 * On scroll event handler
	 *
	 * @api private
	 */
	More.prototype.onscroll = function (e) {
	  if (this.loading || this._disabled) return
	  if (!check(this.scrollable) && e !== true) return
	  this.div.style.visibility = 'visible'
	  // var h = computedStyle(this.el, 'height')
	  this.loading = true
	  var self = this
	  var cb = function () {
	    self.loading = false
	    self.div.style.visibility = 'hidden'
	    setTimeout(function () {
	      self.emit('load')
	    }, 20)
	  }
	  var res = this.callback(cb)
	  if (res && typeof res.then === 'function') {
	    res.then(cb, cb)
	  }
	}

	/**
	 * Disable loading more data
	 *
	 * @return {undefined}
	 * @api public
	 */
	More.prototype.disable = function () {
	  this._disabled = true
	  this.div.style.display = 'none'
	  this.loading = false
	}

	/**
	 * Force more to start loading
	 *
	 * @return {undefined}
	 * @api public
	 */
	More.prototype.load = function () {
	  this.onscroll(true)
	}

	/**
	 * Remove the appended element and unbind event
	 *
	 * @return {undefined}
	 * @api public
	 */
	More.prototype.remove = function () {
	  events.unbind(this.scrollable, 'scroll', this._onscroll)
	  this.div.parentNode.removeChild(this.div)
	}

	/**
	 * check if scrollable scroll to end
	 */
	function check(scrollable) {
	  if (scrollable === window) {
	    // viewport height
	    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	    if (getDocHeight() - vh == offset.y) return true
	  } else if (scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight < 20) {
	    return true
	  }
	  return false
	}

	function insertAfter(referenceNode, newNode) {
	  var next = referenceNode.nextSibling
	  if (next) {
	    referenceNode.parentNode.insertBefore(newNode, next)
	  } else {
	    referenceNode.parentNode.appendChild(newNode)
	  }
	}

	function getDocHeight() {
	    var D = document;
	    return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight);
	}

	module.exports = More


/***/ },
/* 36 */
/***/ function(module, exports) {

	var supportPageOffset = window.pageXOffset !== undefined
	var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')
	var body = document.body

	Object.defineProperty(exports, 'x', {
	  get: function () {
	    return supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : body.scrollLeft
	  }
	})

	Object.defineProperty(exports, 'y', {
	  get: function () {
	    return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : body.scrollTop
	  }
	})


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var domify = __webpack_require__(38)
	var template = __webpack_require__(39)
	var classes = __webpack_require__(40)

	module.exports = function (parent, opt) {
	  var el = domify(template)
	  opt = opt || {}
	  if (!opt.white) {
	    classes(el).add('ispinner-gray')
	  } else {
	    classes(el).add('ispinner-white')
	  }
	  if (opt.width) {
	    el.style.width = opt.width
	  } else {
	    el.style.width =  parent.getBoundingClientRect().width + 'px'
	  }
	  el.style.height = el.style.width
	  parent.appendChild(el)
	  return el
	}



/***/ },
/* 38 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */

	module.exports = parse;

	/**
	 * Tests for browser support.
	 */

	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}

	/**
	 * Wrap map from jquery.
	 */

	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};

	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];

	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */

	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');

	  // default to the global `document` object
	  if (!doc) doc = document;

	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);

	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

	  var tag = m[1];

	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }

	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;

	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }

	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }

	  return fragment;
	}


/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ispinner ispinner-animating\">\n  <div class=\"ispinner-blade\"></div>\n  <div class=\"ispinner-blade\"></div>\n  <div class=\"ispinner-blade\"></div>\n  <div class=\"ispinner-blade\"></div>\n  <div class=\"ispinner-blade\"></div>\n  <div class=\"ispinner-blade\"></div>\n  <div class=\"ispinner-blade\"></div>\n  <div class=\"ispinner-blade\"></div>\n  <div class=\"ispinner-blade\"></div>\n  <div class=\"ispinner-blade\"></div>\n  <div class=\"ispinner-blade\"></div>\n  <div class=\"ispinner-blade\"></div>\n</div>\n";

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var index = __webpack_require__(41);

	/**
	 * Whitespace regexp.
	 */

	var re = /\s+/;

	/**
	 * toString reference.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */

	module.exports = function(el){
	  return new ClassList(el);
	};

	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */

	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}

	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }

	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */

	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};

	/**
	 * Toggle class `name`, can force state via `force`.
	 *
	 * For browsers that support classList, but do not support `force` yet,
	 * the mistake will be detected and corrected.
	 *
	 * @param {String} name
	 * @param {Boolean} force
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.toggle = function(name, force){
	  // classList
	  if (this.list) {
	    if ("undefined" !== typeof force) {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name); // toggle again to correct
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }

	  // fallback
	  if ("undefined" !== typeof force) {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }

	  return this;
	};

	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */

	ClassList.prototype.array = function(){
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};

	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "<div class=\"more-loading\">\n  <i class=\"more-refresh\"></i>\n</div>\n";

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ }
/******/ ]);