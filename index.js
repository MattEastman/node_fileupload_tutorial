// index.js connects to all other js files via require
// It starts server.js on load, pushing two parameters 1) the 'route' function in router.js and 2) the handle array (which calls requesthandlers.js and does actions) 


var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);