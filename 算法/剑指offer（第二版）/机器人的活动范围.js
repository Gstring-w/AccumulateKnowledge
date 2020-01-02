/**
 * 机器人的活动范围
 *
 * 地上有一个m * n 的方格。一个机器人从坐标（0，0）的格子开始移动，它每次可以向左，右，上，下移动一格，但不能
 * 进入行坐标和列坐标的数位之和大于k的格子。
 */

function moveCount(k, cols, rows) {
  if (!k || k <= 0) return 0;

  var visited = [];
  for (var i = 0; i < cols * rows; i++) {
    visited[i] = false;
  }

  return moveCountCore(k, cols, rows, 0, 0, visited, 0);
}

function moveCountCore(k, cols, rows, x, y, visited) {
  var count = 0;

  if (check(k, cols, rows, x, y, visited)) {
    visited[x * cols + y] = true;
    count =
      1 +
      moveCountCore(k, cols, rows, x - 1, y, visited) +
      moveCountCore(k, cols, rows, x + 1, y, visited) +
      moveCountCore(k, cols, rows, x, y - 1, visited) +
      moveCountCore(k, cols, rows, x, y + 1, visited);
  }
  return count;
}

function check(k, cols, rows, x, y, visited) {
  if (
    x >= 0 &&
    x < rows &&
    y >= 0 &&
    y < cols &&
    !visited[x * cols + y] &&
    getDigitSum(x) + getDigitSum(y) <= k
  ) {
    return true;
  }
  return false;
}
function getDigitSum(x) {
  var sum = 0;

  while (x > 0) {
    sum += x % 10;
    x = (x / 10) | 0;
  }
  return sum;
}
