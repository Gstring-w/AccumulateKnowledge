问题1：css加载会造成阻塞吗？

答：（1）css加载不会造成DOM解析阻塞；（2）css加载会造成在css后面```<script>{code}</script>```内，以及不包含```async``` ```defer```的js文件阻塞。

扩展：外部js文件包含```async``` ```defer```不会被css加载阻塞

async用法：

定义和用法
async 属性规定一旦脚本可用，则会异步执行。
> 所有被```<script></script>```的src引用的文件，都会被当做js脚本解析，而不是根据后缀名使用
注释：async 属性仅适用于外部脚本（只有在使用 src 属性时）。

注释：有多种执行外部脚本的方法：

如果 async="async"：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
如果不使用 async 且 defer="defer"：脚本将在页面完成解析时执行
> 例如一些用到document的js脚本，就必须使用defer
如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本

问题2：css加载为什么会阻塞js的执行

1. 浏览器先进行DomTree解析，再进行CssTree解析
2. 根据DOMTree和CssTree 合成一个RenderTree,浏览器渲染
3. 【个人猜测】浏览器可能为了js能访问Dom和Dom上的css属性，css加载才会阻塞js的执行。

- 如果js不会访问（包括操作）Dom,不会访问css属性：使用async
- 如果js会访问dom，但不会访问css属性：使用defer
- 如果js会访问dom，也会访问css：什么都不使用



