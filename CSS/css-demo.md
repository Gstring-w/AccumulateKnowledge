记录《css世界》中提到的场景

1. 文字少的时候居中，文字多的时候右对齐

```css
.box{
    text-align:center;
}
.content{
    display:inline-block;
    text-align:left;
}
```

2. 凹凸效果

```css
.ao{
    display:inline-block;
    width:0;
}
.ao:before{
    content:'love 我 you';
    outline:2px solid #f40;
    color:#fff;
}
```

3. 利用inline-block 最大宽度实现的图片横向滑动

```html
<div class="box">
    <img src="./demo.png" alt="" />
    <img src="./demo.png" alt="" />
    <img src="./demo.png" alt="" />
    <img src="./demo.png" alt="" />
    <img src="./demo.png" alt="" />
</div>
```
```css
.box{
    white-space:nowrap;
    overflow-x:auto;
    width:100px;
}
img{
    width:50px;
    height:50px;
}
```

4. 图片（未知大小）的左右半区分别点击上一张、下一张

```html
 <div class="box">
      <img src="./demo.png" alt="" />
      <div class="left"></div>
      <div class="right"></div>
</div>
```
```css
.box {
  display: inline-block;
  position: relative;
}

.left,
.right {
  top: 0;
  position: absolute;
  height: 100%;
  border: 1px solid #000;
  width: 50%;
}
.left {
  left: 0;
}
.right {
  right: 0;
}
```

5. 利用max-height 实现展开内容（大小未知）动画

```css
.element {
  max-height: 0;
  overflow: hidden;
  transition: max-height .25s;
}
:checked ~ .element {
  max-height: 666px;
}
```

6. 基于伪元素渲染图片内容生成技术

```css
img::after{
    content:attr(alt);
    position:absolute;
    bottom:0;
    width:100%;
    transform: translateY(100%);
    transition: transform 0.25s;
}

img:hover::after{
    transform:translateY(0);
}
```

7. 正在加载中... 动画实现

```html
正在加载中<dot>...</dot>
```
```css
dot {
  display: inline-block;
  height: 1em;
  line-height: 1;
  text-align: left;
  vertical-align: -0.25em;
  overflow: hidden;
}
dot::before {
  display: block;
  content: "...\A..\A.";
  white-space: pre-wrap;
  animation: dot 3s infinite step-start both;
}
@keyframes dot {
  33% {
    transform: translateY(-2em);
  }
  66% {
    transform: translateY(-1em);
  }
}
```

