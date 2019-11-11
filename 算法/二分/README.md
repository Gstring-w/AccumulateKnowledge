## 浮点数二分应用

1. 求平方根（或者立方根）

```JS

function bsearch(l,r,n){
    var eps = 1e-6;
    while(r-l > eps){
        var mid = (l + r) /2;
        if(mid * mid < n) l = mid;
        else r = mid
    }
    return l
}

bsearch(0,3,3) // 前面2个为范围 后面1个为目标数

```
