# JavaScript、CSS、HTML、及动画、协议、安全、网络、性能优化、React/Vue、算法
## `display：inline-block`的`width` 属性

### 外部尺寸与流动特性

流动性：
`margin`/`border`/`padding`/`content` 内容区域自动分配水平容器的特性

格式化宽度

### 内部尺寸和流动特性

**1. 包裹性**：元素尺寸有内部元素决定，但永远小于包裹块容器的尺寸（除非容器尺寸小于“首选最小宽度”）  
**2. 首选最小宽度**：元素最适合的最小宽度（东亚文字：一个汉字的宽度，西方文字：连续的英文字符单元决定）  
**3. 最大宽度**：等于‘包裹性’元素设置 `white-space:nowrap` 申明后的宽度。（连续的内联盒子）

## `display：inline-block`的`height` 属性

### `height:100%`
**对于width属性就算是父级是width:auto,也是支持的，但是height父级属性时auto,子级是百分数就会失效**

```css
div{
    width:100%; // 多余的
    height:100%; // 无效的
    background：red;
}
```
此时的高度为0；因为`html`和`body`的`height为auto`

```css
html,body{
    height:100%;
}
```

**如何让`height:100%`有效呢？？**

1. 设定显式的高度值；
2. 使用绝对定位

```css
div{
    height:100%;
    position:relative;
}
```
**绝对定位的百分比计算是基于`padding-box`的；**  
**非绝对定位的百分比计算是基于`content-box`的。**、

#### `min-wdith` `max-width`

想到自适应各种图片
```css
img{
    max-width:100%;
    height:auto !imporant;
}
```
**同时设置`min-width`、`max-width`和`width`的权重**

`min-width` >> `max-width` >> `width`

**使用`max-width`来实现未知高度的展开动画**

```css
.element{
    max-width:0;
    transition:max-height .5s;
    overflow:hidden;
}
.element.active{
    max-width:9999px；//（一定足够大）
}
```

## `padding` 属性
**可以增加按钮和链接的点击局域**

内联元素没有可视高度（`clientWidth`和`clientHeight`永远为0）；内联元素垂直方向的表现，永远只有`vertical-aline`和`line-height`属性控制。

`padding`元素不影响定位，但是`padding`过大会出现层叠的情况。

### 重叠现象的发生
1. 纯视觉效果，不影响布局（还有`box-shadow`、 `outline`也不影响布局）
2. 但会出现滚动条

### `padding` 百分比值

**无论是水平方向还是垂直方向都是基于宽度（本身）的**

例如：实现2：1效果

#### 内联元素`padding` 百分比
- 同样是相对于宽度
- `padding`会断行（多行文本）

**如果容器可以滚动，在`IE`和`FireFox`是忽视`padding-bottom`，但是`Chrome`可以（最好是使用`margin`，或者借助子元素）**


## `margin`属性

### `margin:auto`

填充规则如下：
1. 如果一侧定值，一侧`auto`，则`auto`为剩余大小
2. 如果2侧均是`auto`，则平分剩余空间

**实现块状元素右对齐，可以使用`float:right`，也可以使用`margin-left:auto`。**

使用`margin`实现上下左右居中对齐

```css
.father{
    position:relative;
    width:200px;
    height:200px;
}
.son{
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0; // 绝对定位上下左右都有值，为格式化宽度和格式化高度
    width:100px;
    height:100px;
    margin:auto;
}
```

### `margin` 无效的情形

1. `display`值为`inline`，并且是非替换元素的垂直`margin`无效。
2. 表格中的`<tr/>`和`<td/>`元素或者设置`display`值为`table-cell`或`table-row`的元素margin无效.
3. `margin`合并的时候，更改`margin`是无效的。
4. 绝对定位元素非定位方位的`margin`值无效的。

例如：

```css
img{ 
   top:10%; 
   left:30%;
   margin-right:30px; // 无效
}
```
5. 定高容器的子元素的`margin-bottom`或者宽度定死的子元素的`margin-right`的定位无效

```html
<div class='box'>
    <div class='son'></div>
</div>
```
```css
.box{
    height:100px;
}
.son{
    height:80px;
    margin-bottom:10px;
}
```
此时`margin-bottom`失效

```css
.box{
    width:200px;
}
.son{
    width:100px;
    margin-right:10px;
}
```

## `border`属性
> `border-width`不支持百分比

三角等图形绘制
```css
div{
    width:0;
    border: 10 solid;
    border-color: #F40 transparent transparent; // 朝下的三角
}
```

`border`等高效果
```css
.box{
    border-left: 150px solid #eee;
    background-color: #f0f3f9;
}
.box > nav {
    width:150px;
    margin-left: -150px;
    float:left;
}


.box > section{
    overflow:hidden;
}
```
左侧区域是使用`border`来实现的效果。

