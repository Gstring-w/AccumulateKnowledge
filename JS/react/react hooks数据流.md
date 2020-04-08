1. 单组件的数据流
```javascript
function App(){
    const [count,setCount] = useState(0);
}
```
2. 组件间共享的数据流

```javascript
const CountContext = createContext();

function App(){
    const [count,setCount] = useState(0);
    return (
        <CountContext.Provider value={{count,setCount}}>
           <Child />
        </CountContext.Provider>
    )
};
function Child(){
    const { count } = useContext(CountContext)
}
```

3. 数据流与组件解耦

```javascript
import { createContainer } from 'unstated-next';

function useCounter(){
    const [count,setCount] = useState();
    return {count,setCount};
}

const Counter = createContainer(useCounter);

function App(){
    return <Counter.Provider><Child/></Counter.Provider>
}

function Child(){
    const { count } = Counter.useContainer();
}
``` 