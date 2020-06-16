## Ts with React

### 函数声明

```js
import React from "react";

function Demo(): React.ReactNode {
  return <h1>hello world</h1>;
}
```

### 函数表达式

```js
const Demo: React.FC = () => <h1>hello world</h1>;
```
