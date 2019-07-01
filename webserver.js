var fs = require('fs');
var cfg = require('./config.json');


exports.isHTTP = function isHTTP(request){
    return request.substring(0,3)==='GET';
}


exports.getURL = function getURL(request){
    var first_line = request.split("\r")[0].split(' ')[1];

    if( first_line=="/" ){
        first_line = "/index.html";
    }
    return first_line;
}


exports.isByte = (filename) => {
    let extension = filename.split('.').slice(-1).pop();

    switch(extension){
        case 'jpg':
        case 'png':
            return true;
        default:
            return false;
    }
}


exports.responseByte = function responseByte(file, socket){

    var headers = "HTTP/1.1 200 OK\r\n"
        + "Server: " + cfg.server + "\r\n"
    //    + "Content-Length: " + stats.size + "\r\n"
        + "Content-Type: " + exports.getMIME(file) + "\r\n"
        + "\r\n";

    socket.write(headers);

    var stream = fs.createReadStream('./public'+file);
    stream.on('open',()=>{
        stream.pipe(socket);
    });
    stream.on('end',()=>{
        socket.end();
        //socket.close();
        socket.destroy();
    });
    //stream.pipe(socket);
}



exports.responseFile = function responseFile(file, socket, code=200){
    fs.readFile('./public'+file, 'utf8', function(err, contents){
        if( typeof contents==='undefined' ){
            return;
        }
        const stats = fs.statSync('./public'+file);

        var headers = "HTTP/1.1 " + code + " OK\r\n"
            + "Server: " + cfg.server + "\r\n"
            + "Content-Length: " + stats.size + "\r\n"
            + "Content-Type: " + exports.getMIME(file) + "\r\n"
            + "\r\n";

        socket.write(headers + contents);
        socket.end();
        //socket.close();
        socket.destroy();
    });
}

exports.responseString = function responseString(str, mime, socket){
    var headers = "HTTP/1.1 200 OK\r\n"
        + "Server: " + cfg.server + "\r\n"
        + "Content-Length: " + str.length + "\r\n"
        + "Content-Type: " + mime + "\r\n"
        + "\r\n";

    socket.write(headers + str);
    socket.end();
    //socket.close();
    socket.destroy();

}



exports.getMIME = function getMIME(filename){
    // https://fr.wikipedia.org/wiki/Type_de_m%C3%A9dias

    let extension = filename.split('.').slice(-1).pop();

    switch( extension ){
        case 'jpg': return 'image/jpg';
        case 'png': return 'image/png';
        case 'ico': return 'image/x-icon';
        case 'css': return 'text/css';
        case 'js': return 'application/javascript';
        default: return 'text/html; charset=utf-8';
    }
}