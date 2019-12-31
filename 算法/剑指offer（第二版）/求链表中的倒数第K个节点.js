/**
 * 使用双指针  （快慢指针，快慢指针相差k-1个元素）
 * 
 * 代码的鲁棒性： 1.list为空  2.k的值大于list节点总数  3.k<=0
 */
function List(){
    this.val = val;
    this.next = next;
}

function findK(list,k){
    if(!list || k < 0) return;
    if(k == 0) return list.val;

    var l = list, r = list;
    var count = k - 1;

    while(r.next){
        // 先让r走k-1
        while(count--){
            if(!r.next) return;
            r = r.next;
        }
        if(!r.next) return;
        r = r.next;
        l = l.next;
    }
    return l.val;
}