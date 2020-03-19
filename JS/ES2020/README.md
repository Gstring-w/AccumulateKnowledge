#### Promise.all 和 Promise.allSettled

1. Promise.all() 数组中的一项 reject 了，就不会被后续的 then 中成功的方法获取到
2. Promise.allSettled() 可以获取到

#### 可选链

> 没有就返回 undefined

```js
// 在点操作符使用？
var person = {};
var name = person?.name;
```

在 babel 中被转化为：

```js
var person = {};
var name = person === null || person === void 0 ? void 0 : person.name;
```

#### 空值合并符

> `??`

```js
var user = {
  data: {
    level: 0
  }
};
var level = (user.data && user.data.level) || "暂无等级";
var newLevel = `${user.data.level ?? `暂无等`}级`;
```

转化后：

```js
"use strict";

var _ref;

var user = {
  data: {
    level: 0
  }
};
var level = (user.data && user.data.level) || "暂无等级";
var newLevel =
  (_ref = "".concat(user.data.level)) !== null && _ref !== void 0
    ? _ref
    : "暂无等";
```

#### dynamic-import

> 可以按需加载模块

#### globalThis

> 全局对象，再也不用通过兼容各种环境来获取全局对象了

#### Bigint

> `JavaScript`数字的存储，都是以 64 位浮点数存储的，使用 `BigInt` 便可以操作超过 `[-Math.pow(2,53),Math.pow(2,53) - 1]`的范围来实现大数的精准运算

```js
var number = 12323n;

// 或

var number = new BigInt(12323);
```

#### String.prototype.matchAll

> 使用`matchAll` 将返回一个`iterator`的迭代器 `[Symbol.iterator]`
> 但凡一个对象拥有这个方法`[Symbol.iterator]`，便可以被`for of`方法遍历
