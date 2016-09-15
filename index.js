var ispinner = require('ispinner')
var domify = require('domify')
var debounce = require('debounce')
var template = require('./template.html')
var events = require('event')
var Emitter = require('emitter')
var computedStyle = require('computed-style')

/**
 * Init more with element(for insertAfter), callback ,and scrollable
 *
 * @param {Function} fn callback function that should return promise
 * @param {Element}  el
 * @param {Element}  scrollable [optional] default to el.parentNode
 * @api public
 */
function More(el, fn, scrollable) {
  if (!(this instanceof More)) return new More(el, fn, scrollable)
  this.el = el
  this.paddingBottom = parseInt(computedStyle(el, 'padding-bottom'), 10)
  this.callback = fn
  this.div = domify(template)
  insertAfter(this.el, this.div)
  this.spin = ispinner(this.div.querySelector('.more-refresh'), {width: '20px'})
  scrollable = scrollable || el.parentNode
  this.scrollable = scrollable
  this._onscroll = debounce(this.onscroll.bind(this), 16)
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
  if (!check(this.el, this.scrollable, this.paddingBottom) && e !== true) return
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
 * @api public
 */
More.prototype.disable = function () {
  this._disabled = true
  this.div.style.display = 'none'
  this.loading = false
}

/**
 * Enable for loading more data
 *
 * @public
 */
More.prototype.enable = function () {
  this._disabled = false
  this.div.style.display = 'block'
  this.div.style.visibility = 'hidden'
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
function check(el, scrollable, pb) {
  var rect = el.getBoundingClientRect()
  var dis = rect.top + el.clientHeight - pb
  if (scrollable === window) {
    // viewport height
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    if (dis <= vh) return true
  } else {
    var sh = scrollable.getBoundingClientRect().top + scrollable.clientHeight
    if (dis <= sh) return true
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

module.exports = More
