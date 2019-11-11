// function merge_sort(arr, l, r) {
//   if (l >= r) return;
//   var mid = (l + r) >> 1;
//   merge_sort(arr, l, mid);
//   merge_sort(arr, mid + 1, r);

//   var tmp = [],
//     k = 0,
//     i = l,
//     j = mid + 1;
//   while (i <= mid && j <= r) {
//     if (arr[i] < arr[j]) tmp[k++] = arr[i++];
//     else tmp[k++] = arr[j++];
//   }

//   while (i <= mid) tmp[k++] = arr[i++];
//   while (j <= r) tmp[k++] = arr[j++];

//   for (i = l, j = 0; i <= r; i++, j++) arr[i] = tmp[j];
// }

function merge_sort1(arr, l, r) {
  if (l >= r) return;
  var mid = (l + r) >> 1;
  merge_sort1(arr, l, mid);
  merge_sort1(arr, mid + 1, r);

  var t = [];
  var i = l;
  var j = mid + 1;
  var k = 0;

  while (i <= mid && j <= r) {
    if (arr[i] < arr[j]) t[k++] = arr[i++];
    else t[k++] = arr[j++];
  }

  while (i <= mid) t[k++] = arr[i++];
  while (j <= r) t[k++] = arr[j++];

  for (i = l, j = 0; i <= r; i++, j++) arr[i] = t[j];
}

var arr = [3, 1, 2, 4, 21, 4, 12];
console.log(merge_sort1(arr, 0, 6));
console.log(arr);
