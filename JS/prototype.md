```JS
Function.__proto__ === Function.prototype // true
Object.__proto__ === Function.prototype  // true

// Function作为一个内置对象，是运行前就已经存在的东西，所以根本就不会根据自己生成自己，所以就没有什么鸡生蛋蛋生鸡，就是鸡生蛋。至于为什么Function.__proto__ === Function.prototype，我认为有两种可能：一是为了保持与其他函数一致，二是就是表明一种关系而已。
// 简单的说，我认为：就是先有的Function，然后实现上把原型指向了Function.prototype，但是我们不能倒过来推测因为Function.__proto__ === Function.prototype，所以Function调用了自己生成了自己。
```