## 内联元素和流

### `line-height` 和 `vertical-aline`

`baseline` 基线就是字母x下的线    

`line-height` 定义的是2个基线的距离   

`vertical-aline` 默认的值就是`baseline`


`vertical-aline: middle`
**指的是x交叉点的位置，所以使用middle来实现的对齐，其实是不准确的；因为不是所有的盒子布局都和x一样。**

#### 使用`ex`单位来实现文字与小三角对齐

```css
.icon{
    display:inline-block;
    width:20px;
    height:1ex;
    background:url(./image.png);
}
```
**文字的高度本质上是由==行高==决定**


### `vertical-align` 线性类属性值

1、 `inline-block` 与 `baseline`

`vertical-align`属性的默认值`baseline`在文本之类的内联元素就是x的下边缘。  
`inline-block`元素如果里面没有内联元素，或者`overflow`不是`visible`，则`baseline`在`margin`底边缘。

eg: `20px` 图标对齐处理

- 图标高度和当前行高都是`20px`
- 图标标签里面永远没有字符
- 图标`css`不使用`overflow:hidden`

### `vertical-align:top/bottom`

`vertical-align: top`：
    - 内联元素：元素底部和当前行框盒子的顶部对齐（和这一行的最高的内联元素对齐）
    - `table-cell`: 元素底`padding`边缘和表格行的顶部对齐（<td>和<tr>元素的上边缘对齐）
    
`vertical-align: middle` 近似垂直对齐

`vertical-align: text-top/text-bottom` 盒子顶部和父级内容区域的顶部对齐

**父级内容区域** 指的是默认情况下文字【受文字的font-size font-family影响】的背景区域（选择文字出现的背景大小）



## 6 流的破坏和保护

### `float` 本质和特性

本质：实现文字环绕效果（文字环绕图片显示）

特性：包裹性、块状化并格式化上下文、破坏文档流、没有任何的`margin`合并。

利用`float`实现2栏布局

```html
<div class="father">
      <img src="./demo.png" alt="" />
      <p>小白√趣味武器大师大所多说的a</p>
</div>
```
```css
.father{
    overflow:hidden;
}
.father > img {
    width:80px;
    height:90px;
    float:left;
}

p{
    margin-left:90px; // 利用margin 或者border实现右边自适应
}
```

#### 清除浮动
`clear:both`（只有块级元素有效） 的作用本质是让自己不和`float`元素在一行显示，并不是真正意义上的清除浮动，因此`float`元素以下不好的情况依然会出现。

### BFC
> block formatting context 块级格式化上下文。

**块级格式化上下文，内部元素永远不会影响到外部的元素，外部元素也不会影响到内部元**

触发`BFC`的情况：

1. `HTML`根元素
2. `float`的值不是`none`；
3. `overflow` `auto`、`scroll`、`hidden`
4. `display` `table-cell` `table-caption` `inline-block`
5. `position` 不是`relation`和`static`


**`overflow hidden` 裁剪的边界
是`border box`的内边缘**

**可滚动的容器中，Chrome滚动的高度包含`padding-bottom`，Firefox滚动的高度不包含`padding-bottom`**

### 浏览器的滚动条

#### 在`pc`端，无论什么浏览器，默认滚动条都是`html`
#### 滚动条的会占用容器的可用宽高


### 锚点定位行为的触发条件
1. `URL`地址中的锚链与锚点元素对应并有交互行为
2. 可`focus`的锚点元素处于`focus`状态

### 锚点定位的本质

通过改变**容器滚动**高度或者宽度来实现的


### `position:absolute`

1. 不能同时使用`float`

```css
div{
    position:absolute;
    float:left； // 无效
}
```

2. 块状化 （display值就变为block）
3. 块状格式化上下文BFC
4. 包裹性（尺寸收缩、具有自适应性）
```css
div{
    display:inline-block; // 没有必要，自带包裹性
    position:absolute;
}
```

#### 包含块的概念
##### 作用
> 元素用来计算和定位的一个框。

比方说，`width:50`%，也就是宽度一半，那到底是哪个“元素”宽度的一半呢？注意，这里的这个“元素”实际上就是指的“包含块”。

**使用position absolute 可以不用left/top/bottom/right来实现定位，这样元素的位置还在原来的地方**

导航文字右上方图标示意

```css
.icon{
    position:absolute; // 不需要在父级元素设置relative
    margin:-6px 0 0 2px; // 使用margin 来实现定位
    width:28px;
    height:11px;
    background:url(hot.gif);
}
```

这种现象为“无依赖绝对定位”，图标会自动跟在文字后面显示的。

还有许多的应用：表单错误信息 各种图标 下拉列表的定位 （`position:absolute` 不占用文档，突然出现，其他元素位置不会变化）

