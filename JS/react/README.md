jsx -> js

- function 和类数组的区别（tag 是否是变量，或者是字符串）大小写的约定
- 通过`chrildren`来表示并列和嵌套关系
  React.createElement(tag,options,...chrilren);

React.createRef

ref 三种实现方式(在类组件中)

```jsx
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.createFuncRef = React.createRef(); // create {current:null}
  }
  render() {
    return (
      <div>
        <span ref="stringRef">demo1</span>
        <span
          ref={ref => {
            this.functionRef = ref;
          }}
        >
          demo2
        </span>
        <span ref={this.createFuncRef}>demo1</span>
      </div>
    );
  }
}
```


ref在函数组件中使用 React.forwardRef()

memo  相当于pureComponent



```js
ReactDOM.render(<App />, document.getElementById('root'))
```

ReactDOM.render 
==> legacyRenderSubtreeIntoContainer(null,element,container,false,callback) {

    1. 给root赋值 legacyCreateRootFromDOMContainer(container<DOM节点>,forceHydrate<一开始传入的false>)  legacyCreateRootFromDOMContainer ==> 判断container中的节点是否可用，不可用删除节点，并且创建一个ReactRoot对象{
        _internalRoot:root
    }
    创建一个FiberRoot

    render()调用  

    调用的是ReactRoot原型上的方法


    updateContainer(children, root, null, callback);
}


updateContainer在react-reconciler