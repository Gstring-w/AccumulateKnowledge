/**
 * 只有`Object.create(null)`,`{}`,`new Object`产生的对象返回`true`
 * 纯粹的对象
 */

var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;

function isPlainObject(obj) {
  var Cotr, proto;

  if (!obj || toString.call(obj) !== "[object Object]") return false;

  proto = Object.getPrototypeOf(obj);

  if (!proto) return true;

  Cotr = hasOwn.call(proto, "constructor") && proto.constructor;

  return (
    typeof Cotr === "function" && toString.call(Cotr) === toString.call(Object)
  );
}

function isEmptyObject(obj) {
  var name;

  for (name in obj) return false;
  return true;
}
// console.log(isEmptyObject({})); `true`
// console.log(isEmptyObject([])); `true`
// console.log(isEmptyObject(null)); `true`
// console.log(isEmptyObject(undefined)); `true`
// console.log(isEmptyObject(1));  `true`
// console.log(isEmptyObject(''));  `true`
// console.log(isEmptyObject(true)); `true`


module.exports = { isPlainObject, isEmptyObject };

