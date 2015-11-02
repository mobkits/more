require('../more.css')
var more = require('..');
var el = document.querySelector('ul');
var times = 0;
more(el, function(done) {
  times++;
  if (times == 3) return done(true);
  setTimeout(function() {
    for (var i = 0; i < 5; i++) {
      var li = document.createElement('li');
      li.innerHTML = i + 1;
      el.appendChild(li);
    }
    done();
  }, 1000);
})
