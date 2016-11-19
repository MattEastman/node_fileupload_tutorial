// server.js's 'start' function is initaled by index.js
// start defines which action(handle) will be performed, storing it in pathname, 
// this pathname request is passed to router.js

var http = require("http");
var url = require("url");            
    
// configures url pathname to tell router what to do 
function start(route, handle) {
  function onRequest(request, response) {
      var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
          route(handle,pathname,response,request);
  }
    
//creates server on load
  http.createServer(onRequest).listen(4000);
  console.log("Server has started.");
}
    
exports.start = start;