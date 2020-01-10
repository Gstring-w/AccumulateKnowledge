#### `new`

1. 使用Object.create创建原型
2. 返回值的处理

```js
function objectFactory() {
  var Construstor = Array.prototype.shift.call(arguments);
  var obj = Object.create(Construstor.prototype);
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === "object" || typeof ret === "function"
    ? ret || obj
    : obj;
}
```
