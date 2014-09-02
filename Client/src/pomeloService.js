
var pomelo = window.pomelo;


var _host = "127.0.0.1";
var _port = 3014;


var _targetHost;
var _targetPort;


var routes = {
		gate_queryEntry : "gate.gateHandler.queryEntry",
		Login : "login.loginHandler.login"
};


//获取一个连接的ip和端口，
var queryEntry = function(callback) {

	pomelo.init({
		host: _host,
		port: _port,
		log: true
	}, function() {
		pomelo.request(routes.gate_queryEntry, {
		}, function(data) {
			pomelo.disconnect();
			_targetHost = data.host;
			_targetPort = data.port;
			
			callback(data);

		});
	});
}