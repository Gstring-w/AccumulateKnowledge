/**
 * 在一个二维数组中，每一行都按照从左到右递增的顺序排列，每一列都按照从上到下递增的顺序排序，请完成一个函数，
 * 输入这样的一个二维数组和一个整数，判断数组中是否含有该整数
 */
const arr = [
  [1, 2, 8, 9],
  [2, 4, 9, 12],
  [4, 7, 10, 13],
  [6, 8, 11, 15]
];

function search(arr, t) {
  if (!arr || arr.length == 0) return;

  var x = 0;
  var y = arr[0].length - 1;

  while (x >= 0 && x < arr.length && y >= 0 && y < arr[0].length) {
    if (arr[x][y] == t) return true;

    if (arr[x][y] > t) {
      y--;
    }
    if (arr[x][y] > t) {
      x++;
    }
  }
  return false;
}
