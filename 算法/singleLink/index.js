// head 储存链表头 e 储存节点的值， ne 储存next指针，idx表示到了哪个节点
var head,
  e = [],
  ne = [],
  idx;

function init() {
  head = -1;
  idx = 0;
}

function insert(a) {
  e[idx] = a;
  ne[idx] = head;
  head = idx++;
}
