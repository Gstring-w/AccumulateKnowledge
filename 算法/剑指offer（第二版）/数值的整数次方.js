/**
 * 数值的整数次方
 */

function pow(base, exponent) {
  if (base == 0 || exponent == 0) return 0;
  if (exponent == 1) return base;

  var symbol = exponent > 0;
  function powCore(base, exponent) {
    if (base == 0 || exponent == 0) return 0;
    if (exponent == 1) return base;

    var result = powCore(base,exponent >> 1);
    if(exponent % 2 == 0){
        return result * result;
    }else {
        return result * result * base;
    }
  }
  return symbol ? powCore(base, exponent) : 1 / powCore(base, exponent);
  
}
