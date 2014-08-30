Highlight any node on the page, primarily elements and text.

```
$ npm install lighthigh
```

```js
var LightHigh = require('lighthigh');
var item = document.querySelector('.item');

var lighthigh = new LightHigh;

//highlight item
lighthigh.on(item);

//fade out
lighthigh.off();
```
