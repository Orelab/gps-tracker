var mysql = require('mysql');
var connection;
var cfg;



exports.init = function (config) {
    cfg = config;

    connection = mysql.createConnection({
        host: 'localhost',
        user: cfg.db.user,
        password: cfg.db.pass,
        database: cfg.db.name
    });

    connection.connect();
}



exports.get = ( quantity=1 ) => {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT id, date, lat, lng FROM log ORDER BY id DESC LIMIT "+quantity+";";

        connection.query(sql, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}



exports.save = function (message, coords) {
    return new Promise(function (resolve, reject) {
        if (str.substring(1, 13) != cfg.tracker.id) {
            reject("Bad tracker id.");
        }
        var sql = "INSERT INTO log (message, lat, lng) VALUES ("
            + connection.escape(str) + ", "
            + connection.escape(coords.lat) + ", "
            + connection.escape(coords.lng)
            + ")";

        connection.query(sql, (error, results, fields) => {
            if (error) reject(error);
            resolve(true);
        });
    });
}
