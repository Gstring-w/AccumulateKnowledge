(function(){
    var ContinueSentinel = {};
    var mark = function(fn){
        var gen = Object.create({
            next:function(arg){
                return this._invoke('next',arg)
            }
        })
        fn.prototype = gen;
        return fn;
    }
    var wrap = function(innerFn,outerFn,self){
        var generator = Object.create(outerFn.prototype)
        var context = {
            done: false,
            method: "next",
            next: 0,
            prev: 0,
            sent: undefined,
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

        generator._invoke = makeInvokeMethod(innerFn,context);
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
                if (context.method === "next") {
                    context.sent = context._sent = context.arg;
                }

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

    window.regeneratorRuntime = { mark, wrap}
}())

function _asyncToGenerator(fn){
    return function(){
        var gen = fn.apply(this, arguments)

        return new Promise((resolve,reject)=>{
            function step(key,arg){
                try {
                    var ret = gen[key](arg);
                } catch (error) {
                    reject(arg || error);
                }
                if(ret.done){
                    resolve(ret.value);
                }else {
                    return Promise.resolve(ret.value).then((val)=>{
                        step('next',val)
                    },(reason)=>{
                        step('throw',reason)
                    })
                }
            }
            return step('next');
        })
    }
}


var fetchData = function fetchData(data) {
    return new Promise(function(resolve) {
        return setTimeout(resolve, 1000, data + 1);
    });
};

var fetchValue = (function() {
    var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
            var value1, value2, value3;
            return regeneratorRuntime.wrap(
                function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                _context.next = 2;
                                return fetchData(1);

                            case 2:
                                value1 = _context.sent;
                                _context.next = 5;
                                return fetchData(value1);

                            case 5:
                                value2 = _context.sent;
                                _context.next = 8;
                                return fetchData(value2);

                            case 8:
                                value3 = _context.sent;

                                console.log(value3);

                            case 10:
                            case "end":
                                return _context.stop();
                        }
                    }
                },
                _callee,
                this
            );
        })
    );

    return function fetchValue() {
        return _ref.apply(this, arguments);
    };
})();

fetchValue();