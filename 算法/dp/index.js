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

console.log(cut_rod(p, 10));


/**
 * r[n] = max{pn,r[1] + r[n -1],r[k] + r[n -k],r[n-1] + r[1]}
 * 
 * 如果问题和原问题一样，只是问题的规模变小了，就递归
 */ 

 