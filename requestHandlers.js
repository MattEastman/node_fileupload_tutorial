// requestHandlers.js is where request actully do things. These request are routed by router.js

// imports querystring module from nodejs library to make output readable for humans
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

// start function
function start(response, postData) { 
  console.log("Request handler 'start' was called.");
  
var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" '+'method="post">' +
    '<input type="file" name="upload" multiple="mulitiple">' +
    '<input type="submit" value="Upload file" />' +
    '</form>'+
    '</body>'+
    '</html>';
    
    response.writeHead(200,{"Content-Type": "text/html"});
    response.write(body);
    response.end();
}


//upload function calls after submit post
function upload(response, request) {
  console.log("Request handler 'upload' was called.");
    
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error,fields,files) {
        console.log("parsing done");
        //possible error on windows system: tried to rename to an already exisiting file

        fs.rename(files.upload.path, "/tmp/test.png", function(error) {
            if (error) {
                fs.unlink("tmp/test.png");
                fs.rename(files.upload.path, "tmp/test.png");
            } 
        });    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Recieved image:<br/>");
    response.write("<img src='/show' />");
    response.end();
    });
}

function show(response) {
    console.log("request handler 'show' was called.");
    response.writeHead(200, {"Content-Type": "text/png"});
    fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;