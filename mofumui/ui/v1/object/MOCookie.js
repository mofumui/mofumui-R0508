;
define(function() {
	/**
	 * Cookie组件
	 */
	var MOCookie = function() {
		return new MOCookie.init();
	};

	var pt = MOCookie.prototype;

	MOCookie.init = function() {};

	MOCookie.init.prototype = pt;

	/**
	 * 根据天设置Cookie
	 * @param {Object} cname cookie名称
	 * @param {Object} cvalue cookie对应的值
	 * @param {Object} exdays 天
	 */
	pt.setCookieByDay = function(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	};

	/**
	 * 根据小时设置Cookie
	 * @param {Object} cname cookie名称
	 * @param {Object} cvalue cookie对应的值
	 * @param {Object} exhours 小时
	 */
	pt.setCookieByHour = function(cname, cvalue, exhours) {
		var d = new Date();
		d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	};

	/**
	 * 根据分钟设置Cookie
	 * @param {Object} cname cookie名称
	 * @param {Object} cvalue cookie对应的值
	 * @param {Object} minutes 分钟
	 */
	pt.setCookieByMinute = function(cname, cvalue, minutes) {
		var d = new Date();
		d.setTime(d.getTime() + (minutes * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	};

	/**
	 * 根据秒设置Cookie
	 * @param {Object} cname cookie名称
	 * @param {Object} cvalue cookie对应的值
	 * @param {Object} seconds 秒
	 */
	pt.setCookieBySecond = function(cname, cvalue, seconds) {
		var d = new Date();
		d.setTime(d.getTime() + (seconds * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	};

	/**
	 * 获得Cookie
	 * @param {Object} cname cookie名称
	 */
	pt.getCookie = function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	};

	/**
	 * 清除Cookie
	 * @param {Object} cname cookie名称
	 */
	pt.clearCookie = function(cname) {
		this.setCookieByDay(cname, "", -1);
	};
	
	MOCookie.second = pt.setCookieBySecond;
	MOCookie.minute = pt.setCookieByMinute;
	MOCookie.hour = pt.setCookieByHour;
	MOCookie.day = pt.setCookieByDay;
	MOCookie.clear = pt.clearCookie;
	MOCookie.get = pt.getCookie;

	mofum.extend(MOCookie, Object);
	return MOCookie;
});