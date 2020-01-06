/**
 * 在O(1)的时间内删除链表的节点
 * 只能删除head节点后的节点
 */


function remove(head){
    if(!head) return;

    if(head.next){
        head.next = head.next.next;
    }
}