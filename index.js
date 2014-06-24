var styles = require('computed-style');
var events = require('event');
var domify = require('domify');
var throttle = require('per-frame');
var template = require('./template.html');

function More(el, fn, scrollable) {
  if (!(this instanceof More)) return new More(el, fn, scrollable);
  this.el = el;
  this.callback = fn;
  this.div = domify(template);
  insertAfter(this.el, this.div);
  scrollable = scrollable || el.parentNode;
  this.onscroll();
  var self = this;
  events.bind(scrollable, 'scroll',  throttle(function () {
    self.onscroll();
  }));
}

More.prototype.onscroll = function () {
  if (this.loading || this._disabled) return;
  if (!check(this.el)) return;
  this.div.style.display = 'block';
  var h = styles(this.el).height;
  this.loading = true;
  var self = this;
  this.callback(function (disable) {
    if (disable) self.disable();
    self.loading = false;
    self.div.style.display = 'none';
  });
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
