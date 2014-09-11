var pomelo = require('pomelo');



/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'zjh_service');

// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });

    var dbclient = require("./app/dao/mysql/sqlclient").init();

    app.set("dbclient", dbclient);

    var sql = 'select * from MYTABLE where name=?';
    var args = ["cqd"];

    dbclient.query(sql, args, function(err, res){
        if (err) console.log(err);
        console.log(res);
    });

    var args = ["test"];
    dbclient.query(sql, args, function(err, res){
        if (err) console.log(err);
        console.log(res);
    });

});


app.configure('production|development','gate', function() {
    app.set('connectorConfig', {
        connector: pomelo.connectors.hybridconnector,
        useDict: true // enable dict
    });
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
