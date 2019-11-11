/**
 *
 * @param {*} a number[]
 * @param {*} b number[]
 */

function add(a, b) {
  if (a.length < b.length) return add(b, a);
  var t = 0;
  var c = [];

  for (var i = 0; i < a.length; i++) {
    t += a[i];
    if (i < b.length) t += b[i];
    c.push(t % 10);
    t = (t / 10) | 0;
  }
  if (t) c.push(1);
  return c;
}

console.log(
  add(
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  )
);
