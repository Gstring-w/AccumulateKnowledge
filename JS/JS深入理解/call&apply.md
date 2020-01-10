#### `call` && `apply`

> call 和 apply

1. 改变函数的 this 指向
2. 执行函数
3. 需支持传入参数
4. 函数的功能函数
5. 支持兼容
6. es3当传入的context为undefined时，this为window；es5则是undefined

基于以上的几点：

```js
Function.prototype.call =
  Function.prototype.call ||
  function(context) {
    if (typeof context === "object" && context !== null) {
      var _this = context;
      var args = [];
      for(var i = 1; i < arguments.length; i++){
          args.push(arguments[i]);
      }
      _this.fn = this;
      var result = eval(`_this.fn(${args})`);
      delete _this.fn;
      return result;
    } else {
      throw new Error("call first params must a object!");
    }
  };
```
