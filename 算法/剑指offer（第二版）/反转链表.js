/**
 * 反转链表
 * 请实现一个函数，传入一个链表的头结点，反转该链表，并返回反转后链表的头结点
 */

function reverseLink(head) {
  if (!head || !head.next) return head;
  return reverseLinkCore(head);
}
function reverseLinkCore(head) {
  if (head.next.next == null) {
    head.next.next = head;
    return head.next;
  } else {
    const result = reverseLinkCore(head.next);
    head.next.next = head;
    head.next = null;
    return result;
  }
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

console.log(reverseLink(l1));
