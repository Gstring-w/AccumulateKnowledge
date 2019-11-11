// 第四版
function tmpl(str, data) {
    var str = document.getElementById(str).innerHTML;

    var fn = new Function("obj",

    "var p = []; with(obj){p.push('" +

    str
    .replace(/[\r\t\n]/g, "")
    .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
    .replace(/<%/g, "');")
    .replace(/%>/g,"p.push('")
    + "');}return p.join('');");

    var template = function(data) {
        return fn.call(this, data)
    }
    return template;
};

// 使用时
var compiled = tmpl("user_tmpl");
results.innerHTML = compiled(data);


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