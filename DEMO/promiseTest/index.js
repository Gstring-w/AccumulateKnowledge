var promisesAplusTests = require("promises-aplus-tests");
var adapter = require("./myPromise");

promisesAplusTests(adapter, function(err) {
  console.log(err);
});
