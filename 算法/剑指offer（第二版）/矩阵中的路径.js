/**
 * 矩阵中的路径
 *
 * 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某个字符串所有字符的路径。路径可以从矩阵中的任意一格开始，
 * 每一步可以在矩阵中向左，右，上，下移动一格.
 */
function hasPath(matrix, path) {
  if (!matrix || matrix.length == 0 || !path || path.length === 0) return false;
  var visted = [];
  var rows = matrix[0].length;
  var cols = matrix.length;
  for (var i = 0; i <= rows * cols; i++) {
    visted[i] = false;
  }

  var pathLength = 0;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (hasPathCore(matrix, rows, cols, i, j, path, pathLength, visted)) {
        return true;
      }
    }
  }
  return false;
}

function hasPathCore(matrix, rows, cols, x, y, path, pathLength, visted) {
  if (path.length == pathLength) return true;

  var hasPath = false;
  if (
    x >= 0 &&
    x < rows &&
    y >= 0 &&
    y < cols &&
    matrix[x][y] == path[pathLength] &&
    !visted[x * cols + y]
  ) {
    pathLength++;
    visted[x * cols + y] = true;

    hasPath =
      hasPathCore(matrix, rows, cols, x - 1, y, path, pathLength, visted) ||
      hasPathCore(matrix, rows, cols, x + 1, y, path, pathLength, visted) ||
      hasPathCore(matrix, rows, cols, x, y - 1, path, pathLength, visted) ||
      hasPathCore(matrix, rows, cols, x, y + 1, path, pathLength, visted);
    if (!hasPath) {
      pathLength--;
      visted[x * cols + y] = false;
    }
  }
  return hasPath;
}
