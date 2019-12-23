// 链表的逆置
function Link(val) {
  this.val = val;
  this.next = null;
}
/*
Link     [1,2,3,4,5,6,7];
*/
const link = new Link(1);
const link2 = new Link(2);
const link3 = new Link(3);
const link4 = new Link(4);
const link5 = new Link(5);
const link6 = new Link(6);
const link7 = new Link(7);
link.next = link2;
link2.next = link3;
link3.next = link4;
link4.next = link5;
link5.next = link6;
link6.next = link7;

// console.log(reverse(link));
function reverse(link) {
  if (link.next == null) return link;

  if (link.next.next == null) {
    link.next.next = link;
    return link.next;
  } else {
    const res = reverse(link.next);
    link.next.next = link;
    link.next = null;
    return res;
  }
}

// 快速排序

function quick_sort(arr, l, r) {
  if (l >= r) return;
  const mid = ((l + r) / 2) | 0;
  let i = l - 1;
  let j = r + 1;

  while (i < j) {
    while (arr[++i] < arr[mid]);
    while (arr[--j] > arr[mid]);
    if (i < j) {
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
  }
  quick_sort(arr, l, j);
  quick_sort(arr, j + 1, r);
}
// let a = [0, 2, 3, 4, 1, 8, 4, 1, 10];
// quick_sort(a, 0, a.length - 1);
// console.log(a);

// 深度优先遍历
// 前序遍历
function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
var a = new Node("a");
var b = new Node("b");
var c = new Node("c");
var d = new Node("d");
var e = new Node("e");
var f = new Node("f");

/**
        a
       / \
    b     e
  /  \  /  
 d    c f
 */
a.left = b;
a.right = e;
e.left = f;
b.left = d;
b.right = c;
function before(root) {
  if (!root) return;
  console.log(root.val);
  before(root.left);
  before(root.right);
}

function mid(root) {
  if (!root) return;
  mid(root.left);
  console.log(root.val);
  mid(root.right);
}

function after(root) {
  if (!root) return;
  after(root.left);
  after(root.right);
  console.log(root.val);
}
// a b d c e f
console.log(mid(a));

// 非递归方式

function before1(root) {
  var stack = [];
  var list = [];
  if (root != null) {
    stack.push(root);
    while (stack.length !== 0) {
      var tr = stack.pop();
      if (tr.right != null) {
        stack.push(tr.right);
      }
      if (tr.left != null) {
        stack.push(tr.left);
      }
      list.push(tr.val);
    }
  }
  return list;
}

function mid1(root) {
  if (!root) return;
  var stack = [root];
  var list = [];
  var head = root;
  while (head || stack.length !== 0) {
    if (head) {
      stack.push(head);
      head = head.left;
    } else {
      head = stack.pop();
      list.push(head.val);
      head = head.right;
    }
  }
  return list;
}

console.log(mid1(a));
