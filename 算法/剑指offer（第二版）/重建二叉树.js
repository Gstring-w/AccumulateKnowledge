/**
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树
 */

function Tree(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function rebuildTree(prevSort, midSort) {
  if (prevSort.length === 0 || midSort.length === 0) return null;
  var head = prevSort[0];

  var midLeftIdx = midSort.indexOf(head);
  var midLeft = midSort.slice(0, midLeftIdx);
  var midRight = midSort.slice(midLeftIdx + 1);

  var prevLeft = prevSort.slice(1, midLeft.length);
  var prevRight = prevSort.slice(midLeft.length);

  var Node = new Tree(head);
  Node.left = rebuildTree(prevLeft, midLeft);
  Node.right = rebuildTree(prevRight, midRight);

  return Node;
}
