function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
/**
 * 二叉树 --- 有向无环图
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
var root1 = new Node("A");
var b = new Node("B");
var c = new Node("C");
var d = new Node("D");
var e = new Node("E");
var f = new Node("F");
var g = new Node("G");
root1.left = b;
root1.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;

var root2 = new Node("A");
var b2 = new Node("B");
var c2 = new Node("H");
var d2 = new Node("D");
var e2 = new Node("E");
var f2 = new Node("0");
var g2 = new Node("G");
root2.left = b2;
root2.right = c2;
b2.left = d2;
b2.right = e2;
c2.left = f2;
c2.right = g2;

function diff(root1, root2, diffList) {
  if (root1 == null && root2 == null) return diffList;

  if (root1 == null && root2 != null) {
    diffList.push({ type: "新增", target: null, now: root1 });
    return diffList;
  } else if (root1 != null && root2 == null) {
    diffList.push({ type: "删除", target: root1, now: null });
    return diffList;
  } else if (root1 != null && root2 != null && root1.val != root2.val) {
    diffList.push({ type: "修改", target: root1, now: root2 });
    diff(root1.left, root2.left, diffList);
    diff(root1.right, root2.right, diffList);
    return diffList;
  }
  diff(root1.left, root2.left, diffList);
  diff(root1.right, root2.right, diffList);
}

// var arr = [];
// diff(root1, root2, arr);
// console.log(arr);

/**
 *  扩展为diffDom 比较2个DOM树的变化
 * */
function DOM(val) {
  this.val = val;
  this.children = [];
}
/**
<div>
    <span />   
    <p>
        <h1 />
    </p>
    <b></b>
<div>


<div>
    <span />   
    <p></p>
    <b></b>
    <h1 />
<div>
*/

var dom1 = new DOM("div");
var span = new DOM("span");
var p = new DOM("p");
var h1 = new DOM("h1");
var b = new DOM("b");

dom1.children.push(span);
dom1.children.push(p);
dom1.children.push(b);
p.children.push(h1);

var dom2 = new DOM("div");
var span2 = new DOM("span");
var p2 = new DOM("p");
var h12 = new DOM("h1");
var b2 = new DOM("b");

dom2.children.push(span2);
dom2.children.push(p2);
dom2.children.push(b2);
dom2.children.push(h12);

function diffDom(dom1, dom2, diffList, context = null) {
  if (dom1 == null && dom2 == null) return diffList;

  if (dom1 == null && dom2 != null) {
    diffList.push({ type: "add", origin: null, now: dom2, context });
    return diffList;
  } else if (dom1 != null && dom2 == null) {
    diffList.push({ type: "remove", origin: dom1, now: null, context });
    return diffList;
  } else if (dom1 != null && dom2 != null && dom1.val != dom2.val) {
    diffList.push({ type: "change", origin: dom1, now: dom2, context });

    var len = Math.max(dom1.children.length, dom2.children.length);
    for (var i = 0; i < len; i++) {
      diffDom(dom1.children[i], dom2.children[i], diffList, dom2);
    }
    return diffList;
  }

  var len = Math.max(dom1.children.length, dom2.children.length);
  for (var i = 0; i < len; i++) {
    diffDom(dom1.children[i], dom2.children[i], diffList, dom2);
  }
}

var arr = [];
diffDom(dom1, dom2, arr);
console.log(arr);


/**
 * 也可以扩展为 deepEq lodash中的deepEq函数
 */