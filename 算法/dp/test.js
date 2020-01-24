/**
 * 用于测试代码
 */
const p = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];

function dp(p, n) {
  if (n == 0) return 0;
  var q = -Infinity;
  for (var i = 1; i <= n; i++) {
    q = Math.max(q, p[i] + dp(p, n - i));
  }
  return q;
}

console.log(dp(p, 4));

function memeryDp(p, n) {
  const r = new Array(n).fill(-Infinity);
  function memeryDpCore(p, n, r) {
    if (r[n] > 0) return r[n];
    if (n == 0) return 0;
    var q = -Infinity;
    for (var i = 1; i <= n; i++) {
      q = Math.max(q, p[i] + memeryDpCore(p, n - i, r));
    }
    r[n] = q;
    return q;
  }
  return memeryDpCore(p, n, r);
}
console.log(memeryDp(p, 4));

function bottomDp(p, n) {
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

console.log(bottomDp(p, 4));

function recordDpCore(p, n) {
  var r = new Array(n);
  var s = new Array(n);
  r[0] = 0;

  for (var j = 1; j <= n; j++) {
    var q = -Infinity;
    for (var i = 1; i <= j; i++) {
      if (q < p[i] + r[j - i]) {
        q = p[i] + r[j - i];
        r[j] = q;
        s[j] = i;
      }
    }
  }
  return [r, s];
}

function recordDp(p, n) {
  const [r, s] = recordDpCore(p, n);
  console.log("最大收益为：" + r[n]);
  console.log("方案为：");
  while (n > 0) {
    console.log(s[n]);
    n -= s[n];
  } 
 
}

console.log(recordDp(p,9))