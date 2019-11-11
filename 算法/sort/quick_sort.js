function quick_sort(arr, l, r) {
  if (l >= r) return;

  var x = arr[(l + r) >> 1];
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
