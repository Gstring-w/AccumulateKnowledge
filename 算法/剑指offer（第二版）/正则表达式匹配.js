/**
 * 正则表达式匹配
 * 请实现一个函数用来匹配包含'.'和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而’*‘表示他前面的字符
 * 可以出现任一次
 */

function match(str, pattern) {
  if (str.length == 0 || pattern.length == 0) return;

  /**
   * 实现一个函数，该函数将返回true or false
   */
  return matchCore(str, pattern, 0, 0);
}

function matchCore(str, pattern, strIdx, patternIdx) {
  if (str.length == strIdx && pattern.length == patternIdx) return true;

  if (str.length != strIdx && pattern.length == patternIdx) return false;

  // 字符后面为*
  if (pattern[patternIdx + 1] == "*") {
    if (
      pattern[patternIdx] == str[strIdx] ||
      (pattern[patternIdx] == "." && strIdx != str.length)
    ) {
      /**
       * 当前模式匹配 （因为当前子问题和原问题一致，只是规模变小了【递归】； 因为有多种情况，只要一种情况出现即可，使用||连接 ）
       * 1. 当前模式影响后面字符的匹配，停留在当前str匹配位置，pattern不动。
       *
       *                            /  前面字符出现1次
       * 2. 当前模式不影响后面字符的匹配
       *                           \   前面字符出现n次（n > 1）
       *  */

      return (
        matchCore(str, pattern, strIdx, patternIdx + 2) ||
        matchCore(str, pattern, strIdx + 1, patternIdx + 2) ||
        matchCore(str, pattern, strIdx + 1, patternIdx)
      );
    } else {
      // 后面是*号 当前不匹配（包括.符号匹配） 跳过该字符： 表示前面的字符出现0次
      return matchCore(str, pattern, strIdx, patternIdx + 2);
    }
  }
  // 当前字符为.  和 当前字符相等
  if (
    pattern[patternIdx] == str[strIdx] ||
    (pattern[patternIdx] == "." && strIdx != str.length)
  ) {
    return matchCore(str, pattern, strIdx + 1, patternIdx + 1);
  }
  // 后面字符不是* 当前字符不是. 当前字符不相等
  return false;
}

console.log(match("aaa", "ab*ac*a"));
