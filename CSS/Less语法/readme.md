1. 变量

```less
@var: "red";
div {
  color: @var;
}
```

2. 混合

```less
.temp {
  color: red;
}
div {
  width: 100px;
  height: 100px;
  .temp;
}
```

函数式混合

```less
.border-radius(@radius:0px) {
  border-radius: @radius;
}

div {
  .border-radius(10px);
}
```

可以使用 arguments 来代表所有传入的变量

```less
.box-shadow(@x:1px,@y:1px,@blur:0px,@color:#000) {
  .box-shadow: @arguments;
}
```

3. 模式匹配

```less
.mixin(light,@color) {
  color: lighten(@color);
}
.mixin(dark,@color) {
  color: darken(@color);
}
.mixin(@_,@color) {
  display: block;
}
@switch: light;

div {
  .mixin(@switch,#111);
}

这里会逐个匹配，第一个不匹配，第二个被匹配，第三个为任意匹配。
```

### 官网

1. 变量
2. 混合
3. 嵌套
4. 运算
5. 转义
6. 函数
7. 映射
