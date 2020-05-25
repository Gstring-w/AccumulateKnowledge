## 解决的问题

1. 通过 ajax 无刷新跳转页面；
2. 改变浏览器 url，但是浏览器不刷新。

### react-router

> 存在 react-router-dom 和 react-native 中使用的路由组件；和 react 框架的结构一样

### react-router-dom

#### 2 种模式

1. Hash Router

通过锚点`#`号，这种模式兼容性很好，并且保证了改变`#`后边的数字，页面不会刷新

2. Brower Router

使用 H5 新增的 History 对象，中的方法 pushState，使得改变浏览器的 url，页面不会刷新

##### 实现这种路由的关键技术点

1. 改变浏览器的 url，使得浏览器不会刷新页面；
2. 通过观察者模式，封装一些跳转路由的方法，这些个方法，会改变浏览器 url（浏览器不会刷新），通知路由组件页面 url 改变，而使得 js 重新渲染组件

#### api

```javascript
import React from "react";
import { BrowerRouter as Router, Route } from "react-router-dom";

function Demo() {
  return <h1>这个是demo</h1>;
}

function App() {
  return (
    <>
      <Router>
        <Route path="/app" component={Demo} />
        <Route component={Demo} />
      </Router>
    </>
  );
}
```

##### Route

从上到下一次匹配，没有被 Switch 组件报告的话，有可能会匹配多个路由

1. exact 严格匹配
2. path 的 `string pattern`

eg:

```javascript
<Route path="/date/:year/:month/:day" component={Demo}></Route> // 这个之后会在Demo的props的match的params中出现

<Route path="/date/:year(/+d)/:month(/+d)/:day(/+d)" component={Demo}></Route>
<Route path="/date/:year(/+d)/:month(/+d)/:day(/+d)/*" component={Demo}></Route>
```

这个匹配会有一个`path-to-regexp`包来解决

##### Switch

从上到下匹配，单只会匹配第一个路由，渲染匹配到路由组件

##### widthRouter 高阶组件

有些个组件，并不是用过 Route 组件匹配得到的，因此就不会再 props 中出现这个三个对象`history location match`，操作路由的对象

1. 组件嵌套较少，可以使用 props 一层一层传递
2. 通过 withRoute 包裹一下

```javascript
import { withRouter } from "react-router-dom";

function Demo() {
  return <h1>这个是demo</h1>;
}

export default withRouter(Demo);
```

##### 和`Vue`对比

- `Vue`使用的是静态配置

`Vue`通过配置文件，事先定义好路由

- `React`使用的是动态配置

`React`通过正则比对路由，来决定是否渲染`React组件`，属于在运行 js 时配置路由

##### 使用`react--router-dom`来实现路由守卫

- 监听路由变化

通过`Route`和`withRouter`拿到的`history`对象中存在的`listen`

```javascript
import React from "react";

class ListenRoute extends React.Component {
  componentDidMout() {
    const {
      history: { listen }
    } = this.props;

    this.unListen = listent((...args) => {
      console.log(args);
    });
  }

  compoentWillUnmount() {
    this.unListen();
  }

  render() {
    return null;
  }
}
```

listen 传入一个函数，该函数会在每次路由变化时运行该函数，但是不能做到阻止进入下一个路由；并返回一个函数，执行该函数，便会取消监听函数

- 阻止路由跳转

通过`Route`和`withRouter`拿到的`history`对象中存在的`block`
