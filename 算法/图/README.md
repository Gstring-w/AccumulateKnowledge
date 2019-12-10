有向图 存储
> 树是一种特殊的图，与图的存储方式相同;
> 对于无线图中的变ab，存储两条有向变 a->b b->a;
邻接矩阵: g[a][b] 存储边a->b
邻接表: 
```js

var head,e = [], ne = [],idx;
function init(){
    head = -1;
    idx = 0;
}
function insert(a){
    e[idx] = a,ne[idx] = head,head = idx ++;  
}

function add (k,x){
    e[idx] = x;
    ne[idx] = ne[k];
    ne[k] = idx ++; 
}

function remove(k){
    ne[k] = ne[ne[k]];
}

```