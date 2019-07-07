
//-- Configuration

const cfg = require('./config.json');




//-- Mysql stuff

var db = require('./database.js');
db.init(cfg);




//-- TCP server (to communicate with tracker)

const net = require('net');

var server = net.createServer((socket) => {
	socket.on('error', (err) => {
		//socket.emit('error', err);
		console.log(err);
		console.log(err.stack);
	});
	socket.on('data', (data) => {

		var arr = data.toString().match(/[a-z]+|[0-9,\.]+/ig);

		if (arr.length > 2 && arr[1] == 'BR') {
			var coords = latLng(arr);
			db.save(data.toString(), coords);
			return;
		}
		if (arr.length > 2 && arr[1] == 'BP') {
			// unlogged tracker messages
			return;
		}
	});
});

server.listen(cfg.tracker.port, () => {
	console.log('TCP server launched on port ' + cfg.tracker.port + ' !');
});



//-- HTTP webserver with ExpressJS

const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/lastposition', function (req, res) {
	db.get(1).then( data => {
		if( data.length )
			res.json(data[0]);
			else
			res.json({ lat: 48.8589506, lng: 2.2768484 })
	});
});

app.get('/lasthundred', function (req, res) {
	db.get(1000).then( data => {
		if( data.length )
			res.json(data);
			else
			res.json({ lat: 48.8589506, lng: 2.2768484 })
	});
});


app.get('/order', function (req, res) {
	sendOrder( req.query.msg );
	res.send('done.');
});


app.listen(cfg.web.port, function () {
	console.log('HTTP server launched on port ' + cfg.web.port + ' !');
});






//-- Misc functions

let save = (str, coords) => {
	if (str.substring(1, 13) != cfg.tracker.id) {
		return;
	}

	var sql = "INSERT INTO log (message, lat, lng) VALUES ("
		+ connection.escape(str) + ", "
		+ connection.escape(coords.lat) + ", "
		+ connection.escape(coords.lng)
		+ ")";

	connection.query(sql, (error, results, fields) => {
		if (error) throw error;
	});
}


let latLng = (arr) => {
	var date = arr[2];

	var latDeg = arr[4].substring(0, 2);
	var latMin = arr[4].substring(2);
	var lat = parseFloat(latDeg) + parseFloat(latMin) / 60;

	var lngDeg = arr[6].substring(0, 2);
	var lngMin = arr[6].substring(2);
	var lng = parseFloat(lngDeg) + parseFloat(lngMin) / 60;

	//console.log("https://maps.google.com/maps?q=N" + lat + ",E" + lng + "\r");

	return { lat: lat, lng: lng };
}


let sendOrder = (msg) => {
	const https = require('https');

	let order = '';

	switch(msg){
		case "URL": order = 'URL,'+cfg.tracker.password+'#'; break;
		case "WHERE": order = 'WHERE,'+cfg.tracker.password+'#'; break;
		default: return;
	}

	const url = cfg.sms + encodeURI(order);

	console.log(url);

	https.get(url, (resp) => {
		let data = '';
	  
		resp.on('data', (chunk) => {
		  data += chunk;
		});
	  
		resp.on('end', () => {
		  console.log(data);
		});
	  
	  }).on("error", (err) => {
		console.log(err);
	  });
}