var head,e = [], ne = [],idx;
function init(){
    head = -1;
    idx = 0;
}
function insert(a){
    e[idx] = a,ne[idx] = head,head = idx ++;  
}

function add (k,x){
    e[idx] = x;
    ne[idx] = ne[k];
    ne[k] = idx ++; 
}

function remove(k){
    ne[k] = ne[ne[k]];
}

function each(){
    for(var i = head; i != -1; i = ne[i]){
        console.log(e[i])
    }
}
init();
insert('a')
insert('b')
insert('c')
insert('d')
insert('e')


each()
function reverse(i){
    if(ne[ne[i]] == -1){
        ne[ne[i]] = i;
        head = ne[i];
        return head;
    }else {
        var res = reverse(ne[i]);
        ne[ne[i]] = i;
        ne[i] = -1;
        return res
    }
}
add(2,'GG')
// remove(2);
reverse(head)
each()
