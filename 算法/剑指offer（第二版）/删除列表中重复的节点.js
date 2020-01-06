/**
 * 删除链表中重复的节点
 * 在一个排序的链表中，如何删除重复的节点？
 *
 * 存在疑点：如果节点重复，是删除全部的重复节点，还是删除重复节点，并保留一个节点？
 */

// 删除重复节点，并保留一个节点
function deleteRepeat(head) {
  if (!head || !head.next) return;

  var last = head;
  var next = head.next;

  while (next) {
    if (last.val === next.val) {
      deleteCore(last);
    } else {
      last = last.next;
    }
    next = next.next;
  }
  return head;
}

function deleteCore(head) {
  if (!head) {
    return;
  }
  if (head.next) {
    head.next = head.next.next;
  }
}

// 只要存在重复节点  就都删除

function deleteAll(head) {
  if (!head || !head.next) return;

  var pHead = head;
  var flag = false;
  while (pHead.next && pHead.val === pHead.next.val) {
    pHead = pHead.next;
    flag = true;
  }
  pHead = flag ? pHead.next : pHead;

  if (!pHead || !pHead.next) return pHead;
  var start = pHead;

  var cur = pHead.next;
  var last = pHead;

  while (cur) {
    var f = false;

    while (cur.next && cur.val === cur.next.val) {
      cur = cur.next;
      f = true;
    }
    if (f) {
      last.next = cur;
      deleteCore(last);
    }
    last = cur;
    cur = cur.next;
  }
  return head;
}

function Link(val) {
  this.val = val;
  this.next = null;
}

var l1 = new Link(1);
var l2 = new Link(2);
var l3 = new Link(2);
var l4 = new Link(3);
var l5 = new Link(4);
var l6 = new Link(4);

l1.next = l2;
l2.next = l3;
l3.next = l4;
l4.next = l5;
l5.next = l6;
console.log(deleteAll(l1));
