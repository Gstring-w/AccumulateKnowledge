function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
/**
 * 比较2颗树的不同
 *                      A
 *                    /  \
 *                  B     C
 *                /  \   / \
 *               D    E F   G
 *
 *                      A
 *                    /  \
 *                  B     C
 *                /  \   / \
 *               D    E F   G
 * return diffList [param]
 * @param 1. {type:"新增",origin:null,now: Node}
 *        2. {type:"修改",origin: Node1,now:Node2}
 *        3. {type:"删除",origin:Node,now:null}
 */
var root1 = new Node('A');
var b = new Node('B');
var c = new Node('C');
var d = new Node('D');
var e = new Node('E');
var f = new Node('F');
var g = new Node('G');
root1.left = b;
root1.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;


var root2 = new Node('A');
var b2 = new Node('B');
var c2 = new Node('H');
var d2 = new Node('D');
var e2 = new Node('E');
var f2 = new Node('0');
var g2 = new Node('G');
root2.left = b2;
root2.right = c2;
b2.left = d2;
b2.right = e2;
c2.left = f2;
c2.right = g2;


function diff(root1, root2, diffList) {
  if (root1 == null && root2 == null ) return diffList;

  if (root1 == null && root2 != null) {
    diffList.push({ type: "新增", target: null, now: root1 });
    return diffList
  } else if (root1 != null && root2 == null) {
    diffList.push({ type: "删除", target: root1, now: null });
    return diffList
  } else if (root1 != null && root2 != null && root1.val != root2.val) {
    diffList.push({ type: "修改", target: root1, now: root2 });
    diff(root1.left, root2.left, diffList);
    diff(root1.right, root2.right, diffList);
    return diffList
  }
  diff(root1.left, root2.left, diffList);
  diff(root1.right, root2.right, diffList);
}

var arr = []
diff(root1,root2,arr);
console.log(arr)