require('../more.css')
var more = require('..');
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
})


var i = 0
function append(count) {
  for (var j = count - 1; j >= 0; j--) {
    i++
    var li = document.createElement('li')
    li.textContent = i
    el.appendChild(li)
  }
}
