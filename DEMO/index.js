// function sum(...args) {
//   args = args.length == 0 ? [] : args;
//   var len = args.length;
//   var res = 0;
//   args.forEach(item => (res += item));
//   var _sum = function(...arg1) {
//     arg1 = arg1.length == 0 ? [] : arg1;
//     len = arg1.length + len;
//     arg1.forEach(item => (res += item));
//     if (arg1.length === 0) {
//       return res;
//     }
//     return _sum;
//   };
//   return _sum;
// }

// console.log(sum(1, 2, 3)());
// console.log(sum(1)(2)(3)());

// const { push } = Array.prototype;
// Array.prototype.push = function(...args) {
//   console.log("arr push");
//   push.call(this,...args);
// };

// const arr = [1,2,3];
// arr.push(4,4,5,6,6);
// console.log(arr)