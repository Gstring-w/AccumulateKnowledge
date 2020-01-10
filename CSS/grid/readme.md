grid 网格布局 是最强大的 css 布局方案
概念：

1. 容器：拥有`{display:grid}`属性作用的元素
2. 项目：容器的直属子元素
3. 行和列
4. 网格线

将容器设为 grid 布局时
容器子元素 `float` `display:inline-block` `display:table-cell` `vertical-align` `column-*`等失效

容器上的属性

grid 拥有 block 的性质
inline-grid 用于 inline

```css
.item {
  /* display:grid */
  display: inline-grid;
}
```

### 容器中的属性

##### `grid-template-columns` && `grid-template-rows`

> 子项目 box-sizing: border-box

1. 只使用 px

```css
.wrapper {
  display: grid;
  grid-template-columns: 100px 10px 10px; // 可以使用px，也可以使用% %值的是父级（容器）的宽度
  grid-template-rows: 10px 10px 10px;
}
```

2. repeat()函数辅助

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(
    12,
    10px 20px
  ); // 分成12份 没份宽度为10px 20px 10px 20px ...
}
```

3. auto-fix 关键字
   > 单元格大小固定，容器大小不固定 auto-fix 表示某一行/列 容纳尽可能多的项目
   > == 必须用在 repeat()的第一个参数 ==

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(
    auto-fix,
    100px
  ); // 容器按照100px大小尽可能的装，装不下放都第二行[当然grid-template-rows也是一样]
  grid-template-rows: auto-fix;
}
```

4. fr 关键字
   > 比例分配

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 100px 1fr 1fr; // 后边的fr为 【容器宽度-100px】剩下的比例分配
}
```

5. minmax() 函数
   > 表示宽/高度在 min->max 的值之间
   > ? 如果 min 值大于 max 值会怎么样？
   > 会以最小的值显示
   > ？如果容器的宽度比最小值都小怎么样？
   > 会超出容器显示

```css
.wrapper {
  display: grid;
  grid-template-columns: minmax(100px, 1fr);
}
```

6. auto 关键字

```css
.wrapper {
  display: grid;
  grid-template-columns: 100px auto 100px;
}
```

7. 给每个网格线取个名字

?名称重复会怎么样？

```css
.wrapper {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] 100px [c4]; // 单个名字
  grid-template-rows: [fifth-one r1] 100px;
}
```

##### `grid-row-gap` && `grid-column-gap` && `grid-gap`

- grid-row-gap 行与行之间的距离 grid-column-gap 列与列之间的距离 

- grid-gap 前面 2 个属性的简写 <grid-row-gap> <grid-column-gap>，第二个值不写，默认和前面的值一致

== 只是行与行之间的距离，和容器的边没有间隔 ==

##### `grid-template-areas`

重叠部分可以使用z-index来调整
```css
.wrapper{
  display:grid;
  grid-template-columns:100px 100px 100px;
  grid-template-rows:100px 100px 100px;
  grid-template-areas:'a b c'
                      'd . d'
}
.item{
  grid-areas:a
}
.item{
  grid-areas:b
}
.item{
  grid-areas:c
}
.item{
  grid-areas:d
}
.item{
  grid-areas:d
}
.item{
  grid-areas:d
}

```
== 区域的命名会影响到网格线，每个区域的起始网格线会自动命名为【区域名-start】，结束网格线会自动命名为【区域名-end】 == 

##### `grid-auto-flow`

划分网格以后，容器内的子元素，会按照一定的顺序排列

1. column | row 
一个按照行，一个按照列的排序，可能会存在空隙

2. column dense | row dense
能拍尽量拍，不会产生空隙


##### `justify-items` && `align-items` && `place-items`

属性值：
```css
.wrapper{
  display:grid;
  justify-items: start | end | center | stretch(默认值)
  align-items: start | end | center | stretch(默认值)
}
```
每个行网格线和列网格线 组成了单元格

改属性表示在单元格中的布局


##### `justify-content` && `align-content` && `place-content`

表示整个网格的布局

```css
.wrapper{
  display:grid;
  justify-content:start | end | center | stretch | space-around | space-between | space-evenly(项目与项目之间的间隔相等，和边框之间距离也相等)
}
```

##### `grid-auto-rows` && `grid-auto-columns`

对于 grid-template-rows 和 grid-template-columns 没有定义的行，浏览器自动创建多余的宽和高


### 项目属性

##### `grid-columns-start` && `grid-columns-end` && `grid-rows-start` && `grid-rows-end`;

定义单元格中4个边分别对应哪根网格线（可以用数字表示，可以使用容器属性上定义的网格线）

```css
.item{
  grid-columns-start:2;
  grid-columns-end:4;
  grid-rows-start:2;
  grid-rows-end:2;
}
```

== span关键字 ==
表示跨域了多少个网格


== 简写形式 ==

```css
.item{
  grid-columns:1 / 2;
  grid-rows: 1 / 1;
}
```

##### `grid-areas`
 放在哪个区域
 和容器属性 grid-template-areas 连用


##### `justify-self` && `align-self` && `place-self`

```css
.item{
  justify-self: start | end | center | stretch(默认值)
  align-self: start | end | center | stretch(默认值)
}
```