/**
 * 现有10000个数字，需要判断数字a是否在这10000个数字之中
 */

var num = [];
var count = 10;
// 随机获得者10000个数字
function getNumber() {
  for (var i = 0; i < count; i++) {
    num[i] = Math.floor(Math.random() * count);
  }
}
getNumber();
console.log(num);

// 暴力搜索
function bf(t) {
  for (var i = 0; i < num.length; i++) {
    if (num[i] == t) {
      return i;
    }
  }
  return false;
}
console.log(bf(100));

// 构造二叉搜索树
function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function addNode(root,val){
    if(!root || root.val == val) return;

    if(val > root.val){
        if(root.left == null) {
            root.left = new Node(val);
        }else {
            addNode(root.left,val)
        }
    }else {
        if(root.right == null) {
            root.right = new Node(val);
        }else {
            addNode(root.right,val);
        }
    }
}


function BST(arr) {
    if(!arr || arr.length == 0) return null;
    var root = new Node(arr[0]);
    for(var i = 0; i < arr.length; i++){
        addNode(root,arr[i])
    }
    return root;
}

var root
console.log(root = BST(num));


function search(root,val){
    if(root.val == val) return true;

    if(val > root.val){
        if(root.left != null){
            return search(root.left,val)
        }else {
            return false 
        }
    } else {
        if(root.right != null){
            return search(root.right,val)
        }else {
            return false 
        }
    }
}

console.log(search(root,1))