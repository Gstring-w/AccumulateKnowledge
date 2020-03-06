function getAll(arr) {
  const promise = arr.map(item => {
    return Promise.resolve(item);
  });

  return new Promise((resolve, reject) => {
    promise.forEach(item => {
      try {
        item.then(val => {
          resolve(val);
        });
      } catch (error) {
        reject(error);
      }
    });
  });
}

// const cb = time =>
//   new Promise(resolve => {
//     setTimeout(() =>{
//         resolve(time)
//     }, time * 1000);
//   });

// const arr = [cb(1), cb(2), cb(3), cb(4), cb(5), cb(6), cb(7), cb(8)];

// getAll(arr).then(val => {
//   console.log(val);
// });

// function Person() {}
// const person = new Person();

// console.log(person)



Number.prototype.add = function(num){
    return this + num;
}
console.log((10).add(10).add(10))
