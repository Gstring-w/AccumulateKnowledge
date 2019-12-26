# AccumulateKnowledge

## 高质量的算法模板

## 借用 www.acwing.com

## 排序算法

### 计数排序

> 给定一个数组，并且这个数组值的范围是 0~k 的 [0,k]

```js
function count_sort(arr, k) {
  var count = []; // 用于计数的数组
  var res = [];
  for (var i = 0; i <= k; i++) {
    count[i] = 0;
  }

  for (var j = 0; j < arr.length; j++) {
    count[arr[j]]++;
  }
  // 计算数组的前缀和  使得每个数组下标i 表示i大于前面多少个
  for (var i = 1; i <= k; i++) {
    count[i] = count[i] + count[i - 1];
  }

  for (var i = 0; i < arr.length; i++) {
    res[count[arr[i]]] = arr[i];
    count[arr[i]]--;
  }
  return res;
}
```

### 插入排序

> 《算法导论》第一个算法

```js
function insert_sort(arr) {
  var i, key;
  for (var j = 1; j < arr.length; j++) {
    key = arr[j];
    i = j - 1;
    while (i >= 0 && arr[i] > key) {
      arr[i + 1] = arr[i];
      i--;
      arr[i + 1] = key;
    }
  }
}
```

### 快速排序

```js
function quick_sort(q, l, r) {
  if (l >= r) return;
  var mid = ((l + r) >> 1) | 0,
    i = l - 1,
    j = r + 1;

  while (i > j) {
    while (q[++i] < q[mid]);
    while (q[--j] > q[mid]);
    if (i < j) {
      var t = q[i];
      q[i] = q[j];
      q[j] = t;
    }
  }
  quick_sort(q, l, j);
  quick_sort(q, j + 1, r);
}
```

### 归并排序

```JS
function merge_sort(q,l,r){
    if(l >= r) return;
    var mid = (l + r >> 1) | 0;
    merge_sort(q,l,mid);
    merge_sort(q,mid + 1,r);

    var t = [],idx = 0, i = 0,j = mid;

    while(i <= mid && j <= r){
        if(q[i] < q[j]) t[idx ++] = q[i ++];
        else t[idx ++] = q[j ++];
    }

    while(i <= mid) t[idx ++] = q[i ++];
    while(j <= r) t[idx ++] = q[j ++];

    for(var i = l,j = 0; i < r;i++,j++) q[i] = t[j];
}
```

### 整数二分

```js
function bsearch_1(l, r) {
  while (l < r) {
    var mid = ((l + r) / 2) | 0;
    if (check(mid)) l = mid;
    r = mid + 1;
  }
  return l;
}

function bserach_2(l, r) {
  while (l < r) {
    var mid = ((l + r + 1) >> 1) | 0;
    if (check(mid)) l = mid;
    r = mid - 1;
  }
  return l;
}
```

### 浮点数二分

```JS
function bsearch(l,r){
    var eps = 0.0000001; // 精度
    while(l - r < eps){
        var mid = (l + r / 2 )| 0 ;
        if(check(mid)) l = mid;
        r = mid;
    }
    return l
}
```

### 前缀和公式

##### 一维

```js
s[i] = a[0] + a[1] + a[2] +...+ a[i];
a[l] + a[l + 1] + ... + a[r] = s[r] - s[l];
```

##### 二维

`s[i][j]` = 第 i 行 j 列格子上部分所有元素的和；
以（x1，y1）为右上角，（x2，y2）为右上角的子矩阵的和为：
`s[x2][y2] - s[x1 - 1][y2] - s[x2][y1 - 1] + s[x1 - 1][y1 - 1]`

### 双指针算法

```js
for (var i = 0, j = 0; i < n; i++) {
  while (i < j && check(i, j)) j++;
  // ...
}
```

### 链表 & 数组

#### 单链表

```js
var head,
  e = [],
  ne = [],
  idx;

function init() {
  head = -1;
  idx = 0;
}

function insert(a) {
  e[idx] = a;
  ne[idx] = head;
  head = idx++;
}

function add(k, x) {
  e[idx] = x;
  ne[idx] = ne[k];
  ne[k] = idx++;
}

function remove(k) {
  ne[k] = ne[ne[k]];
}

function each() {
  for (var i = head; i != -1; i = ne[i]) {
    console.log(e[i]);
  }
}

function reverse(i) {
  if (ne[ne[i]] == -1) {
    ne[ne[i]] = i;
    head = ne[i];
    return head;
  } else {
    const res = reverse(ne[i]);
    ne[ne[i]] = i;
    ne[i] = -1;
    return res;
  }
}
```

