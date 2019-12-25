function insert_sort(arr){
    var i
    for(var j = 1; j < arr.length; j++){
        var key = arr[j];
        i = j -1;
        while(i >=0 && arr[i] > key){
           arr[i + 1] = arr[i];
           i --;
           arr[i + 1] = key;
        }
    }
}

var arr = [1,2,2,3,4,5,1,8,4,6,3]
insert_sort(arr);

console.log(arr)