#### `absolute` 和 `overflow`
> 绝对定位元素不总是被父级overflow属性裁剪，尤其当overflow在绝对定位元素及其包含块之间的时候。

如果`overflow` 不是定位元素，同时绝对定位元素和 `overflow` 容器之间也没有定位元素，则`overflow`无法对`absolute`元素进行剪裁。

如果`HTML`结构被限制无法修改，则利用`overflow`滚动`absolute`元素不滚动的特性来实现表头固定的效果则是上上之选，会让人眼前一亮！

#### `clip` 和 `absolute`

##### `clip` 裁剪属性
裁剪要想起作用，元素必须是绝对定位或者固定定位（`absolute` `fixed`）

语法：
```css
div{
    position:absolute;
    clip:react(20px,20px,10px, 10px);// top->right->bottom->left
}
```

`overflow` 裁剪 `fixed` 定位的属性
对于普通元素或者绝对定位元素，想要对其进行剪裁，我们可以利用语义更明显的`overflow`属性，但是对于`position:fixed`元素，`overflow`属性往往就力不能及了，因为fixed固定定位元素的包含块是根元素，除非是根元素滚动条，普通元素的`overflow`是根本无法对其进行剪裁的

##### `absolute` 的流体特性

对立方向同时发生定位的时候
```css
div{
    position:absolute;
    left:0;
    right:0; // 此时的宽度是包含父级的padding的
}
```

`relative`的最小化影响原则
1. 尽量不要使用`relative`
2. 尽量使用`relative`影响最小

好处：元素的==层叠顺序==提高了，会导致一些绝对定位浮层无论怎么设置`z-index`都会被无效化。


### `position:fixed` 使用`absolute` 实现

```html
<html>
    <body>
        <div class='fixed'></div>
    </body>
</html>

.fixed{
    position:fixed;
}
```

```html
<html>
    <body>
        <div class='page'>固定定位元素</div>
        <div class='fixed'></div>
    </body>
</html>
html,body{
    height:100%;
    overflow:hidden;
}
.page{
    height:100%;
    overflow:auto;
}
.fixed{
    position:absolute;
}
```

### `fixed` 与 背景锁定
> 一般情况下，弹窗的设定都是使用`fixed`来实现的。但是这样就会导致无法覆盖到滚动条，因为`fixed`是基`html`的，`html`出现的滚动条，`fixed`无法干涉

**移动端，可以禁止`touchmove`**

显示时执行
```js
var widthBar = 17, root = document.docuementElement;
if(typeof window.innerWidth == 'number'){
        
        widthBar = window.innerWidth - root.clientWidth;
}
root.style.overflow = 'hidden'; // 滚动锁住
root.style.borderRight = widthBar + 'px solid transparent';   // windows 下 使用border来模拟滚动条
```
隐藏是执行

```js
var root = document.documentElement;
root.style.overflow = '';
root.style.borderRight = '';
```

## `CSS` 世界的层叠规则

指的是当网页中的元素发生层叠是的表现规则

### `z-index`

**只有和定位元素（和flex元素）在一起的时候才有作用**

### 层叠上下文 （stacking context）层叠水平（stacking level）

css2.1年代 层叠顺序

background/border < 负z-index < block块状水平盒子 < float浮动盒子 < inline水平盒子 < z-index:auto/0 < 正z-index

**网页最重要的内容，其次是布局**


### 层叠准则
1. 谁大谁上：当具有明显的层叠水平标识的时候，如生效的z-index属性值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个  
2. 后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素。


### 层叠上下文的特性
1. 层叠上下文的层叠水平要比普通元素高
2. 层叠上下文可以阻断元素的混合模式
3. 层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的层叠上下文
4. 每个层叠上下文和兄弟元素独立，也就是说，当层叠变化或渲染的时候，只需要考虑后代元素
5. 每个层叠商务是自成体系的，当元素发生层叠的时候，整个元素被认为是在父层叠上下文的层叠顺序中

### 层叠上下文创建
1. 根元素
2. z-index（基于定位元素有效position:relative/absolute/fixed）
3. css3属性
    - flex，z-index不为auto
    - opacity不是1
    - transform不是none
    - max-blend-mode不是normal
    - filter不是node
    - isolation是isolate
    - will-change为（opacity、transform、max-blend-mode、filter、isolation）
    - -webkit-overflow-scrolling为touch

那么，新的顺序是：
background/border < 负z-index < block块状水平盒子 < float浮动盒子 < inline水平盒子 < z-index:auto/0不依赖z-index的层叠上下文 < 正z-index


## 强大的文本处理能力

### ex、em、rem
ex是字符x的高度

em就是汉字‘中’的高度

**在CSS中，1em的计算值等同于当前元素所在的font-size计算值，可以将其想象成当前元素中（如果有）汉字的高度。**

rem就是root em

### font-size

