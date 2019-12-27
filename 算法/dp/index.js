/**
 * 切割钢条
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
