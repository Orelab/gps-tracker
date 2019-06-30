
//-- Configuration

const cfg = require('./config.json');


//-- TCP stuff

var net = require('net');
var ws = require('./webserver.js');

var server = net.createServer((socket)=>{

	socket.on('data', (data)=>{

		//-- A tracker send coordinates

		var arr = data.toString().match(/[a-z]+|[0-9,\.]+/ig);

		if( arr.length>2 && arr[1]=='BR' ){
			var coords = latLng(arr);
			save(data.toString(), coords);
			return;
		}

		if( arr.length>2 && arr[1]=='BP' ){	// unlogged tracker messages
			return;	
		}

		//-- A browser navigate the website

		if( ws.isHTTP(data.toString()) ){
			let url = ws.extractURL(data.toString());
			ws.response(url, socket);
		}
	});
});

server.listen(cfg.port, cfg.server);



//-- Mysql stuff

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : cfg.dbUser,
  password : cfg.dbPass,
  database : cfg.dbName
});
 
connection.connect();




//-- Misc functions

function save( str, coords ){
	if( str.substring(1,13) != cfg.tracker ){
		return;
	}

	var sql = "INSERT INTO log (message, lat, lng) VALUES (" 
		+ connection.escape(str) + ", " 
		+ connection.escape(coords.lat) + ", " 
		+ connection.escape(coords.lng) 
		+ ")";

	connection.query(sql, (error,results,fields)=>{
  		if (error) throw error;
	});
}


function latLng( arr ){
	var date = arr[2];

	var latDeg = arr[4].substring(0,2);
	var latMin = arr[4].substring(2);
	var lat = parseFloat(latDeg) + parseFloat(latMin)/60;

	var lngDeg = arr[6].substring(0,2);
	var lngMin = arr[6].substring(2);
	var lng = parseFloat(lngDeg) + parseFloat(lngMin)/60;

	//console.log("https://maps.google.com/maps?q=N" + lat + ",E" + lng + "\r");

	return { lat:lat, lng:lng };
}


