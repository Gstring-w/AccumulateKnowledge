/**
 * 柯里化 是一种将使用多个参数转换成一系列使用一个参数的函数技术
 */

function curry(fn, args, holes) {
  length = fn.length;

  args = args || [];

  holes = holes || [];

  return function() {
    var _args = args.slice(0),
      _holes = holes.slice(0),
      argsLen = args.length,
      holesLen = holes.length,
      arg,
      i,
      index = 0;

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
      if (arg === _ && holesLen) {
        index++;
        if (index > holesLen) {
          _args.push(arg);
          _holes.push(argsLen - 1 + index - holesLen);
        }
      }
      // 处理类似 fn(1)(_) 这种情况
      else if (arg === _) {
        _args.push(arg);
        _holes.push(argsLen + i);
      }
      // 处理类似 fn(_, 2)(1) 这种情况
      else if (holesLen) {
        // fn(_, 2)(_, 3)
        if (index >= holesLen) {
          _args.push(arg);
        }
        // fn(_, 2)(1) 用参数 1 替换占位符
        else {
          _args.splice(_holes[index], 1, arg);
          _holes.splice(index, 1);
        }
      } else {
        _args.push(arg);
      }
      console.log(_args, _holes);
    }
    if (_holes.length || _args.length < length) {
      return curry.call(this, fn, _args, _holes);
    } else {
      return fn.apply(this, _args);
    }
  };
}

var _ = {};

var fn = curry(function(a, b, c, d, e) {
  console.log([a, b, c, d, e]);
});

// 验证 输出全部都是 [1, 2, 3, 4, 5]
fn(1, 2, 3, 4, 5);
fn(_, 2, 3, 4, 5)(1);
fn(1, _, 3, 4, 5)(2);
fn(1, _, 3)(_, 4)(2)(5);
fn(1, _, _, 4)(_, 3)(2)(5);
fn(_, 2)(_, _, 4)(1)(3)(5);

/**
 * 偏函數：在计算机科学中，局部应用是指固定一个函数的一些参数，然后生产另一个更小元的函数
 */

var partial = function(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
    var position = 0,
      len = args.length;
    for (var i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i];
    }
    while (position < arguments.length) args.push(arguments[position++]);
    return fn.apply(this, args);
  };
};

var restArguments = function(fn, startIndex) {
  startIndex = startIndex === null ? fn.length - 1 : +startIndex;
  return function() {
    var length = Math.max(arguments.length - startIndex, 0),
      rest = Array(length),
      index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }

    switch (startIndex) {
      case 0:
        return fn.call(this, rest);
      case 1:
        return fn.call(this, arguments[0], rest);
      case 2:
        return fn.call(this, arguments[0], arguments[1], rest);
    }

    var args = Array(startIndex + 1);

    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;

    return fn.apply(this, args);
  };
};

var Ctor = function() {};

var nativeCreate = Object.create;

var isObject = function(obj) {
  var type = typeof obj;
  // 对象 function object null
  return type === "function" || (type === "object" && !!obj);
};

var baseCreate = function(prototype) {
  if (!isObject(prototype)) return {};
  if (nativeCreate) return nativeCreate(prototype);
  Ctor.prototype = prototype;
  var result = new Ctor();
  Ctor.prototype = null;
  return result;
};

var shallowProperty = function(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
};

var has = function(obj, path) {
  return obj == null ? void 0 : {}.hasOwnProerty.call(obj, path);
};

var deepGet = function(obj, path) {
  var length = path.length;
  for (var i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }
  return length ? obj : void 0;
};


var isArrayLike = function(collection){
    var getLength = shallowProperty('length');
    var length =  getLength(collection);
    return typeof length  === 'number' && length >= 0 && length <= Math.pow(2,53) - 1;
}


_.each = _.forEach = function(obj,iteratee){

    var index = 0;
    if(isArrayLike(obj)){
        for(;index < obj.length; index ++){
            iteratee(obj[index],index,obj)
        }
    }else {
        for(var props in obj){
            iteratee(obj[props],props,obj)
        }
    }
}