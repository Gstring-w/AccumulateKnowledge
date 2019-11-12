## 基本架构
> 基于一种类似事件的方式

```JS
compiler.plugin('compilation',(compilation,callback)=>{
    // 当compilation实例生成时
    compilation.plugin('optimize',()=>{
        // 当所有 modules 和 chunks 已生成，开始优化时
    })
})

compiler.plugin('compile',(params)=>{
    // 当编译器开始编译模块时
    let nmf = parmas.normalModuleFactory
    nmf.plugin("before-resolve",(data)=>{
        // 当factory开始解析模块前
    })
})
```

==webpack 的核心功能，是抽离成很多个内部插件来实现的==


```JS
compiler = new Compiler();

compiler.options = new WebpackOptionsApply().process(options,compiler);
```
在WebpackOptionsApply 这个插件内部会根据我们传入的webpack 配置来初始化需要的内部插件：

```JS
JsonTemplatePlugin = require('./JsonTemplatePlugin');
NodeSourcePlugin = require('./node/NodeSourcePlugin');
compiler.apply(
    new JsonTemplatePlugin(options.output),
)
```
每一个内部插件，都是通过监听任务点的方式，来实现自定义的逻辑。比如JsonTemplatePlugin 这个插件，是通过监听mainTemp对象的require-ensure任务点，来生成jsonp风格的代码

```JS
mainTemplate.plugin('require-ensure',(_,chunk,hash)=>{
    return this.asString([
        "var installedChunkData = installedChunks[chunkId];",
    ])
})
```

==每个插件应该监听哪个对象的任务点，又如何实现特定的功能呢？==

## webpack 的构建流程
> webpack构建过程中，会涉及到非常多的对象和任务点，当我们需要实现某个特定内容的时候，再去找对应的模块源码查阅任务点
### 几个核心对象和任务点

#### webpack构建阶段

- webpack的准备阶段
> 这个阶段的主要工作，是创建Compiler 和 Compilation 实例
```js
compiler.apply(new EntryOptionsPlugins());
compiler.applyPluginsBailResult('entry-option',options.context,options.entry); // 触发entry-option任务点

class EntryOptionsPlugins{
    apply(compiler){
        compiler.plugin('entry-option',(context,entry)=>{
            // ... 根据不同的entry配置，生成不同的插件应用到compiler实例上
        })
    }
}
// 以单文件入口类为例
class SingleEntryPlugin{
    apply(compiler){
        compiler.plugin('make',(compilation,callback)=>{
            const dep = SingleEntryPlugin.createDependency(this.entry,this.name);
            compilation.addEntry(this.context,dep,this.name,callback)
        })
    }
}
// 这里的make任务点，将成为后面解析 modules 和chunks 的起点
compiler.plugin('run',(options,callback)=>{
    console.log(options);
    callback();
})
// 任务点run 只有在webpack以正常模式运行的情况下才会触发，如果我们监听（watch）模式运行webpack，那么任务点run是不会触发的，但是会触发watch-run
compiler.run();


// 实例化2个核心的工厂对象，分别是NormalModuleFactory 和 ContextModuleFactory，这2个工厂会在任务点compile触发时传递过去
compiler.plugin('compile',(params)=>{
    // ...
})

// 构建Compilation 对象，它包含了一次构建过程中的所以数据，也就是说一次构建过程对应一个compilation实例。触发任务点compilation 和this-compilation
```
- modules 和 chunks 的生成阶段

- 文件生成阶段






## webpack 插件
### 插件需要满足的条件
1. 是一个独立的模块
2. 模块对外暴露一个js函数
3. 函数原型（prototype）上定义一个注入compiler 对象的apply方法
4. apply函数中需要有通过compiler对象挂载的webpack 时间钩子，钩子的回调中能拿到当前编译的compilation对象，如果是异步编译插件的话可以拿到回调callback
5. 完成自定义子编译流程并处理complition对象的内部数据
6. 如果异步编译插件的话，数据处理完成后执行callback回调