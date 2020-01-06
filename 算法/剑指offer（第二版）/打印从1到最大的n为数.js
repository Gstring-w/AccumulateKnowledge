/**
 * 输入数字n,按顺序打印出从1到最大的n位十进制数。
 */

function print(n) {
  var arr = new Array(n).fill(9);
  while (isPrint(arr)) {
    arr = printCore(arr);
    console.log(printFormat(arr));
  }
}

function isPrint(arr) {
  if (arr.length == 0) return false;
  var res = true;
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      count++;
    }
  }
  if (count == arr.length) {
    return false;
  }
  return res;
}

function printCore(arr) {
  if (arr.length == 0) return new Array(arr.length).fill(0);
  var res = [...arr];
  var len = arr.length - 1;

  while (arr[len] == 0) {
    res[len] = 9;
    len--;
  }
  res[len]--;

  return res;
}

function printFormat(arr) {
  if (arr.length === 0) return 0;
  var res = "";
  var idx = 0;
  while (9 - arr[idx] == 0) {
    idx++;
  }
  while (arr.length - idx) {
    res += 9 - arr[idx];
    idx++;
  }
  return res == "" ? 0 : res;
}

console.log(print(3));
