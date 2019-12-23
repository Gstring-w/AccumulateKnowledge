用于生成数据结构的工具函数

```JS
// 链表
function Link(val){
    this.val = val;
    this.next = next;
}

```

1. 链表的逆置

```js
function reverse(link){
    if(link.next == null) return link;

    if(link.next.next = null){
        link.next.next = link;
        return link.next;
    }else {
        const res = reverse(link.next);
        link.next.next = next;
        link.next = null;
        return res;
    }
}
```