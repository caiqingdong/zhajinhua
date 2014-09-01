/**
 * Created by cqd on 14-9-1.
 */

module.exports = function(app){
    return new Handler(app);
}

var Handler = function(app)
{
    this.app = app;
}


var handler = Handler.prototype;
handler._count = 0;

// 模拟负载均衡  按连接分配 连接器给客户端
handler.queryEntry = function(msg, session, next){
    var connectors = this.app.getServersByType('connector');
    if(!connectors || connectors.length === 0) {
        next(null, {
            code: 500
        });
        return;
    }


    var res = connectors[this._count];
    this._count = (this._count + 1) % connectors.length;

    next(null, {
        code: 200,
        host: res.host,
        port: res.clientPort
    });
}