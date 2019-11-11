/**
 *  node.js中自带的event
 */
function EventEmitter() {
  this._maxListeners = 10;
  this._events = Object.create(null);
}

// 向事件队列添加事件
// prepend为true表示向事件队列头部添加事件
EventEmitter.prototype.addListener = function (type, listener, prepend) {
  if (!this._events) {
    this._events = Object.create(null);
  }
  if (this._events[type]) {
    if (prepend) {
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }
  } else {
    this._events[type] = [listener];
  }
};

// 移除某个事件
EventEmitter.prototype.removeListener = function (type, listener) {
  if (Array.isArray(this._events[type])) {
    if (!listener) {
      delete this._events[type]
    } else {
      this._events[type] = this._events[type].filter(e => e !== listener && e.origin !== listener)
    }
  }
};

// 向事件队列添加事件，只执行一次
EventEmitter.prototype.once = function (type, listener) {
  const only = (...args) => {
    listener.apply(this, args);
    this.removeListener(type, listener);
  }
  only.origin = listener;
  this.addListener(type, only);
};

// 执行某类事件
EventEmitter.prototype.emit = function (type, ...args) {
  if (Array.isArray(this._events[type])) {
    this._events[type].forEach(fn => {
      fn.apply(this, args);
    });
  }
};

// 设置最大事件监听个数
EventEmitter.prototype.setMaxListeners = function (count) {
  this.maxListeners = count;
};


const eventEmitter = new EventEmitter();

// 监听器 #1
const listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}

// 监听器 #2
const listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}

// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);

// 绑定 connection 事件，调用一次，处理函数为 listener2
eventEmitter.once('connection', listener2);

// 处理 connection 事件 
eventEmitter.emit('connection');

// 处理 connection 事件 
eventEmitter.emit('connection');





/**
 * 实现EventEmitter
 */

