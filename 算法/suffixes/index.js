/**
 * 一维的前缀和
 * s[i] = a[0] + a[1] + a[2] + ... + a[n]
 * 要求在[l,r] 区间之间的和，利用前缀和
 * a[l] + a[l + 1] + ... + a[r] = s[l] - s[r];
 *
 * 开闭区间都可以
 */

function toSum(arr, l, r) {
  var s = [0]; // 构建出一个前缀和
  var res;
  for (var i = 0; i < arr.length; i++) {
    var tmp = s[i - 1] ? s[i - 1] : 0;
    s[i] = arr[i] + tmp;
  }
  res = s[r] - s[l - 1];
  return res;
}

console.log(toSum([1, 2, 3, 4, 5], 2, 3));

/**
 * 二维前缀和
 * s[i,j] = 为第i列 第j行左上部分的和
 * 前缀和求和公式
 * s[i,j] = a[i][j] + s[i - 1][j] + s[i][j - 1] - s[i -1][j - 1]
 *
 * 以(x1, y1)为左上角，(x2, y2)为右下角的子矩阵的和为：
 * S[x2, y2] - S[x1 - 1, y2] - S[x2, y1 - 1] + S[x1 - 1, y1 - 1]
 */
