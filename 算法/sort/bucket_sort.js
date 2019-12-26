/**
 * 桶排序
 */

function bucket_sort(arr) {
  var n = arr.length;
  var b = [];
  var res = [];
  for (var i = 0; i < n; i++) {
    b[i] = [];
  }

  for (var i = 0; i < n; i++) {
    b[(n * arr[i]) | 0].push(arr[i]);
  }
  for (var i = 0; i < n; i++) {
    b[i] = b[i].sort((a, b) => a - b);
    res.push(...b[i]);
  }
  return res;
}


/**
 * 算法时间复杂度
 * 即使输入的数据不服从均匀分布，桶排序也仍可以线性时间内完成。只要输入数据满足以下性质：
 * 所有桶的大小的平方与总的元素呈线性关系。
 */
console.log(bucket_sort([0.79, 0.13, 0.16, 0.64, 0.39, 0.2, 0.89]));
