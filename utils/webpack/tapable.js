const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook 
 } = require("tapable");

 class Car {
     constructor(){
         this.hooks = {
             accelerate: new SyncHook(['newSpeed','id']),
             brake:new SyncHook(),
             calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
         }
     }
 }

const myCar = new Car();
 
// Use the tap method to add a consument
myCar.hooks.brake.tap("WarningLampPlugin", () => warningLamp.on());
myCar.hooks.accelerate.tap("LoggerPlugin", (...params) => console.log(params));
myCar.hooks.accelerate.call("WarningLampPlugin",2123);