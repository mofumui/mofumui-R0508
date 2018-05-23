;
define(function() {
	
	/**
	 * JSON组件
	 */
	var MOJSONToolkit = function() {
		return new MOJSONToolkit.init();
	};
	
	MOJSONToolkit.init = function(){};
	
	var pt = MOJSONToolkit.prototype;
	
	MOJSONToolkit.init.prototype = pt;
	/**
	 * 对象格式化字符串
	 * @param {Object} object
	 */
	pt.stringify = function(object) {
		if(window.JSON && window.JSON.stringify) {
			return window.JSON.stringify(object);
		}
		var s = "";
		if(!Object.keys) {
			Object.keys = this.keys;
		}
		var keys = Object.keys(object);
		for(var key in keys) {
			s += ",\"" + keys[key] + "\":\"" + object[keys[key]] + "\"";
		}
		if(s != "") {
			s = s.substring(1);
		}
		return "{" + s + "}";
	};

	/**
	 * 获得对象的所有属性值
	 * @param {Object} object
	 */
	pt.keys = function(object) {
		if(object !== Object(object)) {
			throw new TypeError('Object.keys called on a non-object');
		}
		var keys = [];
		var temp = null;
		for(temp in object) {
			if(Object.prototype.hasOwnProperty.call(object, temp)) {
				keys.push(temp);
			}
		}
		return keys;
	}

	/**
	 * 格式化JSON
	 * @param {Object} data
	 */
	pt.parse = function(data) {
		if(window.JSON && window.JSON.parse) {
			return window.JSON.parse(data);
		}
		var rValidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
			rValidchars = /^[\],:{}\s]*$/,
			rValidbraces = /(?:^|:|,)(?:\s*\[)+/g,
			rValidescape = rValidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
		if(rValidchars.test(data.replace(rValidescape, '@').replace(rValidtokens, ']').replace(rValidbraces, ''))) {
			return(new Function('return ' + data))();
		} else {
			throw "数据内容非法！";
		}
	}

	MOJSONToolkit.stringify = pt.stringify;
	MOJSONToolkit.parse = pt.parse;
	MOJSONToolkit.keys = pt.keys;
	mofum.extend(MOJSONToolkit, Object);
	return MOJSONToolkit;
});