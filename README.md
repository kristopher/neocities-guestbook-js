#### Paste this into console and try it out.

```javascript
;(function() {
  var t = document.createElement('script');
  t.type = 'text/javascript';
  t.src = 'https://raw.github.com/kristopher/neocities-guestbook-js/master/neocities-guestbook.js';
  t.addEventListener('load', function() {
    console.log('Guestbook is loaded');
  })
  document.body.appendChild(t);
}).call(window);
```