// 一个文件SomeWebpackPlugin.js 独立模块


function SomeWenpaclPlugin(pluginOptions){
    this.options = pluginOptions;
}

// 原型定义一个apply函数，并注入compiler对象
SomeWenpaclPlugin.prototype.apply = function(compiler){
    // 挂载webpack事件钩子
    compiler.plugin('emit',function(compilation,callback){
        // ... 内部进行自定义的编译操作

        // 操作compilation对象的内部数据
        console.log(12);

        // 执行callback回调
        callback();
    })
}
// 对外暴露的js函数
module.exports = SomeWenpaclPlugin