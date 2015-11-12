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
  this.onscroll()
  this._onscroll = debounce(this.onscroll.bind(this))
  events.bind(scrollable, 'scroll', this._onscroll)
}

/**
 * On scroll event handler
 *
 * @api private
 */
More.prototype.onscroll = function () {
  if (this.loading || this._disabled) return
  if (!check(this.el)) return
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
}

/**
 * Set the loading text
 *
 * @param {String} text
 * @api public
 */
More.prototype.text = function (text) {
  this.div.querySelector('more-text').innerHTML = text
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
 * check el is visible on viewport
 */
function check(el) {
  var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  var bottom = el.getBoundingClientRect().bottom
  return bottom < vh
}

function insertAfter(referenceNode, newNode) {
  var next = referenceNode.nextSibling
  if (next) {
    referenceNode.parentNode.insertBefore(newNode, next)
  } else {
    referenceNode.parentNode.appendChild(newNode)
  }
}

module.exports = More
