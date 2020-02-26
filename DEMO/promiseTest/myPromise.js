const PENDING = Symbol("pending"),
  RESOLVE = Symbol("resolve"),
  REJECTED = Symbol("rejected");

const executorCallStack = function(stack) {
  if (stack.length === 0) return;
  stack.forEach(item => {
    item();
  });
};

const resolvePromise = function(promise, result, resolve, reject) {
  if (promise === result) return reject(new TypeError("禁止套娃"));
  let called;

  if (
    result !== null &&
    (typeof result === "function" || typeof result === "object")
  ) {
    try {
      var then = result.then;
      if (typeof then === "function") {
        then.call(
          result,
          val => {
            if (called) return;
            called = true;
            resolvePromise(promise, val, resolve, reject);
          },
          reason => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        resolve(result);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(result);
  }
};

class Promise {
  constructor(executor) {
    const _this = this;
    _this.status = PENDING;
    _this.resolveCallStack = [];
    _this.rejectCallStack = [];
    const onResolve = function(data) {
      if (_this.status === PENDING) {
        _this.status = RESOLVE;
        _this.data = data;
        executorCallStack(_this.resolveCallStack);
      }
    };

    const onReject = function(reason) {
      if (_this.status === PENDING) {
        _this.status = REJECTED;
        _this.reason = reason;
        executorCallStack(_this.rejectCallStack);
      }
    };

    try {
      executor.call(_this, onResolve, onReject);
    } catch (reason) {
      onReject(reason);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : reason => {
            throw reason;
          };
    let newPromise = null;
    if (this.status === PENDING) {
      newPromise = new Promise((resolve, reject) => {
        this.resolveCallStack.push(() =>
          setTimeout(() => {
            try {
              const ret = onFulfilled(this.data);
              resolvePromise(newPromise, ret, resolve, reject);
            } catch (error) {
              reject(error);
            }
          })
        );
        this.rejectCallStack.push(() =>
          setTimeout(() => {
            try {
              const ret = onRejected(this.reason);
              resolvePromise(newPromise, ret, resolve, reject);
            } catch (error) {
              reject(error);
            }
          })
        );
      });
    } else if (this.status === RESOLVE) {
      newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const ret = onFulfilled(this.data);
            resolvePromise(newPromise, ret, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    } else if (this.status === REJECTED) {
      newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const ret = onRejected(this.reason);
            resolvePromise(newPromise, ret, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
    return newPromise;
  }
}

Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise(function(resolve, reject) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
