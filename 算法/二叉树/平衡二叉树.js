function Node(val){
    this.val = val;
    this.left = null;
    this.right = null;
}

/** 
 *        A
 *       / \
 *      B   C
 *    /    / \
 *   D    H   J
 *  /
 * G
 * 平衡二叉树的性质：
 * 1. 左右子树深度之差的绝对值不大于1；
 * 2. 左右子树都是平衡二叉树
 */ 

 var a = new Node('A');
 var b = new Node('B');
 var c = new Node('C');
 var d = new Node('D');
 var g = new Node('G');
 var h = new Node('H');
 var j = new Node('J');
 a.left = b;
 a.right = c;
 c.left = h;
 c.right = j;
 b.left = d;
 b.right = g;

function getDeep(root){
    if(root == null) return 0;
    return Math.max(getDeep(root.left),getDeep(root.right)) + 1;
}

function isBlance(root){
    if(root == null) return true;
    if(Math.abs(getDeep(root.left) - getDeep(root.right)) <= 1){
        return isBlance(root.left) && isBlance(root.right)
    }else {
        return false
    }
}
