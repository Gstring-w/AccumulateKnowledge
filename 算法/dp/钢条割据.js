/**
 * 切割钢条
 * question: 给定一段长度为n英寸的钢条和一个价值表p，求切割方案，使得销售收益最大。
 */

const p = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];

function cut_rod(p, n) {
  if (n == 0) {
    return 0;
  }
  var q = -Infinity;
  for (var i = 1; i <= n; i++) {
    q = Math.max(q, p[i] + cut_rod(p, n - i));
  }
  return q;
}

console.log(cut_rod(p, 4));

/**
 * r[n] = max{pn,r[1] + r[n -1],r[k] + r[n -k],r[n-1] + r[1]}
 *
 * 如果问题和原问题一样，只是问题的规模变小了，就递归
 */

/**
 * 优化写法：自顶向下带备忘的写法
 */
function memeryDp(p, n) {
  const arr = new Array(n).fill(-Infinity);
  return memeryDpCore(p, n, arr);
}

function memeryDpCore(p, n, r) {
  if (r[n] >= 0) {
    return r[n];
  }
  if (n == 0) return 0;
  var q = -Infinity;
  for (var i = 1; i <= n; i++) {
    q = Math.max(q, p[i] + memeryDpCore(p, n - i, r));
  }
  r[n] = q;
  return q;
}

console.log(memeryDp(p, 4));

/**
 * 自底向上
 */

function bottomAp(p, n) {
  const r = new Array(n);
  r[0] = 0;
  for (var j = 1; j <= n; j++) {
    var q = -Infinity;
    for (var i = 1; i <= j; i++) {
      q = Math.max(q, p[i] + r[j - i]);
    }
    r[j] = q;
  }
  return r[n];
}

console.log(bottomAp(p, 4));

/**
 * 记录每次
 */

function recordDp(p, n) {
  var r = new Array(n);
  var s = new Array(n);

  r[0] = 0;
  s[0] = 0;
  for (var j = 1; j <= n; j++) {
    var q = -Infinity;
    for (var i = 1; i <= j; i++) {
      if (q < p[i] + r[j - i]) {
        q = p[i] + r[j - i];
        s[j] = i;
        r[j] = q;
      }
    }
  }
  return [r, s];
}

console.log(recordDp(p, 4));


function print(n){
  const [r,s] = recordDp(p, n);

  while(n > 0){
    console.log(s[n]);
    n = n - s[n];
  }
}

console.log(print(4))