// 暴力匹配
function ViolentMatch(s, p) {
  var i = 0,
    j = 0,
    pLen = p.length,
    sLen = s.length;
  while (i < sLen && j < pLen) {
    if (s[i++] != p[j++]) {
      i -= j - 1;
      j = 0;
    }
  }
  return j == pLen ? i - j : -1;
}

console.log(ViolentMatch("BBC ABCDABABCDABCDABDE", "ABCDABD"));

// KMP 求next数组
function KMP(s, p) {
  var pLen = p.length,
    sLen = s.length;
  if (sLen <= pLen) return s == p ? 0 : -1;
  // 先求next数组
  var next = [];
  next[0] = -1;
  var j = 0,
    k = -1;
  while (j < pLen) {
    if (k == -1 || p[j] == p[k]) {
      next[++j] = ++k;
    } else {
      k = next[k];
    }
  }

  // 匹配
  var i = 0,
    j = 0;
  while (i < sLen && j < pLen) {
    if (j == -1 || s[i] == p[j]) {
      i++;
      j++;
    } else {
      j = next[j];
    }
  }
  return j == pLen ? i - j : -1;
}
console.log(KMP("BBC ABCDABABCDABCDABDE", "ABCDABD"));
