(function() {
  var root =
    (typeof self == "object" && self.self == self && self) ||
    (typeof global == "object" && global.global == global && global) ||
    this ||
    {};

  var ArrayProto = Array.prototype;

  var push = ArrayProto.push;

  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };
  var previousUnderscore = root._;

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  var isArrayLike = function(collection) {
    var length = collection.length;
    return (
      typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX
    );
  };
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  var removeUndefined = function(arr) {
    return arr.filter(i => i !== undefined);
  };

  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  _.identity = function(value) {
    return value;
  };

  var optimizeCb = function(func, context, argCount) {
    // 如果没有传入 context，就返回 func 函数
    if (context === void 0) return func;
    switch (argCount) {
      case 1:
        return function(value) {
          return func.call(context, value);
        };
      case null:
      case 3:
        return function(value, index, collection) {
          return func.call(context, value, index, collection);
        };
      case 4:
        return function(accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var nativeIsArray = Array.isArray;

  _.isArray =
    nativeIsArray ||
    function(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    };

  _.isObject = function(obj) {
    var type = typeof obj;
    return type === "function" || (type === "object" && !!obj);
  };

  // extend 函数可以参考 《JavaScript 专题之手写一个 jQuery 的 extend》
  _.matcher = function(attrs) {
    attrs = _.extend({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // 该函数判断 attr 对象中的键值是否在 object 中有并且相等

  // var stooge = {name: 'moe', age: 32};
  // _.isMatch(stooge, {age: 32}); => true

  // 其中 _.keys 相当于 Object.keys
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs),
      length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };

  _.property = function(path) {
    // 如果不是数组
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  };

  var shallowProperty = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // 根据路径取出深层次的值
  var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  };

  var cb = function(value, context, argCount) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);

    if (value == null) return _.identity;

    if (_.isFunction(value)) return optimizeCb(value, context, argCount);

    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);

    return _.property(value);
  };

  if (typeof exports != "undefined" && !exports.nodeType) {
    if (typeof module != "undefined" && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  _.VERSION = "0.1";

  _.each = function(obj, callback) {
    var length,
      i = 0;

    if (isArrayLike(obj)) {
      length = obj.length;
      for (; i < length; i++) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    }

    return obj;
  };

  _.isFunction = function(obj) {
    return typeof obj == "function" || false;
  };

  _.functions = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  /**
   * 在 _.mixin(_) 前添加自己定义的方法
   */

  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var debounced = function() {
      var context = this;
      var args = arguments;

      if (timeout)clearTimeout(timeout) ;
      if (immediate) {
        // 如果已经执行过，不再执行
        var callNow = !timeout;
        timeout = setTimeout(function() {
          timeout = null;
        }, wait);
        if (callNow) result = func.apply(context, args);
      } else {
        timeout = setTimeout(function() {
          func.apply(context, args);
        }, wait);
      }
      return result;
    };

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };

  _.throttle = function(func, wait, options = {}) {
    if (!options.leading && !options.trailing) options = {}; // 处理同为false，程序出现bug的情况
    var result,
      context,
      args,
      timeout,
      previous = 0;
    var later = () => {
      previous = !options.leading ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = () => {
      var now = new Date().getTime();
      if (!previous && !options.leading) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && !options.trailing) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
    throttled.cancel = () => {
      clearTimeout(timeout);
      previous = 0;
      timeout = null;
    };
    return throttled;
  };
  _.reverse = function(string) {
    console.log(arguments);
    return string
      .split("")
      .reverse()
      .join("");
  };

  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  _.map = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var len = obj.length,
      results = new Array(len);
    for (var i = 0; i < len; i++) {
      results[i] = iteratee(obj[i], i, obj);
    }
    return results;
  };

  // 防止冲突

  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = (_[name] = obj[name]);
      _.prototype[name] = function() {
        var args = [this._wrapped];

        push.apply(args, arguments);

        return chainResult(this, func.apply(_, removeUndefined(args)));
      };
    });
    return _;
  };
  _.mixin(_);
})();
