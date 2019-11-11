/**
1.判断当前this是否为函数，防止Function.prototype.myCall() 直接调用
2.context 为可选参数，如果不传的话默认上下文为 window
3.为context 创建一个 Symbol（保证不会重名）属性，将当前函数赋值给这个属性
4.处理参数，传入第一个参数后的其余参数
4.调用函数后即删除该Symbol属性
*/
Function.prototype.myCall = function(context = window, ...args) {
  if (this === Function.prototype) return undefined;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

Function.prototype.myApply = function(context = window, args) {
  if (this === Function.prototype) return undefined; // 用于防止 Function.prototype.myCall() 直接调用
  const fn = Symbol();
  context[fn] = this;
  const result = Array.isArray(args) ? context[fn](...args) : context[fn]();
  delete context[fn];
  return result;
};

/**
1.处理参数，返回一个闭包
2.判断是否为构造函数调用，如果是则使用new调用当前函数
3.如果不是，使用apply，将context和处理好的参数传入
*/
Function.prototype.myBind = function(context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function() {};

  var fBound = function() {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
