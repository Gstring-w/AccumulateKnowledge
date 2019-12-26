// 数组 A 中的和最大的非空连续子数组。
/**
 * 普通暴力算法
 */
function finMax(arr) {
  var max = -Infinity;
  var sum = 0;
  var l, r;
  for (var i = 0; i < arr.length; i++) {
    for (var j = i; j < arr.length; j++) {
      sum += arr[j];
      if (sum > max) {
        max = sum;
        l = i;
        r = j;
      }
    }
  }
  return [l, r, max];
}

/**
 *  分治策略
 * 1. 分解：将问题划分成一个子问题，子问题和原问题一样，只是规模更小
 * 2. 解决：递归的求解问题，如果子问题的规模足够小，则停止递归，直接求解
 * 3. 合并：将子问题的解合成原问题的解
 *  */

const cross_mid = (arr, l, mid, r) => {
  var left_idx = 0;
  var left_max = -Infinity;
  var sum = 0;

  for (var i = mid; i > l; i--) {
    sum += arr[i];
    if (sum > left_max) {
      left_max = sum;
      left_idx = i;
    }
  }
  i = mid + 1;
  sum = 0;

  var right_idx = 0;
  var right_max = -Infinity;
  for (; i < r; i++) {
    sum += arr[i];
    if (sum > right_max) {
      right_max = sum;
      right_idx = i;
    }
  }
  return [left_idx, right_idx, left_max + right_max];
};

function search_max(arr, l, r) {
  var left_l, left_r, left_max;
  var right_l, right_r, right_max;
  var mid_l, mid_r, mid_max;
  if (l == r) {
    return [l, r, arr[l]];
  } else {
    var mid = ((l + r) / 2) | 0;
    [left_l, left_r, left_max] = search_max(arr, l, mid);
    [right_l, right_r, right_max] = search_max(arr, mid + 1, r);
    [mid_l, mid_r, mid_max] = cross_mid(arr, l, mid, r);
  }

  if (left_max >= right_max && left_max >= mid_max) {
    return [left_l, left_r, left_max];
  } else if (right_max > left_max && right_max > mid_max) {
    return [right_l, right_r, right_max];
  } else {
    return [mid_l, mid_r, mid_max];
  }
}
// var arr = [-11, -3, -23, -10, -19, -1];
// console.log(search_max(arr, 0, arr.length - 1));

/**
 *  解析
 * 在求最大的子数组时，可以将其分为3种情况
 * 1. 在mid的左边
 * 2. 在mid的右边
 * 3. 跨域中mid点
 *
 * 因为1，2子问题都是求最大子数组，和原题一样，因此只有递归就可以，关键是跨越中点的
 */

/**
 * 动态规划
 */

function find_max(arr) {
  var max = arr[0];
  var v = [arr[0]];
  var l, r;
  for (var i = 1; i < arr.length; i++) {
    v[i] = Math.max(arr[i], v[i - 1] + arr[i]);
    if (arr[i] > v[i - 1] + arr[i]) {
      l = i;
    }
    if (v[i] > max) {
      max = v[i];
      r = i;
    }
  }
}

function dp(arr) {
  var l,
    r,
    res = -Infinity,
    max = [];

  max[0] = arr[0];
  for (var i = 1; i < arr.length; i++) {
    max[i] = Math.max(arr[i], max[i - 1] + arr[i]);
    if(arr[i] > max[i - 1] + arr[i]){
      l = i;
    }
    if(max[i] > res){
      res = max[i];
      r = i;
    }
  }
  return [l,r,res];
}

var arr = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7];
