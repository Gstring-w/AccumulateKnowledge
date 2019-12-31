/**
 * 输入一个链表的头节点，从尾到头反过来打印出每个几点的值。
 */

function List(val){
    this.val = val;
    this.next = next;
}

/**
 * 非递归
 */
function print(list){
    if(!list) return;
    var stack = [];
    var head = list;

    while(head){
        stack.push(head.val);
        head = head.next;
    }

    while(stack.length !== 0){
        console.log(stack.pop());
    }
}

/**
 * 递归
 */
function print1(list){ 
    if(!list) return;
    if(!list.next) return list.val;
    console.log(print1(list.next));
}
