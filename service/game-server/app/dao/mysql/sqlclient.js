/**
 * Created by caiqingdong on 14-9-11.
 */

sqlclient = module.exports;


var pool;

sqlclient.init = function () {
    var mysql = require("mysql");



    pool  = mysql.createPool({
        host     : '114.215.156.65',
        user     : 'cqd',
        password : '880924',
        database : 'zjh'
    });


//    conn = mysql.createConnection({
//        host: "114.215.156.65",
//        user: "cqd",
//        password: "880924",
//        database: "zjh"
//    });
//
//    conn.connect();

    return sqlclient;
}

sqlclient.query = function(sql, args, cb){

    pool.getConnection(function(err, connection) {

        connection.query(sql, args, cb);

        connection.release();
    });

}