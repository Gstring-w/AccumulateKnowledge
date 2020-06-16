/**
 * 高精度加法
 */

function add(a, b) {
  if (a.length < b.length) return add(b, a);

  var res = [];
  var t = 0;
  for (var i = 0; i < a.length; i++) {
    t += a[i];
    if (b.length > i) t += b[i];
    res.push(t % 10);
    t = parseInt(t / 10);
  }
  if (t) res.push(t);
  return res.reverse();
}

console.log(add([1], [1, 2, 3, 4, 5, 9]));
