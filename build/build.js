/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("chemzqm~computed-style@0.1.1", function (exports, module) {

/**
 * Get the computed style of a DOM element
 * 
 *   style(document.body) // => {width:'500px', ...}
 * 
 * @param {Element} element
 * @return {Object}
 */

// Accessing via window for jsDOM support
module.exports = window.getComputedStyle

// Fallback to elem.currentStyle for IE < 9
if (!module.exports) {
	module.exports = function (elem) {
		return elem.currentStyle
	}
}

});

require.register("component~domify@1.2.2", function (exports, module) {

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  _default: [0, '', '']
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

map.text =
map.circle =
map.ellipse =
map.line =
map.path =
map.polygon =
map.polyline =
map.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return the children.
 *
 * @param {String} html
 * @return {Array}
 * @api private
 */

function parse(html) {
  if ('string' != typeof html) throw new TypeError('String expected');
  
  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return document.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = document.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = document.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = document.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

});

require.register("component~raf@1.1.3", function (exports, module) {
/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
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
  || window.oCancelAnimationFrame
  || window.msCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};

});

require.register("component~per-frame@2.0.1", function (exports, module) {
/**
 * Module Dependencies.
 */

var raf = require("component~raf@1.1.3");

/**
 * Export `throttle`.
 */

module.exports = throttle;

/**
 * Executes a function at most once per animation frame. Kind of like
 * throttle, but it throttles at ~60Hz.
 *
 * @param {Function} fn - the Function to throttle once per animation frame
 * @return {Function}
 * @public
 */

function throttle(fn) {
  var queued = false;

  return function queue() {
    if (queued) return;
    queued = true;
    var ctx = this;
    var args = arguments;

    raf(function() {
      queued = false;
      return fn.apply(ctx, args);
    });
  };
}

});

require.register("component~event@0.1.3", function (exports, module) {
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
});

require.register("more", function (exports, module) {
var styles = require("chemzqm~computed-style@0.1.1");
var events = require("component~event@0.1.3");
var domify = require("component~domify@1.2.2");
var throttle = require("component~per-frame@2.0.1");
var template = require("more/template.html");

function More(el, fn) {
  if (!(this instanceof More)) return new More(el, fn);
  this.el = el;
  this.callback = fn;
  while (el) {
    if (styles(el).overflowY === 'scroll') break;
    el = el.parentNode;
    if (el === document.documentElement) el = null;
  }
  this.div = domify(template);
  insertAfter(this.el, this.div);
  var scrollable = el ? el : window;
  this.onscroll();
  var onscroll = throttle(this.onscroll.bind(this));
  events.bind(scrollable, 'scroll', onscroll);
}

More.prototype.onscroll = function () {
  if (this.loading || this._disabled) return;
  if (!check(this.el)) return;
  var self = this;
  this.div.style.display = 'block';
  this.callback.call(this, cb);
  var h = styles(this.el).height;
  this.loading = true;
  function cb(disable) {
    if (disable) self.disable();
    self.loading = false;
    self.div.style.display = 'none';
  }
}

More.prototype.disable = function () {
  this._disabled = true;
}

More.prototype.text = function (text) {
  this.div.querySelector('span').innerHTML = text;
}

/**
 * check el is visible on viewport
 */
function check(el) {
  var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var bottom = el.getBoundingClientRect().bottom;
  return bottom < vh;
}

function insertAfter(referenceNode, newNode) {
  var next = referenceNode.nextSibling;
  if (next) {
    referenceNode.parentNode.insertBefore(newNode, next);
  } else {
    referenceNode.parentNode.appendChild(newNode);
  }
}

module.exports = More;

});

require.define("more/template.html", "<div class=\"more-loading\">\n  <i class=\"more-refresh more-spin\"></i> <span>刷新中...</span>\n</div>\n");

