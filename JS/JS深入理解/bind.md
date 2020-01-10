#### `bind`

1. 返回一个函数
2. 返回函数被当作 new 执行
3. 返回函数普通执行

```js
Function.prototype.bind =
  Function.prototype.bind ||
  function(context) {
    if (typeof this !== "function") {
      throw new Error(
        "Function.prototype.bind - what is trying to be bound is not callable"
      );
    }

    var _args = Array.prototype.slice.call(arguments, 1);
    var fNOP = {};
    var result = function() {
      var args = _args.concat(Array.prototype.slice.call(arguments, 1));
      return this.apply(this instanceof fNOP ? this : context, args);
    };

    fNOP.prototype = this.prototype;
    result.prototype = new FNOP();
    return result;
  };
```
