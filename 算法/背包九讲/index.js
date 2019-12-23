/**
 * 01背包问题
 * 题目：有N件物品和一个容量为V的背包。第i件物品的费用是c[i]，价值是w[i],求解将哪些物品装入背包可使价值总和最大。
 *                  集合
 *               /
 *       状态表示
 *    /         \
 * Dp             属性
 *   \
 *      状态计算  -- 集合划分 ( 含不含 i )
 *                 /    \
 *              包含i   不含i
 * f[i][v] = max{f[i - 1][v], f[i -1][v-c[i]] + w[i]};
 */

function max(N, V, c, w) {
  var f = [];
  for (var i = 1; i <= N; i++) {
    for (var v = V; v >= 0; v--) {
      f[v] = Math.max(f[v], f[v - c[i]] + w[i]);
    }
  }
  return f;
}

// 一维数组解决01背包问题

function max1(N, V, c, w) {
  var f = [];
  for (var i = 1; i <= name; i++) {
    ZeroOnePack(c[i], w[i]);
  }
  function ZeroOnePack(cost, weight) {
    for (var v = v; v >= 0; v--) {
      f[v] = Math.max(f[v], f[v - cost] + weight);
    }
  }
}


/**
 * 完全背包问题
 * f[i][v] = max{f[i - 1][v - k * c[i]] + k * w[i]}   0 <= k * c[i] <= v
 */

function max2(){
    for(var i = 1; i <= N; i++){
        for(var v = 0; v < V; V++){
            f[v] = Math.max(f[v],f[v - c[i]] + w[i])
        }
    }
}