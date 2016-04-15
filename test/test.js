/*global describe, it, beforeEach, afterEach*/
var assert = require('assert')
var More = require('..')

var ul
var scrollable

function assign(to, from) {
  Object.keys(from).forEach(function (k) {
    to[k] = from[k]
  })
  return to
}

beforeEach(function () {
  scrollable = document.createElement('div')
  assign(scrollable.style, {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100px',
    height: '300px',
    padding: '0px',
    margin: '0px',
    overflow: 'hidden'
  })
  ul = document.createElement('ul')
  for (var i = 7; i >= 0; i--) {
    var li = document.createElement('li')
    li.style.height = '50px'
    li.textContent = i
    ul.appendChild(li)
  }
  scrollable.appendChild(ul)
  document.body.appendChild(scrollable)
})

afterEach(function () {
  document.body.removeChild(scrollable)
})

describe('More()', function() {
  it('should init with new', function () {
    var m = new More(ul, function () {})
    assert.equal(m.el, ul)
    m.remove()
  })

  it('should init without new', function () {
    var m = More(ul, function () {}, scrollable)
    assert.equal(m.el, ul)
    m.remove()
  })

  it('should insert div after list', function () {
    scrollable.appendChild(document.createElement('div'))
    var m = More(ul, function () {}, scrollable)
    assert.equal(m.el, ul)
    var next = ul.nextElementSibling
    assert.equal(next, m.div)
    m.remove()
  })
})

describe('onscroll', function () {
  it('should load when scroll to bottom', function (done) {
    var fired
    var m = More(ul, function () {
      fired = true
    }, scrollable)
    scrollable.scrollTop = scrollable.scrollHeight
    setTimeout(function () {
      assert.equal(fired, true)
      assert.equal(m.div.style.visibility, 'visible')
      m.remove()
      done()
    }, 200)
  })

  it('should not load when not scroll to bottom', function (done) {
    var fired
    var m = More(ul, function (cb) {
      fired = true
      cb()
    }, scrollable)
    scrollable.scrollTop = 5
    setTimeout(function () {
      assert.notEqual(fired, true)
      //assert.equal(m.div.style.display, 'none')
      m.remove()
      done()
    }, 200)
  })

  it('should hide the div after load', function (done) {
    var m = More(ul, function (cb) {
      cb()
    }, scrollable)
    scrollable.scrollTop = scrollable.scrollHeight
    setTimeout(function () {
      assert.equal(m.div.style.visibility, 'hidden')
      done()
    }, 200)
  })

  it('should be promise awared', function (done) {
    var m = More(ul, function () {
      return new Promise(function (resolve) {
        resolve()
      })
    }, scrollable)
    scrollable.scrollTop = scrollable.scrollHeight
    setTimeout(function () {
      assert.equal(m.div.style.visibility, 'hidden')
      done()
    }, 200)
  })

  it('should hide div on rejected', function (done) {
    var m = More(ul, function () {
      return new Promise(function (resolve, reject) { // eslint-disable-line
        reject(new Error('request error'))
      })
    }, scrollable)
    scrollable.scrollTop = scrollable.scrollHeight
    setTimeout(function () {
      assert.equal(m.div.style.visibility, 'hidden')
      done()
    }, 200)
  })
})

describe('scroll window', function () {
  var list
  beforeEach(function () {
    list = document.createElement('ul')
    document.body.appendChild(list)
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    list.style.height = (vh + 50) + 'px'
    window.scrollTo(0, 0)
  })

  afterEach(function () {
    window.scrollTo(0, 0)
    document.body.removeChild(list)
  })

  it('should not load when not scroll to bottom', function (done) {
    var fired
    var m = More(list, function () {
      fired = true
    }, window)
    window.scrollTo(0, 10)
    setTimeout(function () {
      assert.notEqual(fired, true)
      m.remove()
      done()
    }, 200)
  })

  it('should load when scroll to bottom', function (done) {
    var fired
    var m = More(list, function () {
      fired = true
    }, window)
    var sh = document.documentElement.scrollHeight
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    window.scrollTo(0, sh - vh)
    setTimeout(function () {
      assert.equal(fired, true)
      m.remove()
      done()
    }, 200)
  })
})

describe('.disable()', function() {
  it('should disable loading', function (done) {
    var fired
    var m = More(ul, function (cb) {
      fired = true
      cb()
    }, scrollable)
    m.disable()
    scrollable.scrollTop = scrollable.scrollHeight
    setTimeout(function () {
      assert.equal(m.div.style.display, 'none')
      assert.notEqual(fired, true)
      done()
    }, 200)
  })
})

describe('.remove()', function() {
  it('should unbind event listeners', function (done) {
    var fired
    var m = More(ul, function(cb){
      fired = true
      cb()
    }, scrollable)
    m.remove()
    scrollable.scrollTop = scrollable.scrollHeight
    setTimeout(function () {
      assert.notEqual(fired, true)
      done()
    }, 200)
  })
})

describe('.load()', function() {
  it('should force loading data', function (done) {
    var fired
    var m = More(ul, function (cb) {
      fired = true
      cb()
    })
    m.load()
    assert.equal(fired, true)
    done()
  })
})
