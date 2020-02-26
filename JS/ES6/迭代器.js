// var slice = Array.prototype.slice;

// function co(gen){
//     var ctx = this;
//     var args = slice.call(arguments,1);

//     return new Promise((resolve,reject)=>{
//         if(typeof gen === 'function') gen = gen.apply(ctx,args);
//         if(gen || typeof gen.then === 'undefined') return resolve(gen);

//         onFulfilled();
//         function onFulfilled(res){
//             var ret
//             try {
//                 ret = gen.next(res);
//             } catch (e) {
//                 reject(e);
//             }
//             next(ret);
//             return null;
//         }

//         function onRejected(res){
//             var ret;
//             try {
//                 ret = gen.next(res);
//             } catch (e) {
//                 reject(e)
//             }
//             next(ret);
//             return null;
//         }

//         function next(ret){
//             if(ret.done) return resolve(ret.value);
//             return Promise.resolve(ret.value).then(onFulfilled,onRejected)
//         }
//     })
// }



// /**
//  * 我们就称呼这个版本为简单编译版本吧
//  */
// var _marked = /*#__PURE__*/ regeneratorRuntime.mark(helloWorldGenerator);

// function helloWorldGenerator() {
//   return regeneratorRuntime.wrap(
//     function helloWorldGenerator$(_context) {
//       while (1) {
//         switch ((_context.prev = _context.next)) {
//           case 0:
//             _context.next = 2;
//             return "hello";

//           case 2:
//             _context.next = 4;
//             return "world";

//           case 4:
//             return _context.abrupt("return", "ending");

//           case 5:
//           case "end":
//             return _context.stop();
//         }
//       }
//     },
//     _marked,
//     this
//   );
// }

(function() {
    var ContinueSentinel = {};
  
    var mark = function(genFun) {
      var generator = Object.create({
        next: function(arg) {
          return this._invoke("next", arg);
        }
      });
      genFun.prototype = generator;
      return genFun;
    };
  
    function wrap(innerFn, outerFn, self) {
      var generator = Object.create(outerFn.prototype);
  
      var context = {
        done: false,
        method: "next",
        next: 0,
        prev: 0,
        abrupt: function(type, arg) {
          var record = {};
          record.type = type;
          record.arg = arg;
  
          return this.complete(record);
        },
        complete: function(record, afterLoc) {
          if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          }
  
          return ContinueSentinel;
        },
        stop: function() {
          this.done = true;
          return this.rval;
        }
      };
  
      generator._invoke = makeInvokeMethod(innerFn, context);
  
      return generator;
    }
  
    function makeInvokeMethod(innerFn, context) {
      var state = "start";
  
      return function invoke(method, arg) {
        if (state === "completed") {
          return { value: undefined, done: true };
        }
  
        context.method = method;
        context.arg = arg;
  
        while (true) {
          state = "executing";
  
          var record = {
            type: "normal",
            arg: innerFn.call(self, context)
          };
  
          if (record.type === "normal") {
            state = context.done ? "completed" : "yield";
  
            if (record.arg === ContinueSentinel) {
              continue;
            }
  
            return {
              value: record.arg,
              done: context.done
            };
          }
        }
      };
    }
  
    window.regeneratorRuntime = {};
  
    regeneratorRuntime.wrap = wrap;
    regeneratorRuntime.mark = mark;
  })();
  
  var _marked = regeneratorRuntime.mark(helloWorldGenerator);
  
  function helloWorldGenerator() {
    return regeneratorRuntime.wrap(
      function helloWorldGenerator$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return "hello";
  
            case 2:
              _context.next = 4;
              return "world";
  
            case 4:
              return _context.abrupt("return", "ending");
  
            case 5:
            case "end":
              return _context.stop();
          }
        }
      },
      _marked,
      this
    );
  }
  
  var hw = helloWorldGenerator();
  
  console.log(hw.next());
  console.log(hw.next());
  console.log(hw.next());
  console.log(hw.next());