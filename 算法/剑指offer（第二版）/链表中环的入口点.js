/**
 * 链表中环的入口点
 *
 * 如果一个链表存在环，请找出环的入口点。
 *
 * 思路：使用快慢指针，快指针走2步，慢指针走1步，如果快指针指向null，则不存在环
 * 如果快指针等于慢指针，则存在环。这时记录下该节点，再次遍历走一圈，直到遇到该环，
 * 就知道环中的节点了
 */

function findEntrance(head) {
  if (!head) return "不存在";

  var slow = head,
    fast = head;
  var flag = 1;
  var ringLink = null;

  while (fast) {
    fast = fast.next;
    if (fast && fast.val === slow.val) {
      ringLink = fast;

      break;
    }
    if (flag < 0) {
      slow = slow.next;
    }
    flag *= -1;
  }
  if (!ringLink) return "不存在";

  var n = 0;
  var copyLink = ringLink;

  while (1) {
    if (ringLink.next.val == copyLink.val) {
      break;
    }
    n++;
    ringLink = ringLink.next;
  }
  return search(head, n);
}

function search(head, k) {
  if (!head) return null;

  var r = head;
  for (var i = 0; i < k + 1; i++) {
    r = r.next;
  }
  var l = head;

  while (l.val != r.val) {
    l = l.next;
    r = r.next;
  }
  return r;
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
//            ______________
//           |             |
// 1 -> 2 -> 3 -> 4 -> 5 -> 6
l1.next = l2;
l2.next = l3;
l3.next = l4;
l4.next = l5;
l5.next = l6;
l6.next = l1;

console.log(findEntrance(l1));
