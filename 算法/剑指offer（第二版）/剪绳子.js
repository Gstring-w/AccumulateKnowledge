/**
 * 给你一根长度为n的绳子，请把绳子剪成m段(m,n都是整数，n>1&m>1)
 * 
 * 首先定义函数f(n)为把长度为n的绳子剪成若干段各段长度乘积的最大值，在剪第一刀的时候，我们有n-1种可能的选择，
 * 也就是第一段可能长度为1，2，n-1  f(n) = Max(f(i) * f(n-i));
 */

function maxProductAfterCutting_solution(length){
    if(length < 2) return 0;

    if(length == 2) return 1;

    if(length == 3) return 2;

    var fn = [];
    fn[0] = 0;
    fn[1] = 1;
    fn[2] = 2;
    fn[3] = 3;

    var max = 0;
    for(var i = 4; i < length; i++){
        max = 0;
        for(var j = 1; j <= i / 2; ++j){
            var tmp = fn[j] * fn[i - j];
            if(max < tmp){
                max = tmp;
            }
            fn[i] = max;
        }
    }
    max = fn[length - 1];
    return max;
}   

/**
 * 贪婪算法
 * 
 * 当n>=5时，我们尽可能多剪长度为3的绳子；当剩下的绳子长度为4时，把绳子奖惩两段长度为2的绳子。
 */

function maxProductAfterCutting_solution2(len){
    if(len < 2) return 0;

    if(len == 2) return 1;

    if(len == 3) return 2;

    var timesOf3 = len / 3 | 0;

    if(len - timesOf3 * 3 === 1){
        timesOf3 -= 1;
    }
    var timesOf2 = (len - timesOf3 * 3) /2;
    return Math.pow(3,timesOf3) * Math.pow(2,timesOf2)
}