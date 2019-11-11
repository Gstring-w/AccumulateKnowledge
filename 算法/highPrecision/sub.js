/**
 *
 * @param {*} a number[]
 * @param {*} b number[]  a.length >= b.length
 */

function sub(a, b) {
  var t = 0;
  var c = [];
  for (var i = a.length - 1; i >= 0; i--) {
    t = a[i] - t;
    var tmp = a.length - 1 - i;
    if (tmp < b.length) t -= b[tmp];
    c.push((t + 10) % 10);
    t = t < 0 ? 1 : 0;
  }
  while (c.length > 1 && c[0] === 0) c.shift();
  return c;
}
console.log(sub([1, 1, 1], [1, 1, 1]));
