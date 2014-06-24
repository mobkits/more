# More

Append more div the list element, check loading on scroll.

[demo](http://chemzqm.github.io/more/)

## Installation

Install with [component(1)](http://component.io):

    $ component install chemzqm/more

## API

```js
var more = require('more');
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
```

### new More(el, callback, [scrollable])

Insert `more` after list `el`, call the callback with a function when more div could be visible.

scrollable is the element emit `scroll` event, it's el parentNode by default.

Pass true to disable more loading to the function passed to callback.

### .text(string)

Set loading text.

### .disable()

Disable more loading.

## License

MIT
