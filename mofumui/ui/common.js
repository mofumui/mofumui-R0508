var mofum = {};
mofum.replacePx = function(value) {
	return(value + "").replace("px", "");
};

mofum.extend = function(target, source) {
	target.prototype = new source();
	target.prototype.constructor = target;
	target.list = function(size) {
		var arrays = new Array();
		for(var i = 0; i < size; i++) {
			arrays.push(new target());
		}
		return arrays;
	}

	target.mlist = function(size) {
		var arrayl = new Array();
		for(var i = 1; i < arguments.length; i++) {
			arrayl.push(arguments[i]);
		}
		var arrays = new Array();
		for(var i = 0; i < size; i++) {
			arrays.push(eval("new target('" + arrayl.join(",") + "')"));
		}
		return arrays;
	}

	target.one = function() {
		var arrays = new Array();
		for(var i = 0; i < arguments.length; i++) {
			arrays.push(arguments[i]);
		}
		return eval("new target('" + arrays.join(",") + "')");
	}

	target.instance = function() {
		return new target();
	}

	target.map = function(size) {
		var map = new Object();
		for(var i = 0; i < size; i++) {
			map[i] = new target();
		}
		map.push = function(key, value) {
			map[key] = value;
		}
		map.remove = function(key) {
			map[key] = null;
		}
		map.size = function() {
			return map.keyset().length;
		}
		map.keyset = function(key) {
			var keys = new Array();
			for(var key in map) {
				keys.push(key);
			}
			return keys;
		}
		map.get = function(key) {
			return map[key];
		}
		return map;
	}
}
mofum.isNull = function(obj) {
	return obj == null || obj == undefined || obj == '';
}
mofum.isNotNull = function(obj) {
	return !mofum.isNull(obj);
}
mofum.isArray = function(obj) {
	return mofum.isNotNull(obj) && typeof obj === 'array';
};

var MClientRunable = function() {

	this.send = function(message) {
		postMessage(message);
	};

	this.stop = function() {
		self.close();
	};

	this.receive = function(proccessor) {
		onmessage = function(e) {
			proccessor(e);
		};
	};
};
