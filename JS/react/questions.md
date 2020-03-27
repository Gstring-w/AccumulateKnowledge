### 为什么要使用 Virtual Dom

1. 不管数据改变多少，每次的重绘性能都可以接受
2. 依然可以使用innerHTML的思路去开发
3. React 检查是基于DOM结构层面的，相比于MVVM框架，可以重新复用之前的DOM结构，而去改变数据
4. 可以将Virtual DOM 渲染到非浏览器的环境中

MVVM 和 Virtual DOM 在需要渲染大量列表，列表结构不变，但是数据改变

MVVM 在数据改变时 需要重新计算（能否复用） ViewModel 实例 的 DOM 元素

而React 只要 变动检查 DOM结构，DOM结构不变，便可以复用

### React 的 diff算法

不同层的变化，相同元素设置不同key