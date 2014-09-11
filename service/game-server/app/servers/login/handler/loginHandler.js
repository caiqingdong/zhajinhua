/**
 * Created by cqd on 14-9-2.
 */

var Player = require("../../../models/player");

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};


var handler = Handler.prototype;

handler.players = {};

handler.login = function(msg, session, next)
{


    var dbclient = this.app.get('dbclient');

    console.log(typeof dbclient);

    var sql = 'select * from User where name=?';
    var args = [msg.name];

    dbclient.query(sql, args, function(err, rows){
        if (err){
            console.log(err);
            next(null, {code:500,msg:"数据库查询错误"});
            return;
        }

        console.log(rows);

        if(rows.length === 0){
            next(null, {code:500,msg:"没有此账号"});
            return;
        }

        if(rows[0].passwd == msg.passwd){
            next(null, {code:200,msg:"登陆成功"});
            return;
        }


        next(null, {code:500,msg:"密码错误"});

        return;
//
    });

//
//
//    var player = this.players[msg.name];
//    if (!!player){
//        next(null, {code:200,msg:"已登录"});
//        return ;
//    }
//
//    if (msg.name == msg.passwd)
//    {
//        next(null, {code:200,msg:"登陆成功"});
//
//        player = new Player({id:0, name:msg.name});
//        this.players[msg.name] = player;
//        return;
//    }
//    next(null, {code:500,msg:"登陆失败"});
};
