var domify = require('domify')
var debounce = require('debounce')
var template = require('./template.html')
var events = require('event')

/**
 * Init more with element(for insertAfter), callback ,and scrollable
 *
 * @param  {Element}  el
 * @param  {Function}  fn
 * @param {Element} scrollable
 * @api public
 */
function More(el, fn, scrollable) {
  if (!(this instanceof More)) return new More(el, fn, scrollable)
  this.el = el
  this.callback = fn
  this.div = domify(template)
  insertAfter(this.el, this.div)
  this.scrollable = scrollable = scrollable || el.parentNode
  this._onscroll = debounce(this.onscroll.bind(this), 100)
  events.bind(scrollable, 'scroll', this._onscroll)
}

/**
 * On scroll event handler
 *
 * @api private
 */
More.prototype.onscroll = function (e) {
  if (this.loading || this._disabled) return
  if (!check(this.scrollable) && e !== true) return
  this.div.style.display = 'block'
  // var h = computedStyle(this.el, 'height')
  this.loading = true
  var self = this
  var cb = function () {
    self.loading = false
    self.div.style.display = 'none'
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
 * Set the loading text
 *
 * @param {String} text
 * @api public
 */
More.prototype.text = function (text) {
  this.div.querySelector('.more-text').innerHTML = text
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
    var supportPageOffset = window.pageXOffset !== undefined
    var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var scrollY = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
    if (getDocHeight() - vh == scrollY) return true
  } else if (scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight < 1) {
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
