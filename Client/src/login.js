
var LoginLayer = cc.Layer.extend({
	_iptname:null,
	_iptpasswd:null,
	_btnlogin:null,
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();
		
		var root = ccs.uiReader.widgetFromJsonFile(res.LoginUIJson);
		this._iptname = ccui.helper.seekWidgetByName(root, "name");
		this._iptpasswd = ccui.helper.seekWidgetByName(root, "passwd");
		
		this._btnlogin = ccui.helper.seekWidgetByName(root, "login");
		this._btnlogin.addTouchEventListener(this.touchEvent,this);
		this._btnlogin.setTouchEnabled(false);
		
		this.addChild(root);
		
		this.queryEntry();
		
		return true;
	},
	
	touchEvent: function (sender, type)
	{
		if (type == ccui.Widget.TOUCH_BEGAN){
			cc.log("down");
			//this._btnlogin.setTouchEnabled(false);
			var name = this._iptname.getString();
			var passwd = this._iptpasswd.getString();
			
			cc.log("name :" + name);
			cc.log("passwd :" + passwd);

			pomelo.request(routes.Login, {name:name,
				passwd:passwd
			}, function(data) {
				cc.log(data.msg);
			});
			
		}
	},
	
	connectServer : function(host, port)
	{
		var salf = this;
		pomelo.init({
			host: host,
			port: port,
			log: true
		}, function() {
			salf._btnlogin.setTouchEnabled(true);
		});
	},
	
	
	//获取一个连接的ip和端口，
	queryEntry : function() {

		var salf = this;
		
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
				salf.connectServer(_targetHost, _targetPort);
				cc.log("host : " + data.host);
				cc.log("port : " + data.port);
			});
		});
	}

});

var LoginScene = cc.Scene.extend({

	onEnter:function () {
		this._super();
		var layer = new LoginLayer();
		this.addChild(layer);
	}
});
