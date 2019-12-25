## 字符串匹配算法

定义：原字符串 O，需要匹配的字符串 T

1. 暴力匹配
   > 思路：使用2和指针，i，j， 如果匹配了 则i++；j ++; 否则 i= i- (j -1)

```JS
function bf(O,T){
    var oLen = O.length;
    var tLen = T.length;
    if(oLen <= tLen) return O === T ? 0 : -1;

    var i = 0, j = 0;

    while(i < oLen && j < tLen){
        if(O[i++] !== T[j++]){
            i -= j - 1;
            j = 0;
        }
    }
    return j === tLen ? i - j: -1;
}
```
