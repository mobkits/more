# More

Append more div the list element, check loading on scroll.

[demo](http://chemzqm.github.io/more/)

## Installation

Install with npm:

    $ npm install more-mobile

Install with [component(1)](http://component.io):

    $ component install chemzqm/more

## API

```js
var more = require('more');
var el = document.querySelector('ul');
var times = 0;
more(el, function() {
  return new Promise(function(resolve, reject) {
    var arr
    // fetch the list
    if (err)return reject()
    if (arr.length) {
      more.disable() //disable loading
    }
    resolve()
  })
});
})
```

### new More(el, callback, [scrollable])

Insert `more` after list `el`, call the callback with a function when more div could be visible.

scrollable is Object (could be element or other object) which emit `scroll` event, it default to `el.parentNode`

### .text(string)

Set loading text.

### .disable()

Disable more loading.

## License

MIT
