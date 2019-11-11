function bsearch(l, r, n) {
  const eps = 1e-6; // eps 表示精度，取决于题目对精度的要求
  while (r - l > eps) {
    var mid = (l + r) / 2;
    if (mid * mid > n) r = mid;
    else l = mid;
  }
  return [l, r];
}

console.log(bsearch(0, 3, 3));