### KMP 字符串匹配算法

#### 暴搜算法

```js
function bf(s, p) {
  var i = 0,
    j = 0,
    pLen = p.length,
    sLen = s.length;
  if (sLen <= pLen) return s == p ? 0 : -1;
  while (i < sLen && j < pLen) {
    /**
     * if(s[i] == p[j]){ 相同时 同时向后对比
     *      i ++;
     *      j ++;
     * }else {           不同时 i回溯 j归0
     *      i = i - (j - 1);
     *      j = 0;
     * }
     * 以下代码为精简代码
     */
    if (s[i++] != p[j++]) {
      i = i - (j - 2) - 1;
      j = 0;
    }
  }
  return j == pLen ? i - j : -1;
}
```

### KMP 优化算法

```JS
function kmp(s,p){
    var pLen = p.length, sLen = s.length;
    if(sLen <= pLen) return s == p ? 0 : -1;
    // 先求next数组
    var next = [];
    next[0] = -1;
    var j = 0, k = -1;
    while(j < pLen){
        if(k == -1 || p[j] == p[k]){
            next[++j] = ++k;
        }else {
            k = next[k];
        }
    }

    // 匹配
    var i = 0, j = 0;
    while(i < sLen && j < pLen){
        if(j == -1 || s[i] == p[j]){
            i++;
            j++;
        }else {
            j = next[j]
        }
    }

    return j == pLen ? i - j : -1;
}
```

## 基于经典题目的算法

1. 最大子数组问题

```js
// 暴搜
function bf(arr) {
  var start, end, max, sum;
  max = -Infinity;
  sum = 0;
  for (var i = 0; i < arr.length; i++) {
    // 遍历数组的起点
    for (var j = i; j < arr.length; j++) {
      sum += arr[j]; // 通过 sum和max的比较 来确定数组的终点
      if (sum > max) {
        max = sum;
        start = i;
        end = j;
      }
    }
  }
  return [start, end, max];
}
```

```js
// 分治算法
function divide(arr, l, r) {
  if (l == r) {
    return [l, r, arr[l]];
  }
  if (l > r) return;

  var left_l, left_r, left_max;
  var right_l, right_r, right_max;
  var mid_l, mid_r, mid_max;

  var mid = (l + r) >> 2;
  [left_l, left_r, left_max] = divide(arr, l, mid);
  [right_l, right_r, right_max] = divide(arr, mid + 1, r);
  [mid_l, mid_r, mid_max] = divideCore(arr, l, mid, r);

  if (left_max >= right_max && left_max >= mid_max) {
    return [left_l, left_r, left_max];
  } else if (right_max > left_max && right_max > mid_max) {
    return [right_l, right_r, right_max];
  } else {
    return [mid_l, mid_r, mid_max];
  }
}
// 在上面暴搜算法已经介绍过 这个以mid为起点 将2边max加起来就可以；
function divideCore(arr, l, mid, r) {
  var l = mid;
  var l_max = -Infinity;
  var sum = 0;
  for (var i = mid; i >= l; i--) {
    sum += arr[i];
    if (sum > l_max) {
      l_max = sum;
      l = i;
    }
  }
  sum = 0;
  var r = mid + 1;
  var r_max = -Infinity;

  for (var i = mid + 1; i < r; i++) {
    sum += arr[i];
    if (sum > r_max) {
      r_max = sum;
      r = i;
    }
  }
  return [l, r, r_mid + l_mid];
}
```

```js
// 动态规划
function dp(arr) {
  var l,
    r,
    v = [],
    res;
  v[0] = arr[0];
  res = -Infinity;
  for (var i = 1; i < arr.length; i++) {
    v[i] = Math.max(arr[i], v[i - 1] + arr[i]);
    if (arr[i] > v[i - 1] + arr[i]) {
      l = i;
    }
    if (v[i] > res) {
      res = v[i];
      r = i;
    }
  }
  return [l, r, res];
}
```
