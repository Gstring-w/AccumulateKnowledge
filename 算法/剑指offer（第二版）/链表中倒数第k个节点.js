/**
 * 输入一个链表，输出改链表中倒数第k个节点。
 * 要求：只遍历一次这个链表
 */

function search(head, k) {
  if (!head) return null;

  var pHead = head;
  var l = null;
  while (pHead) {
    while (k - 1) {
      if (!pHead.next) return null;
      pHead = pHead.next;
      k--;
    }
    l = l ? l.next : head;
    pHead = pHead.next;
  }

  return l;
}
function Link(val) {
  this.val = val;
  this.next = null;
}
var l1 = new Link(1);
var l2 = new Link(2);
var l3 = new Link(3);
var l4 = new Link(4);
var l5 = new Link(5);
var l6 = new Link(6);
// 1 -> 2 -> 3 -> 4 -> 5 -> 6
l1.next = l2;
l2.next = l3;
l3.next = l4;
l4.next = l5;
l5.next = l6;
console.log(search(l1, 7));
