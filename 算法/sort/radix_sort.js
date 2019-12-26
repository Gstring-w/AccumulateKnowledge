/**
 * 基数排序
 */

function radix_sort(arr, d) {
  var radix = new Array(10).fill("-");
  var res = [];
  var count = 1;

  for (var i = 1; i <= d; i++) {
    count *= 10;
    for (var j = 0; j < arr.length; j++) {
      var idx = ((+arr[j] % count) / (count / 10)) | 0;
      if (radix[idx] != "-") {
        radix[idx] = `${radix[idx]}-${+arr[j]}`;
      } else {
        radix[idx] = +arr[j];
      }
    }
    console.log(radix)
    for (var k = 0; k < 10; k++) {
      if (radix[k] !== "-") {
        if (typeof radix[k] == "string") {
          res.push(...radix[k].split("-"));
        } else {
          res.push(radix[k]);
        }
      }
    }

    arr = res;
    res = [];
    radix = new Array(10).fill("-");
  }
  return arr;
}

console.log(radix_sort([73, 22, 93, 43, 55, 14, 28, 65, 39, 81], 2));
