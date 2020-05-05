react 分为 2 种组件

1. 状态组件（类组件）
2. 无转态组件（函数组件）

### 类组件存在的问题

1. state 都存在一起
2. 组件写起来繁琐
3. 面向对象开发

### 函数组件

1. 缺少状态

#### useState 原理

1. React 会在组件上声明一个数组，这个数组记录着，这个函数组件依次执行 useState 的值；
2. 数据下标就是当前的 state 的值，如果改数组下标没有值，则会使用 useState 传入的数据；
3. 在函数每次被重新渲染时，函数组件重新执行，重复这个 1，2。

#### useState 存在的问题

```javascript
const [state, setState] = useState(0);
```

setState 将会和类组件的 this.setState 一样，会批量执行代码

```javascript
setState(prev => prev + 1);
setState(prev => prev + 1);
```

#### useEffect

> react 组件刷新的原理

1. useEffect 会在组件渲染完成之后，执行 useEffect 函数
2. useEffect 第二个参数发生变化的时候 useEffect 也会被执行
3. useEffect 第二个参数传空数组时，只会在挂载之后被执行，之后更新组件时不执行

```javascript
useEffect(() => {
  console.log(111);
  return () => {
    console.log("组件被卸载");
  };
}, []);
```

demo：一个倒计时的 react 组件

```javascript

import React,{ useEffect,useState } from 'react';

let timer = null;
export default const Demo = ({defaultTime})=>{
    const [time,setTime] = useState(defaultTime);

    useEffect(()=>{
        timer = setTimeout(()=>{
            setTime(time -  1);
        })
        return clearTimeout(timer)
    },[time])

    return <>
        倒计时：{time}
    </>
}
```

> tips： 把 react 组件更新的每次操作，想象成一个动画帧，只需要考虑这帧动画发生的事情就可以。

#### 自定义 hook

> 相比较于类组件中的高阶组件，但是比高阶组件好处在于，不会嵌套更多的组件，但是只能传递一个数据

react 的思想就是 f(n) = 页面，就是传什么值，我就展示什么

推荐一个 react-hooks 库
[react-use]("https://streamich.github.io/react-use/?path=/story/sensors-createbreakpoint--docs")

##### 一些不常用的 hooks，但是优化组件经常用的

1. useLayoutEffect
   和 useEffect 本质没有什么区别，但是 useEffect 会在 react 组件挂载之后，才执行里面的代码；如果 useEffect 里面的代码，操作了 Dom，就会出现闪屏。<br/>
   而使用 useLayoutEffect 则不会出现
2. useMemo

   用一段代码来解释

```javascript
import React from 'react';

const Parent = ()=>{
  const [name,setName] = useState(0);
  const [content,setContent] = useState(0);

  return <>
    <button onClick={()=>setName(new Data().getTime())}>click</button>
    <button onClick={()=>setContent(new Data().getTime())}>click</button>
    <Children name={name} content={content}/>
  </>
}


const Children = ({name,content})=>{
  const changeName = (name)=>{
    console.log(`这里不管 name还是content变化，都会重新执行这个函数`)
    return new Data(name);
  }
  const otherName = changeName(name)

  return <>
    {otherName}{content}
  </>
}

const Children = ({name,content})=>{
  const changeName = (name)=>{
-    console.log(`这里不管 name还是content变化，都会重新执行这个函数`)
+    console.log(`这里只要name变化是才会执行`)
    return new Data(name);
  }
-  const otherName = changeName(name)
+  const otherName = useMemo(()=>changeName(name),[name])

  return <>
    {otherName}{content}
  </>
}

```
