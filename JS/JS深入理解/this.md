只有函数调用才会产生执行上下文，而执行上下文包括 VO [[scope]] this

js 中有三种可以执行的代码

1. 全局代码（global code）
2. eval 代码（eval code）
3. 函数（function code）

整个流程为

[this] = [函数的调用] -> [产生 ref, ref=执行函数的部分表达式]

然后通过判断 ref 类型，来确定 this 的指向

[ref] => [ref 为 reference 类型？] => ref 是 Environment Recode => ref=undefined(不是严格模式下为 window)

ref 不是 reference 类型 => ref=undefined

ref 不是 Environment Record => 执行 GetBase(ref)
