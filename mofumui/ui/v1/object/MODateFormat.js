;
define(function() {
	/**
	 * 日期格式化组件
	 */
	var MODateFormat = function() {
		return new MODateFormat.init();
	};
	var pt = MODateFormat.prototype;
	MODateFormat.init = function(){};
	MODateFormat.init.prototype = pt;

	/**
	 * 日期格式化
	 * @param {Object} date 日期
	 * @param {Object} fmt 格式化字符串（如：yyyy-MM-dd HH:mm:ss.S）
	 */
	pt.format = function(date, fmt) {
		if(!(date instanceof Date)) {
			throw "date 参数必须日期类型！";
		}
		var o = {
			"M+": date.getMonth() + 1,
			"d+": date.getDate(),
			"h+": date.getHours(),
			"H+": date.getHours(),
			"m+": date.getMinutes(),
			"s+": date.getSeconds(),
			"q+": Math.floor((date.getMonth() + 3) / 3),
			"S+": date.getMilliseconds()
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};

	MODateFormat.df = {
		"yyyy": "([0-9]{2}|[0-9]{4})",
		"MM": "([0]{1}[0-9]{1}|[1]{1}[0-2]{1})",
		"dd": "([0-2]{1}[0-9]{1}|[3]{1}[0-1]{1})",
		"HH": "([0-1]{1}[0-9]{1}|[2]{1}[0-3]{1})",
		"mm": "([0-5]{1}[0-9]{1})",
		"ss": "([0-5]{1}[0-9]{1})",
		"S": "([0-9]d+)"
	};
	MODateFormat.df.defaults = {};
	var df = MODateFormat.df;

	/**
	 * 获得当前日期
	 * @param {String} fmt 格式化字符串
	 */
	pt.getCurrentDate = function(fmt) {
		if(fmt != null) {
			return pt.format(new Date(), fmt);
		}
		return pt.format(new Date(), "yyyy-MM-dd HH:mm:ss.S");
	};

	/**
	 * 获得当前日期后一天
	 * @param {String} fmt 格式化字符串
	 */
	pt.getNextDate = function(fmt) {
		var currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + 1)
		if(fmt != null) {
			return pt.format(currentDate, fmt);
		}
		return pt.format(currentDate, "yyyy-MM-dd HH:mm:ss.S");
	};

	/**
	 * 获得当前日期前一天
	 * @param {String} fmt 格式化字符串
	 */
	pt.getPreDate = function(fmt) {
		var currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - 1)
		if(fmt != null) {
			return pt.format(currentDate, fmt);
		}
		return pt.format(currentDate, "yyyy-MM-dd HH:mm:ss.S");
	};

	/**
	 * 获得当前日期偏移量日期字符串
	 * @param {Object} offset 偏移量
	 * @param {Object} fmt 输出格式化
	 */
	pt.getOffsetDate = function(offset, fmt) {
		var currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + offset);
		
		if(fmt != null) {
			return pt.format(currentDate, fmt);
		}
		return pt.format(currentDate, "yyyy-MM-dd HH:mm:ss.S");
	};
	
	/**
	 * 格式化日期
	 * @param {Object} str 日期字符串
	 */
	pt.parse = function(str){
		var temp = df.defaults;
        var arrays = [temp["YMDHMS"], temp["YMDTHMS"], temp["YMDHMSP"], temp["YMDTHMSP"]]
        var formatReg = null;
        var isISO8601 = false;
        if(str.length < 11) {
            var value = temp["YMD"];
            var reg = new RegExp(value);
            if(reg.test(str)) {
                formatReg = reg;
                isISO8601 = true;
            }
        } else {
            for(var i in arrays) {
                var value = arrays[i];
                var reg = new RegExp(value);
                if(reg.test(str)) {
                    formatReg = reg;
                    isISO8601 = true;
                    break;
                }
            }
        }
 
        var date = null;
        if(isISO8601) {
            date = pt.parseISO8601(str, formatReg);
        } else {
            date = new Date(str);
        }
        return date;
	}

	/**
	 * 兼容IE8 转换日期，支持yyyy-MM-dd HH:mm:ss.S
	 * @param {String} dateStringInRange 日期字符串
	 */
	pt.parseISO8601 = function(dateStringInRange, reg) {
		
        var temp = df.defaults;
        var isoExp = reg;
        var date = new Date(NaN);
        var month = null;
        var parts = isoExp.exec(dateStringInRange);
        if(parts) {
            month = +parts[2];
            date.setFullYear(parts[1], month - 1, parts[3]);
            if(month != date.getMonth() + 1) {
                date.setTime(NaN);
            }
            date.setHours(parts[4] ? parts[4] :0);
            date.setMinutes(parts[5] ? parts[5] :0);
            date.setSeconds(parts[6] ? parts[6] :0);
            date.setMilliseconds(parts[7] ? parts[7] :0);
        }
        return date;
    }

	/**
	 * 根据字符串获得偏移量日期
	 * @param {String} str 日期字符串
	 * @param {Integer} offset 偏移量
	 * @param {Object} fmt 输出格式化字符串
	 */
	pt.getSOffsetDate = function(str, offset, fmt) {
        var date = pt.parse(str);
        date.setDate(date.getDate() + offset)
        if(fmt != null) {
            return pt.format(date, fmt);
        }
        return pt.format(date, "yyyy-MM-dd HH:mm:ss.S");
    };
	
	//初始化
	MODateFormat.initDefaults = function() {
		df.defaults["YMD"] = df["yyyy"] + "-" + df["MM"] + "-" + df["dd"];
		df.defaults["HMS"] = df["HH"] + ":" + df["mm"] + ":" + df["ss"];
		df.defaults["HMSP"] = df.defaults["HH:mm:ss"] + "." + df["S"];
		df.defaults["YMDHMS"] = df.defaults["YMD"] + df.defaults["HMS"];
		df.defaults["YMDTHMS"] = df.defaults["YMD"] + " " + df.defaults["HMS"];
		df.defaults["YMDHMSP"] = df.defaults["YMD"] + "" + df.defaults["HMSP"];
		df.defaults["YMDTHMSP"] = df.defaults["YMD"] + " " + df.defaults["HMSP"];
	}
	MODateFormat.initDefaults();
	MODateFormat.parse = pt.parse;
	MODateFormat.format = pt.format;
	mofum.extend(MODateFormat, Object);
	return MODateFormat;
});