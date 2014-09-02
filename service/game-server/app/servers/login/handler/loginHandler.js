/**
 * Created by cqd on 14-9-2.
 */

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};


var handler = Handler.prototype;

handler.login = function(msg, session, next)
{
    if (msg.name == msg.passwd)
    {
        next(null, {code:200,msg:"登陆成功"});
        return;
    }
    next(null, {code:500,msg:"登陆失败"});
};
