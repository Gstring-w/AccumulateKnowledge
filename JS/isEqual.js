var isFunction = function(func){
    return typeof func === 'function' || false;
}
var has = function(obj, path) {
    return obj != null && Object.prototype.hasOwnProperty.call(obj, path);
}
var isObject = function(obj){
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

var nativeKeys = Object.keys;
var toString = Object.prototype.toString;

var keysFunc = function(obj) {
    if (!isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (has(obj, key)) keys.push(key);
    return keys;
};


var eq, deepEq;
  eq = function(a, b, aStack, bStack) {
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    if (a == null || b == null) return false;
    if (a !== a) return b !== b;
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  };

  deepEq = function(a, b, aStack, bStack) {
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      case '[object RegExp]':
      case '[object String]':
        return '' + a === '' + b;
      case '[object Number]':
        if (+a !== +a) return +b !== +b;
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        return +a === +b;
      case '[object Symbol]':
        return Symbol.prototype.valueOf.call(a) === Symbol.prototype.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor &&
                               isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
   
    while (length--) {
      if (aStack[length] === a) return bStack[length] === b;
    }
    aStack.push(a);
    bStack.push(b);
    if (areArrays) {

      length = a.length;
      if (length !== b.length) return false;
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      var keys = keysFunc(a), key;
      length = keys.length;
      if (keysFunc(b).length !== length) return false;
      while (length--) {
        key = keys[length];
        if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    aStack.pop();
    bStack.pop();
    return true;
};
