function dfs(n){
    var path = [], st = [],res = []
    dfsCore(0)
    function dfsCore(u){
        if( u == n){
            res.push(path.slice(0))
            return;
        }

        for(var i = 1; i <= n; i++){
            if(!st[i]){
                path[u] = i;
                st[i] = true;
                dfsCore(u + 1);
                st[i] = false;
            }
        }
    }
    return res
}

console.log(dfs(3))