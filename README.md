Highlight any node on the page, primarily elements and text.

```
npm install select
```

```
require('select');
var item = document.querySelector('.item');

select(item);
//select next by tab index
select.next();

//OR
select.animate = false;
select.type = 'transform';
select.target = item;
```