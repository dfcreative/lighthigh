Highlight any node on the page, primarily elements and text.

```
npm install lightligh
```

```
var LightHigh = require('lightligh');
var item = document.querySelector('.item');

var lighthigh = new LightHigh;

//highlight item
lighthigh.on(item);

//fade out
lighthigh.off();
```