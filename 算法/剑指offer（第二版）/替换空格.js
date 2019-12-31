/**
 * 替换空格
 * 请实现一个函数，把字符串中的每个空格替换成“%20”,例如：输入“We are happy”，则输出“We%20are%20happy”;
 * 
 * 从后往前  自底向上
 */

function repleace(str){
    var count = 0;
    var words = 0;
    var str = str.split('');
    for(var i = 0 ;i < str.length; i++){
        if(str[i] == ' '){
            count += 2;
        }else {
            words ++;
        }
    }

    var newLen = count + words + 1;

    for(i = str.length - 1;i >= 0; i --){
        if(str[i] == ' '){
            str[newLen--] = '0';
            str[newLen--] = '2';
            str[newLen--] = '%';
        }else {
            str[newLen--] = str[i];
        }
    }
    return str.join('');
}

console.log(repleace('We are happy'))