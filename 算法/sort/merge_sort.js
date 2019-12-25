/**
 * 归并排序
 * 分治思想
 * 
 * 1. 先分解成若干个和原来一样的小问题，问题一样，只是规模小了
 * 2. 处理这些个规模足够小的问题，比如 数组只有2个元素，这样就可以排序了
 * 3. 合并； 这里使用一个数组来记录每次改变的区间
 */
function merge_sort(arr, l, r) {
  if (l >= r) return;    // 使问题的区间足够小
  var mid = (l + r) >> 1;
  merge_sort(arr, l, mid);
  merge_sort(arr, mid + 1, r); // 分解问题

  var tmp = [],               // 问题足够小了，便可以处理，这里使用一个辅助数组来记录修改的区间
    k = 0,                    // 思路：一开始解决只有2个元素的数组，将2个元素的数组排好序
    i = l,
    j = mid + 1;
  while (i <= mid && j <= r) {
    if (arr[i] < arr[j]) tmp[k++] = arr[i++];
    else tmp[k++] = arr[j++];
  }

  while (i <= mid) tmp[k++] = arr[i++];
  while (j <= r) tmp[k++] = arr[j++];

  for (i = l, j = 0; i <= r; i++, j++) arr[i] = tmp[j];
}

var arr = [3, 1, 2, 4, 21, 4, 12];
console.log(merge_sort(arr, 0, 6));
console.log(arr);
