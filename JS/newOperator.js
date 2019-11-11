/**
 * 
 * @param {*} func 函数的引用
 * @param {arguments[1]...} 函数的参数 
 */


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

function newOperator(func){
    if(typeof func !== 'function') throw Error("newOperator function first params must ba a function!");

    const newObj = baseCreate(func.prototype);
    const args = [].slice.call(arguments,1);
    const funcResult = func.call(newObj,args);

    if(funcResult !== null && typeof funcResult === 'object') return funcResult;
    return newObj;
}