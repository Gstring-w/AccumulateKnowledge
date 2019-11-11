/**
 *
 * @param {*} a 为一个大数
 * @param {*} b 为一个可以使用js表示的数
 */

function mul(A, b) {
  var t = 0;
  var C = [];
  for (var i = A.length - 1; i >= 0 || t; i--) {
    if (i >= 0) t += A[i] * b;
    C.unshift(t % 10);
    t = (t / 10) | 0;
  }
  while (C.length > 1 && !C[0]) C.shift();
  return C;
}

console.log(mul([9, 2, 3, 4, 5, 5, 5], 8));
