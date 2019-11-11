function div(A, b) {
  var C = [];
  var r = 0;
  for (var i = 0; i < A.length; i++) {
    r = r * 10 + A[i];
    C.push((r / b) | 0);
    r %= b;
  }
  while (C.length > 1 && !C[0]) C.shift();
  return C;
}

console.log(div([1, 3, 4], 2));
