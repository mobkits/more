var offset = require('page-offset')
var ispinner = require('ispinner')
var domify = require('domify')
var debounce = require('debounce')
var template = require('./template.html')
var events = require('event')
var Emitter = require('emitter')

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
