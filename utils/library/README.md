### react-hooks-form
github: <a herf='https://github.com/react-hook-form/react-hook-form'>https://github.com/react-hook-form/react-hook-form</a>

> 这是一个 React 表单库，基于 React Hooks，看上去代码相当简洁，star 也很高，也许以后可以摆脱那些笨重的表单组件了。

### react-contenteditable

github: <a herf='https://github.com/lovasoa/react-contenteditable'>https://github.com/lovasoa/react-contenteditable</a>

> React component for a div with editable contents

### fast-deep-equal
> The fastest deep equal
```js
const equal = require('fast-deep-equal');
console.log(equal({foo:'bar'},{foo:'bar})); // true 
```

### sanitize-html

```JS
clean = sanitizeHtml(dirty, {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
  allowedAttributes: {
    'a': [ 'href' ]
  },
  allowedIframeHostnames: ['www.youtube.com']
});
```


## react-motion
> react 动画库
github: <a href='https://github.com/chenglou/react-motion'>https://github.com/chenglou/react-motion</a>

## recompose
> react 高阶组件库

github:<a href='https://github.com/acdlite/recompose'>https://github.com/acdlite/recompose</a>

## iconv­-lite
iconv的纯js实现，编码转换库

```js
var iconv = require('iconv-lite');
// Convert from an encoded buffer to js string. 
str = iconv.decode(buf, 'GBK');
// Convert from js string to an encoded buffer. 
buf = iconv.encode("Sample input string", 'GBK');
// Check if encoding is supported 
iconv.encodingExists("us-ascii")
```

## IntersectionObserver 接口 
> 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗（viewport) 交叉状态的方法，祖先元素与视窗（viewport) 被称为根（root）
 
兼容性不太好

polyfill：
npm: <a href="https://www.npmjs.com/package/intersection-observer">IntersectionObserver polyfill</a>

应用场景：
1. 页面滚动时懒加载
2. 无限下拉
3. 检测某些广告元素的曝光情况来做相关的数据统计
4. 检测用户的滚动行为是否达到了目标元素位置来实现一些交互逻辑（比如视频元素滚动到隐藏位置时暂停播放）

## timeage.js
> 自动更新离现在时间的间隔
