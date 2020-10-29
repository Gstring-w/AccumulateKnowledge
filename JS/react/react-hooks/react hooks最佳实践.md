[链接](https://juejin.im/post/6844904165500518414)
```javascript
function Example(props) {
    const { count } = props;
    const handleClick = () => {
        setTimeout(() => {
            alert(count);
        }, 3000);
    };
    return (
        <div>
            <p>{count}</p>
            <button onClick={handleClick}>Alert Count</button>
        </div>
    );
}
```
函数式组件，这里的count，和下一次渲染的count不是同一个值，所以在3秒之后访问的是之前渲染的count值。
*后期可以看看react hooks源码*

```javascript
class Example2 extends Component {
    handleClick = () => {
        setTimeout(() => {
            alert(this.props.count);
        }, 3000);
    };

    render() {
        return (
            <div>
                <h2>Example2</h2>
                <p>{this.props.count}</p>
                <button onClick={this.handleClick}>Alert Count</button>
            </div>
        );
    }
}
```
类组件，不管怎么渲染，其中的this不变，所以3秒之后访问的还是当前的count值。

useRef
useEffect
useLayoutEffect
useReducer
useMemo
useCallback