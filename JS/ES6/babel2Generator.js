// (function() {
//   var noopObj = {};

//   var mark = function(fn) {
//     var obj = Object.create({
//       next: function(arg) {
//         return this._invoke("start", arg);
//       }
//     });
//     fn.prototype = obj;
//     return fn;
//   };

//   var wrap = function(innerFn, outerFn, self) {
//     var gen = Object.create(outerFn.prototype);
//     var context = {
//       state: "start",
//       prev: 0,
//       next: 0,
//       done: false,
//       abrupt: function(method, arg) {
//         var record = {
//           type: method,
//           arg: arg
//         };
//         return this.complete(record);
//       },
//       complete: function(record) {
//         if (record.type === "return") {
//           this.rval = this.arg = record.arg;
//           this.method = "return";
//           this.next = "end";
//         }

//         return noopObj;
//       },
//       stop: function() {
//         this.done = true;
//         return this.rval;
//       }
//     };
//     gen._invoke = makeInvokeMethod(innerFn, context);
//     return gen;
//   };

//   var makeInvokeMethod = function(innerFn, context) {
//     var state = "start";
//     return function() {
//       if (state === "completed") {
//         return { value: undefined, done: true };
//       }
//       while (1) {
//         state = "executing";

//         var recods = {
//           type: "normal",
//           arg: innerFn.call(this, context)
//         };
//         if (recods.type === "normal") {
//           state = context.done ? "completed" : "yield";
//           if (recods.arg === noopObj) {
//             continue;
//           }
//           return {
//             value: recods.arg,
//             done: context.done
//           };
//         }
//       }
//     };
//   };

//   window.regeneratorRuntime = {};
//   regeneratorRuntime.wrap = wrap;
//   regeneratorRuntime.mark = mark;
// }());


(function (){
    var noop = {};
    var mark = function(outerFn){
        var generator = Object.create({
            next:function(arg){
                return this._invoke('start', arg);
            }
        })
        outerFn.prototype = generator;
        return outerFn;
    };

    var wrap = function(innerFn,outerFn,self){
        var gen = Object.create(outerFn.prototype);
        var context = {
            prev:0,
            next: 0,
            done:false,
            abrupt:function(type,arg){
                return this.complete({
                    type,arg
                })
            },
            complete:function(recods){
                if(recods.type === 'return'){
                    this.rval = recods.arg;
                    this.next = 'end';
                }

                return noop;
            },
            stop:function(){
                this.done = true;
                return this.rval;
            }
        }

        gen._invoke = makeInvokeMethod(innerFn,context);
        return gen;
    };

    var makeInvokeMethod = function(innerFn,context){
        var state = 'start';
        return function(){
            if(state === 'complete') return { value:undefined,done:true}
            while(1){
                state = 'excuting';

                var recods = {
                    type:"normal",
                    arg:innerFn.call(this, context),
                }

                if(recods.type === 'normal'){
                    state = context.done ? 'complete':'yiled';

                    if(recods.arg === noop){
                        continue;
                    }
                    return {
                        value:recods.arg,
                        done:context.done
                    }
                }
            }
        }
    }

    window.regeneratorRuntime = {};
    regeneratorRuntime.wrap = wrap;
    regeneratorRuntime.mark = mark;
}())

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