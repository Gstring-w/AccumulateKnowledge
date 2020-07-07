[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

1. 模拟 class 组件的 componentDidMount 生命周期
2. useEffect 拿到的 state 和 props 并不是最新的
3. 在 useEffect 里请求数据
4. useState 和 class 组件中的 state 对比

## 模拟 class 组件的 componentDidMount 生命周期

```javascript
import React, { useEffect } from "react";

function Demo() {
  useEffect(() => {
    // componentDidMount or componentDidUpdate
    return () => {
      // componentWillUnMount
    };
  }, []); // Deps is empty
  return <>demo</>;
}
```

整个函数更新的过程：

执行整个函数 -> 更新 ui -> 执行 useEffect 中的函数 -> setState 触发下一个更新 -> 重新执行整个函数 -> 更新 ui -> 执行上一次 useEffect 的返回的函数 -> 执行这次的 useEffect

## 每次渲染都有自己的 useEffect

```javascript
function Demo(){
    const [count, setCount] = useState(0);
    useEffect(()=>{
        document.title = `click ${count} times`;
    },[count])

    return <>
        <input value={count}/>
        <button onClick={()=> setCount(count + 1)}>click<button/>
    </>
}
```

在每次点击的时候，实际上运行的是

```javascript
// 第一次运行
function Demo(){
    const count = 0; // function state

    try{
        return ...  // update react ui
    }finally{
        document.title = `click ${count} times`; // excute useEffect
    }
}
// 第二次运行
function Demo(){
    const count = 1; // function state

    try{
        return ...  // update react ui
    }finally{
        document.title = `click ${count} times`; // excute useEffect
    }
}

// 第三次运行
function Demo(){
    const count = 2; // function state

    try{
        return ...  // update react ui
    }finally{
        document.title = `click ${count} times`; // excute useEffect
    }
}
```

## useState 和 class 组件中的 state 对比

```javascript
function Example(props) {
  useEffect(() => {
    setTimeout(() => {
      console.log(props.counter);
    }, 1000);
  });
  // ...
}
```

```javascript
function Example() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    // Set the mutable latest value
    latestCount.current = count;
    setTimeout(() => {
      // Read the mutable latest value
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });
  // ...
```

useEffect会记住每次的state，而class会批量更新。

改变 count，但是不依赖 count 的写法

```javascript
import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <input value={count} />
    </>
  );
}
```

但是上面的这种写法，存在一定的限制，如果需要计算 count 值，使用上面的代码，就不行

```javascript
import React, { useReducer, useEffect } from "react";

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <>
      <h1>{count}</h1>
      <input
        value={step}
        onChange={(e) => {
          dispatch({
            type: "step",
            step: Number(e.target.value),
          });
        }}
      />
    </>
  );
}

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === "tick") {
    return { count: count + step, step };
  } else if (action.type === "step") {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}
```

### useEffect 中使用异步函数，竞态的问题

```javascript
function Article({ id }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      const article = await API.fetchArticle(id);
      if (!didCancel) {
        setArticle(article);
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [id]);

  // ...
}
```

如果异步函数存在取消的操作，可以使用在 useEffect 中返回取消的函数
