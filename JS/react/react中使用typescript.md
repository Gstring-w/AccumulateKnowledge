

### 函数组件

```typescript
const DemoFunc: React.FC<ExampleProps> = (props: ExampleProps) => {
  return <div>函数</div>;
};
```

规范 type

1. 所有的`jsx`，都必须使用`tsx`；
2. 类组件使用`Component<P,S>`泛型参数申明；
3. 全局变量，或者是 window，类型放在根目录下`global.d.ts`；
4. 项目中用到的接口类型，在types/目录下定义结构化申明。


### 类组件（ts在类中的语法糖）

1. 规定 props 和 state

```typescript
import React, { Components } from 'react';

interface ExampleProps {
    time:string,
    name:string,
    func:(name:void=>void)
}
interface ExampleState{
    state:boolean
}

class Example extends Compoents<ExampleProps,ExampleState>{
    state = {
        state:false
    }

    public render(){
        return <h1>hello worlds </h1>
    }
}

```