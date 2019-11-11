## 概念
### 英寸
> 指的是屏幕对角线的距离，1英寸 = 2.56厘米

### 分辨率
1. 屏幕分辩率
> 屏幕分辩率2688*1242 分别表示在垂直和水平上所具有的像素点数
2. 图片分辨率


### PPI
> 一个英寸内的像素点数

### DPI
> 和PPI表示的意思差不多，这里的点是一个抽象的单位，它可以是屏幕像素点，图片像素点也可以是打印机的墨点

### 设备独立像素
#### 物理像素
> 设备上真实的物理单元

因为不同的设备，物理像素不同，可能会导致在分辩低的手机显示正常，在分辩高的手机会被缩放。

我们必须使用同一种单位来告诉不同分辩率的手机，它们在界面上显示的元素的大小是多少。这个单位就是设备独立像素（ DIP 或 DP ）

### 设备像素比
> dpr，即物理像素和设备独立像素的比值
```JS
// web环境
window.devicePixelRatio

```
```CSS
// web环境css
@media(-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){}
```
```JS
// ReactNative
PixelRatio.get();
```

## 移动端开发
ios单位是pt
android单位是dp
ReactNative是dp

## web端开发
css单位是px 设备独立像素


Retina屏:在普通的使用距离下，人的肉眼无法分辩单个的像素点

P和K单位的概率
P 代表的就是屏幕纵向的像素个数
K 代表屏幕横向有几个1024个像素

## 视口
### 布局视口（layout viewport）
> 当我们以百分比来指定一个元素的大小时，它的计算值由这个元素的包含块来计算的。当这个元素是顶级的元素时，它就是基于布局视口来计算的。

在pc浏览器上，布局视口就等于当前浏览器的窗口大小（不包括border,margin,滚动条）

在移动端，布局视口被赋予一个默认值，大部分为980px,这保证pc的网页可以在手机浏览器上呈现，但是非常小

```JS
document.documentElement.clientWidth/clientHeight
```

### 视觉视口（visual viewport）
> 用户通过屏幕真实看到的区域

视觉视口默认等于当前浏览器的窗口大小（包括滚动条宽度）
当用户对浏览器进行缩放时，不会改变布局视口的大小，所以页面是不变的，但是缩放会改变视觉视口的大小

所以，布局视口会限制你的css布局，而视觉视口决定用户具体能看到什么

```JS
window.innerWidth/innerHeight;
```
### 理想视口(ideal viewport)
> 布局视口在移动端展示的效果并不是一个理想的效果，所以理想视口就诞生了：网站页面在移动端展示的理想大小

页面的缩放系数=css像素/设备独立像素

所以当页面的缩放比例为100%时，css像素=设备独立像素，理想视口=视觉视口

实际上

页面的缩放系数=理想视口宽度按/视觉视口宽度

```JS
screen.width/height // 来获取理想视口的大小
```

## meta viewport

<meta> 它可以告诉浏览器如何解析页面

可以借助<meta>元素的viewport来帮组我们设置视口，缩放等，从而让移动端得到更好的展示效果
```HTML
<meta name='viewport' content='width=device-with,inital-scale=1;maximum-scale=1;minmun-scale=1;user-scalable=no;'>
```
浏览器api
 
```window.innerHeight```  浏览器视觉视口高度（包括滚动条）

```window.outerHeight```  浏览器窗口外部的高度。表示整个浏览器窗口的高度，包括侧边栏，窗口镶边和调正窗口大小的边框

```window.screen.Height``` 屏幕理想视口高度，数值固定 设备的分辨率/设备像素比

```window.screen.availHeight``` 浏览器窗口可用的高度

```document.documentElement.clientHeight``` 布局视口高度，包括内边距，但不包括垂直滚动条，边框和外边框

```document.documentElement.offsetHeight```  包括内边距，滚动条，边框和外边框

```document.documentElement.scrollHeight``` 在不使用滚动条的情况下适合视口中的所有内容所需的最小宽度。

