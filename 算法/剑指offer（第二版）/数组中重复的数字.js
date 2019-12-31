/**
 * 在一个长度为n的数组里的所有数字都在0~n-1的范围内，数组中某些数字是重复的，但不知道有那几个重复了，
 * 也不知道每个数字重复了几次。
 *
 * 1. 先排序，在扫描排序后的数组；
 * 2. 使用空间复杂度为O(N)的哈希表；
 * 3. 如下
 */

function findRepeat(arr) {
  if (arr.length === 0) return false;
  var res;
  for (var i = 0; i < arr.length; i++) {
    while (arr[i] !== i) {
      if (arr[i] !== arr[arr[i]]) {
        res = arr[i];
        return res;
      }
      var t = arr[i];
      arr[i] = arr[arr[i]];
      arr[arr[i]] = t;
    }
  }
  return false;
}

console.log(findRepeat([2, 3, 1, 0, 2, 5, 3]));

/**
 * 不修改原数组找到重复的数字
 * 1. 使用辅助数组 O(n) O(n)
 * 2. 双指针算法    O(nlogN) O(1)   通过中间值 逐步缩小范围，最后找到答案
 */

function getDup(arr) {
  if (arr.length === 0) return;

  var l = 1;
  var r = arr.length - 1; // 双指针算法模板

  while (r >= l) {
    var mid = ((l + r) >> 1) + l;
    var count = getCount(arr, start, end);

    if (l == r) {
      if (count > 1) {
        return r;
      } else {
        break;
      }
    }

    if (count > mid - l + 1) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return -1;
}

function getCount(arr, start, end) {
  if (start < end || arr.length === 0) return 0;

  var count;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] >= start && arr[i] <= end) {
      count++;
    }
  }
  return count;
}
