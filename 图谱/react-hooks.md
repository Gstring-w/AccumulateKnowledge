react 分为2种组件
1. 状态组件（类组件）
2. 无转态组件（函数组件）

### 类组件存在的问题

1. state都存在一起
2. 组件写起来繁琐
3. 面向对象开发


### 函数组件
1. 缺少状态


#### useState 原理

1. React会在组件上声明一个数组，这个数组记录着，这个函数组件依次执行useState的值；
2. 数据下标就是当前的state的值，如果改数组下标没有值，则会使用useState传入的数据；
3. 在函数每次被重新渲染时，函数组件重新执行，重复这个1，2。

#### useState存在的问题

```javascript
const [state,setState] = useState(0);
```

setState将会和类组件的this.setState一样，会批量执行代码

```javascript
setState(prev => prev + 1);
setState(prev => prev + 1);
```