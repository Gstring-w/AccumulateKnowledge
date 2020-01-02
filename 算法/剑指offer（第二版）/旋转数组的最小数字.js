/**
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
 * 输入一个递增的数组的一个旋转，输出旋转数组的最小元素
 */

function getMin(arr) {
  if (arr.length == 0) return;

  var l = 0;
  var r = arr.length - 1;
  var mid = l;

  while (arr[l] >= arr[r]) {
    if (l - r === 1) {
      mid = r;
      return mid;
    }
    mid = (l + r) >> 1;
    if (arr[r] == arr[l] && arr[l] == arr[mid] && arr[mid] == arr[r]) {
      return getMinRange(arr, l, r);
    }

    if (arr[l] >= arr[mid]) {
      l = mid;
    }
    if (arr[r] <= arr[mid]) {
      r = mid;
    }
  }

  return arr[mid];
}

function getMinRange(arr, l, r) {
  var res = arr[l];

  for (var i = l; i <= r; i++) {
    if (arr[i] < res) {
      res = arr[i];
    }
  }
  return res;
}
