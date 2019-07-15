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
        if (message.substring(1, 13) != cfg.tracker.id) {
            reject("Bad tracker id.");
        }
        var sql = "INSERT INTO log (message, lat, lng) VALUES ("
            + connection.escape(message) + ", "
            + connection.escape(coords.lat) + ", "
            + connection.escape(coords.lng)
            + ")";

        connection.query(sql, (error, results, fields) => {
            if (error) reject(error);
            resolve(true);
        });
    });
}


/*
    The following method delete every recording with make reference to a
    minute previously recorded (dedupe = dédoublonner).
*/

exports.dedupe = function() {
    let sql = `
        DELETE
        FROM log
        WHERE id IN (
            SELECT * FROM (
                SELECT log.id
                FROM log, log as second 
                WHERE log.id = (second.id-1)
                AND DATE_FORMAT(log.date, '%y%m%d%H%i') = DATE_FORMAT(second.date, '%y%m%d%H%i')
            ) AS p
        );
    `;
    connection.query(sql, (error, results, fields)=>{
        if (error) console.log(error);
    });
}