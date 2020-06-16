/**
 * 快速排序
 * 思路：先在大方向解决，先将原数组分成2个乱序的数组，但是这2个乱序的数组，都是大于或小于中间值
 */
function quick_sort(arr, l, r) {
  if (l >= r) return;
  var x = arr[l];
  var i = l - 1;
  var j = r + 1;
  while (i < j) {
    while (arr[++i] < x);
    while (arr[--j] > x);
    if (i < j) {
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
  }
  quick_sort(arr, l, j);
  quick_sort(arr, j + 1, r);
}

/**
 * q: 求第k个数
 */

function findK(arr, l, r, k) {
  if (l >= r) return arr[l];

  var mid = (l + r) >> 1;
  var i = l - 1;
  var j = r + 1;
  while (i < j) {
    while (arr[++i] > arr[mid]);
    while (arr[--j] < arr[mid]);
    if (i < j) {
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
  }
  var sl = j - l + 1;
  if (k >= sl) {
    return findK(arr, mid + 1, r, k - sl);
  } else {
    return findK(arr, l, mid, k);
  }
}

var arr = [1, 4, 5, 6, 3, 4, 201, 20, 34];

console.log(quick_sort(arr, 0, arr.length - 1), arr);
