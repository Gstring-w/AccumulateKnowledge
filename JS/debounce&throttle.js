/**
 * debounce & throttle 都是函数调用频率的控制器
 */
// 最终版，要求是否立即执行，对this的绑定，参数，返回值， 添加取消
function debounce(func, wait, immediate) {
  var timeout, result;

  var debounced = function() {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

/**
 *
 * @param {*} func
 * @param {*} wait
 * @param {*} options
 */
function throttle(func, wait, options = {}) {
  if (!options.leading && !options.trailing) options = {}; // 处理同为false，程序出现bug的情况
  var result,
    context,
    args,
    timeout,
    previous = 0;
  var later = () => {
    previous = !options.leading ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = () => {
    var now = new Date().getTime();
    if (!previous && !options.leading) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && !options.trailing) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
  throttled.cancel = () => {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  };
  return throttled;
}


