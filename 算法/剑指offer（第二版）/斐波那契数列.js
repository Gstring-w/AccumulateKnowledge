
const MOD = Math.pow(2,53);


// 1. 简单递归
function f1(n){
    if(n <= 1) return 1;
    return  (f(n - 1) + f(n - 2) ) % MOD
}


// 2. 记忆化搜索
var a = []
function f2(n){
    if(a[n]) return a[n];
    if(n <= 1) return 1;
    a[n] = (f(n -1) + f(n - 2) ) % MOD;
    return a[n]
}



// 3. 非递归算法
function f3(n){
    var a = [];
    a[0] = a[1] = 1;
    for(var i = 2; i < n + 1; i++){
        a[i] = a[i - 2] + a[i -1] 
        a[i] %= MOD
    }
    return a[n];
}


// 4. 递推+滚动变量
function f4(n){
    var a0 = 1,a1 = 1;
    var res = 0;
    for(var i = 2; i <= n; i++){
        res += a0 + a1;
        a0 = a1;
        a1 = res;
    }
    return res;
}


// 5. 矩阵计算 + 快速幂
