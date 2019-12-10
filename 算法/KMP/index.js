// 暴力匹配

function ViolentMatch(s,p){
    var i = 0;
    var j = 0;
    var lenS = s.length;
    var lenP = p.length;

    while(i < lenS && j < lenP){
        if(s[i] == p[j]){
            i ++;
            j ++;
        }else {
            i = i - (j - 1);
            j = 0;
        }
    }
    if(j == lenP){
        return i - j;
    }else {
        return -1;
    }
}

console.log(ViolentMatch('BBC ABCDAB ABCDABCDABDE','ABCDABD'))