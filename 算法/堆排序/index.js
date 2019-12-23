/**
 * 最大堆
 */

var a = [];
var LEFT = i => 2 * i;
var RIGHT = i => 2 * i + 1;
function max_heapify(a, i) {
  var l = LEFT(i);
  var r = RIGHT(i);
  var largest;
  if (l <= a.length && a[l] > a[i]) {
    largest = l;
  } else {
    largest = i;
  }

  if (r <= a.length && a[r] > a[largest]) {
    largest = r;
  }
  if (largest != i) {
    var t = a[i];
    a[i] = a[largest];
    a[largest] = t;
    max_heapify(a, largest);
  }
}

max_heapify(a,0)