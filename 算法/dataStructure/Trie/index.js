var son = [],cnt = [],idx = 0;
// 0号点既是根节点，又是空节点
// son[][]存储树中每个节点的子节点
// cnt[] 存储以每个节点结尾的单词数量

// 插入一个字符串
function insert(str){
    var p = 0;
    for(var i = 0; str[i]; i++){
        typeof son[p] == 'object' ? '' : son[p] = [];
        var u = str[i].charCodeAt();
        if(!son[p][u]) son[p][u] = ++ idx;
        p = son[p][u];
    }
    cnt[p] = p;
}

// 查询字符串出现的次数
function query(str){
    var p = 0;
    for(var i = 0; str[i]; i++){
        var u = str[i].charCodeAt();
        if(!son[p][u]) return 0;
        p = son[p][u];
    }
    return cnt[p]
}
