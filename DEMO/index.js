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

// function LazyMan(name) {
//   console.log("i am " + name);
//   return new lazy();
// }

// lazy.prototype.sleep = time => {
//   return new Promise(res => {
//     setTimeout(() => {
//       res(time);
//       console.log(`等待了${time / 1000}秒`);
//     }, time);
//   });
// };

// LazyMan('name').sleep(1000).sleep(1000);
var isValidSudoku = function (board) {
  var row = [];
  var col = [];
  var box = [];
  for (var i = 0; i < 9; i++) {
    row[i] = [];
    col[i] = [];
    box[i] = [];
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var item = board[i][j];
      if (item === ".") continue;
      if (row[i][item] === undefined) {
        row[i][item] = item;
      } else {
        console.log(box, row, col);
        return false;
      }

      if (col[j][item] === undefined) {
        col[j][item] = item;
      } else {
        console.log(box, row, col);
        return false;
      }

      if (box[parseInt(i / 3) * 3 + parseInt(j / 3)][item] === undefined) {
        box[parseInt(i / 3) * 3 + parseInt(j / 3)][item] = item;
      } else {
        console.log(box, row, col);
        return false;
      }
    }
  }
  console.log(box, row, col);
  return true;
};

console.log(
  isValidSudoku([
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ])
);
