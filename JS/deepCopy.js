// 对对象进行深拷贝
// deepin表示拷贝深度 deepin=1表示直接引用 deepin=2 表示浅拷贝 deepin>2表示深拷贝 不填表示递归到底
const deepCopy = (obj, deepin = 1) => {
    let count = 0;
    count = deepin - 1;
    if (count < 1 || count !== count) {
        return obj;
    } else {
        if (typeof obj !== 'object') return obj;
        const newObj = obj instanceof Array ? [] : {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] =
                    typeof obj[key] === 'object'
                        ? deepCopy(obj[key], count)
                        : obj[key];
            }
        }
        return newObj;
    }
};

