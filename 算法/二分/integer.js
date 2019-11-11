function check(x) {
  /* ... */
} // 检查x是否满足某种性质
// 区间[l, r]被划分成[l, mid]和[mid + 1, r]时使用：
function bsearch_1(l, r) {
  while (l < r) {
    var mid = (l + r) >> 1;
    if (check(mid)) r = mid;
    // check()判断mid是否满足性质
    else l = mid + 1;
  }
  return l;
}
// 区间[l, r]被划分成[l, mid - 1]和[mid, r]时使用：
function bsearch_2(l, r) {
  while (l < r) {
    var mid = (l + r + 1) >> 1;
    if (check(mid)) l = mid;
    else r = mid - 1;
  }
  return l;
}

/**
 * 注： 先不管mid是否需要+1，先从满足条件，然后划分的范围，是否需要+1
 */
