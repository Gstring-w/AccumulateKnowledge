Function.prototype.myCall = function(context, ...args) {
  if (this === Function.prototype || typeof this !== "function") return void 0;
  const fn = Symbol ? Symbol() : "NO_SYMBOL_FN";
  context =
    context ||
    (typeof self == "object" && self.self === self && self) ||
    (typeof global == "object" && global.global === global && global) ||
    {};
  context[fn] = this;
  const result = context[fn](args);
  delete context[fn];
  return result;
};

Function.prototype.myApply = function(context = window, args) {
  if (this === Function.prototype || typeof this !== "function") return void 0;
  return this.myCall(context, ...args);
};

Function.prototype.myBind = function(context, ...args) {
  if (this === Function.prototype || typeof this !== "function") return void 0;
  var func = this;
  return function F(...args1) {
    context =
      context ||
      (typeof self == "object" && self.self === self && self) ||
      (typeof global == "object" && global.global === global && global) ||
      {};
    return this instanceof F
      ? new func(...args, ...args1)
      : func.apply(context, [...args, ...args1]);
  };
}
var isObject = function(obj){
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}
var Ctor = function(){}
function baseCreate(prototype){
    if(isObject(prototype)) return {};
    if(Object.create) return Object.create(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor();
    Ctor.prototype = null;
    return result
}
var newOperator = function(func,...args){
    if(typeof func !== 'function') throw Error('newOperator function first params must ba a function');

    var newObj = baseCreate(func.prototype);

    var result = func.call(newObj,...args);

    if(typeof result === 'object' && result != null) return result;
    return newObj;
}


var debounce = function(func,wait,immediate){
    var timer,result;
    
    var debounceCore = function(){
        var context = this;
        var arg = arguments;
        if(timer) clearTimeout(timer)
        if(immediate){
            var callNow = !timer;
            timer = setTimeout(()=>{
                clearTimeout(timer)
            },wait)
            if(callNow) result = func.apply(context,arg)
        }else {
            setTimeout(()=>{
                result = func.apply(context,arg)
            },wait)
        }
        return result
    }
    debounceCore.cancel = function(){
        clearTimeout(timer);
        timer = null;
    }
    return debounceCore
}

// var throttle = function(func,wait,options={}){
//     if(!options.leading && !options.trading) options = {};
//     var context,timer,args,previous = 0,results;

//     var later = function (){
//         previous = options.leading ? 0 : new Date().getTime();
//         timer = null;
//         results = func.apply(context,args);
//         if(timer) context = args = null;
//     }

//     var throttleCore = function(){
//         var now = new Date().getTime();
//         if (!previous && !options.leading) previous = now;
//         var remaing = wait - (now - previous);
//         context = this;
//         args = arguments;
//         if(remaing <= 0 && remaing >= wait){
//             if(timer) clearTimeout(timer);
//             previous = now;
//             result =  func.apply(context,args);
//             if(timer) context = args = null;
//         }else if( !options.trading && !timer){
//             timer = setTimeout(later,remaing);
//         }
//         return results  
//     }
//     throttleCore.cancel = function(){
//         clearTimeout(timer);
//         timer = null;
//         previous = 0;
//     }
//     return throttleCore
// }

