### 如何测试一段代码的运行速度？

一般都会使用如下代码来进行测试

```js
var start = (new Date()).getTime();

// 测试部分


var end = (new Date()).getTime();

console.log(`运行时间为：${end - start}`)
```

存在的弊端：
 - 浏览器精度问题
 - 单独运行可能会被编译器优化
 - 可能在获得start和end时间戳的时会存在延误


漫长的解决之旅

重复测试代码取平均值
- 存在几个异常值，会影响平均值
- 误差积累
- 不使用重复，使用定时重复（存在定时器精度的问题）

最终解决办法<a href='https://github.com/bestiejs/benchmark.js'>Benchmack.js</a>

```js
var suite = new Benchmark.Suite;
// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
.add('String#match', function() {
  !!'Hello World!'.match(/o/);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
```

关于Benchmack.js的测试书写细节
测试关键代码的性能应该注重上下文，主要测试关键代码

人类可以感知的速度大概是16ms，因此没必要为了一些性能差别不大的代码

对于比较X和Y之间测试的性能，应该尽量保持没有测试到的代码一致。只更改测试代码部分

尽量少使用循环代码，可能测试代码库中就使用了循环代码


存在的弊端以及性能测试的问题

1. 环境不相同
2. 不同js引擎优化（即在测试时优化，生产代码里不优化）


关于代码的微性能

弊端：
1. 可能不同的引擎优化的方式不同
2. 不要揣测引擎优化
3. 不能为了一个引擎优化，去更改代码的书写（现代的浏览器更新很快，有可能现在代码优化，之后版本更迭，优化反成累赘）


es6中尾调用优化