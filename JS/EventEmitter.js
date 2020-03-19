class EventEmitter {
  constructor() {
    this.event_map = {};
  }
  /**
   *
   * @param {*} key Event type
   * @param {*} callback Event callback
   * @param {*} flag 添加的方向
   */
  addListener(key, callback, flag = true) {
    if (
      this.event_map[key] &&
      this.event_map[key].length === EventEmitter.MAX_LISTENERS
    )
      throw Error("超过最大时间监听数");
    if (!this.event_map[key]) {
      this.event_map[key] = [];
    }
    if (flag) {
      this.event_map[key].push(callback);
    } else {
      this.event_map[key].unshift(callback);
    }
  }

  removeListener(key) {
    if (!this.event_map[key]) return;
    this.event_map[key] = [];
  }

  removeAllListener() {
    this.event_map = Object.create(null);
  }

  once(key, callback) {
    var newCallback = (...args) => {
      var result = callback.call(this, ...args);
      var list = this.event_map[key];
      this.event_map[key] = list.filter(item => !item.once && item.key !== key);
      return result;
    };
    newCallback.once = true;
    newCallback.type = key;

    this.addListener(key, newCallback);
  }

  emit(key, ...args) {
    var callList = this.event_map[key];
    if (callList.length === 0) return;
    var result = []
    callList.forEach(item =>{
      result.push(item.call(this, ...args))
    });
    return result;
  }
}
EventEmitter.MAX_LISTENERS = 10;

const eventEmitter = new EventEmitter();

// 监听器 #1
const listener1 = function listener1() {
  console.log("监听器 listener1 执行。");
  return 1;
};

// 监听器 #2
const listener2 = function listener2() {
  console.log("监听器 listener2 执行。");
  return 2
};

// 绑定 connection 事件，处理函数为 listener1
eventEmitter.addListener("connection", listener1);

// 绑定 connection 事件，调用一次，处理函数为 listener2
eventEmitter.once("connection", listener2);

// 处理 connection 事件
console.log(eventEmitter.emit("connection"));

// 处理 connection 事件
console.log(eventEmitter.emit("connection"));
