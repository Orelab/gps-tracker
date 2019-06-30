var fs = require('fs');


exports.isHTTP = function isHTTP(request){
    return request.substring(0,3)==='GET';
}


exports.extractURL = function extractURL(request){
    var first_line = request.split("\r")[0].split(' ')[1];

    if( first_line=="/" ){
        first_line = "/index.html";
    }
    return first_line;
}


exports.response = function response(file, socket){

    fs.readFile('./public'+file, 'utf8', function(err, contents){

        if( typeof contents==='undefined' ){
            return;
        }

        var headers = "HTTP/1.1 200 OK\r\n"
            + "Server: GPS Tracker\r\n"
            + "Content-Length: " + (contents.length+2) + "\r\n"
            + "Content-Type: text/html\r\n"
            + "\r\n\r\n";

        socket.write(headers + contents);
    });
}