本次测试的Chrome版本：`80.0.3987.149（正式版本） （64 位）`
# 预备知识

在Chrome浏览器中打开内存快照，进入控制台界面，找到Memory，点击`take snapshot`

# 对象属性的遍历顺序

```js
var demo = {};
demo.name = 'name';
demo.age = 'age';
demo[0] = 0;
demo[1] = 1;
demo[2] = 2;

for(var prop in demo){
    console.log(demo[prop]);
}
```

输出上述示例代码，控制台依次出现

```javascript
0
1
2
name
age
```
出现了数字部分的属性从小到大依次排序，而`name age` 属性确没有发生这个现象，这是因为Chrome遵守着ESMAScript规范【可索引的属性，必须按照从小到大依次排序】

在Chrome这个版本中

