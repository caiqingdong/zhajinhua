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
    var player = this.players[msg.name];
    if (!!player){
        next(null, {code:200,msg:"已登录"});
        return ;
    }

    if (msg.name == msg.passwd)
    {
        next(null, {code:200,msg:"登陆成功"});

        player = new Player({id:0, name:msg.name});
        this.players[msg.name] = player;
        return;
    }
    next(null, {code:500,msg:"登陆失败"});
};
