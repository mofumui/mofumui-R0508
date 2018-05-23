;
define(function() {
	/**
	 * WebSocket组件
	 */
	var MOWebSocket = function() {
		return new MOWebSocket.init();
	};

	var pt = MOWebSocket.prototype;
	MOWebSocket.init = function() {};
	MOWebSocket.init.prototype = pt;
	pt.socket = null;
	
	/**
	 * 验证
	 */
	pt.vertify = function() {
		if(!("WebSocket" in window)) {
			throw "您的浏览器不支持 WebSocket!";
		}
		if(!(pt.socket)) {
			throw "你还未初始化WebSocket!";
		}
	}
	
	/**
	 * 打开Websocket
	 * @param {String} url 地址
	 * @param {Object} protocol 子协议
	 */
	pt.open = function(url, protocol) {
		if(!("WebSocket" in window)) {
			throw "您的浏览器不支持 WebSocket!";
		}
		var config = pt.getConfig();
		if(protocol) {
			config.protocol = protocol;
			pt.socket = new WebSocket(url, protocol);
		} else {
			pt.socket = new WebSocket(url);
		}
	}
	
	/**
	 * 关闭Socket
	 */
	pt.close = function() {
		pt.vertify();
		pt.socket.close();
	}
	
	/**
	 * 打开成功执行
	 * @param {Function} func 
	 */
	pt.onSuccess = function(func) {
		pt.vertify();
		pt.socket.onopen = function(event) {
			func(event);
		}
	}
	
	/**
	 * 发生错误时执行
	 * @param {Function} func
	 */
	pt.onError = function(func) {
		pt.vertify();
		pt.socket.onerror = function(event) {
			func(event);
		}
	}
	
	/**
	 * 接收到数据时执行
	 * @param {Function} func
	 */
	pt.onReceive = function(func) {
		pt.vertify();
		pt.socket.onmessage = function(event) {
			func(event);
		}
	}
	
	/**
	 * 关闭时处理func
	 * @param {Object} func 处理函数
	 */
	pt.onClose = function(func) {
		pt.vertify();
		pt.socket.onclose = function(event) {
			func(event);
		}
	}
	
	/**
	 * socket状态
	 */
	pt.status = function() {
		pt.vertify();
		return pt.socket.readyState;
	}
	
	/**
	 * 重连
	 */
	pt.reconnect = function() {
		pt.close();
		var config = pt.getConfig();
		pt.open(config.url, config.protocol);
	};

	/**
	 * 获得配置
	 * @param {Object} key 键
	 */
	pt.getConfig = function(key) {
		if(arguments.length == 0) {
			return pt.config;
		} else {
			return pt.config[key];
		}

	};
	
	/**
	 * 注册配置
	 * @param {Object} key 键
	 * @param {Object} value 值
	 */
	pt.regConfig = function(key, value) {
		if(!(pt.config)) {
			pt.config = {};
		}
		pt.config[key] = value;
	};
	
	/**
	 * 发送数据
	 * @param {Object} data 数据
	 */
	pt.send = function(data) {
		pt.vertify();
		pt.socket.send(data);
	}

	/**
	 * 检测是否发送完成
	 */
	pt.isSendOk = function() {
		pt.vertify();
		if(pt.socket.bufferedAmount === 0) {
			return true;
		} else {
			return false;
		}
	}

	mofum.extend(MOWebSocket, Object);
	return MOWebSocket;
});