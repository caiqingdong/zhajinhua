/**
 * Created by caiqingdong on 14-9-11.
 */

sqlclient = module.exports;


var conn;

sqlclient.init = function () {
    var mysql = require("mysql");

    conn = mysql.createConnection({
        host: "114.215.156.65",
        user: "cqd",
        password: "880924",
        database: "zjh"
    });

    conn.connect();

    return sqlclient;
}

sqlclient.query = function(sql, args, cb){

    conn.query(sql, args, cb);

}