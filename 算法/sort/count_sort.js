/** 
 * 计数排序
 * 假设 n 个输入元素中的每一个都是在0~k之间的一个整数。
 * 
 * 思想：对每一个输入元素x,确定小于x的个数，这样就可以将x提前放入输出数组中的位置了。
 * 
 * 
 * */

function count_sort(arr,k){
    var c = [];
    var b = [];
    for(var i = 0; i < k; i++){
        c[i] = 0;
    }

    for(var j = 0; j < arr.length; j ++){
        c[arr[j]] ++;
    }

    for(var i = 1; i < k; i++){
        c[i] = c[i - 1] + c[i];
    }
    for(var j = arr.length - 1; j >= 0 ;j --){
        b[c[arr[j]] - 1] = arr[j];
        c[arr[j]]--;
    }
    return b;
}

const arr = [3,2,3,9,8,5,6,8,1,1,1,0];

console.log(count_sort1(arr,10))
