;
define(function() {
	/**
	 * 数据库组件
	 */
	var MODBToolkit = function() {
		return new MODBToolkit.init()
	};
	MODBToolkit.init = function() {};
	var pt = MODBToolkit.prototype;
	MODBToolkit.init.prototype = pt;
	pt.db = null;
	
	/**
	 * 验证
	 */
	pt.vertify = function() {
		if(!window.openDatabase) {
			throw "你的浏览器不支持WEBSQL!";
		}

		if(!pt.db) {
			throw "数据库未打开！"
		}
	};
	
	/**
	 * 创建/连接数据库
	 * @param {String} name 数据库名称
	 * @param {String} version 版本号
	 * @param {String} descript 数据库描述
	 * @param {Number} size 数据库容量大小
	 * @param {Function} func 成功创建数据库时执行
	 */
	pt.open = function(name, version, descript, size, func) {
		if(!window.openDatabase) {
			throw "你的浏览器不支持WEBSQL!";
		}
		pt.db = openDatabase(name, version, descript, size, func);
	};
	
	/**
	 * 执行SQL
	 * @param {Object} tx 事务管理器
	 * @param {String} sql SQL语句
	 * @param {Array} params 参数
	 * @param {Function} func 成功执行
	 * @param {Function} errorfunc 失败执行
	 */
	pt.executeSql = function(tx, sql, params, func, errorfunc) {
		if(!params) {
			params = [];
		}
		
		if(!func){
			func = function(){};
		}
		if(!errorfunc){
			errorfunc = function(){};
		}
		pt.vertify();
		tx.executeSql(sql, params, function(tx, results) {
			func(results, tx);
		}, errorfunc)
	}
	
	/**
	 * 执行SQL语句
	 * @param {String} sql sql语句
	 * @param {Array} params 参数
	 */
	pt.executeStatement = function(sql, params) {
		pt.vertify();
		pt.db.transaction(function(tx) {
			if(!params instanceof Array) {
				var temp = params;
				params = [];
				params.push(temp);
			}
			pt.executeSql(tx, sql, params, pt.dataHander, pt.errorHander);
		});
	};
	
	/**
	 * 执行成功后执行
	 * @param {Function} func
	 */
	pt.onSuccess = function(func) {
		pt.dataHander = func;
	};
	
	/**
	 * 执行错误后执行
	 * @param {Function} func
	 */
	pt.onError = function(func) {
		pt.errorHander = func;
	};
	
	mofum.extend(MODBToolkit, Object);
	
	/**
	 * SQL语句构造器
	 */
	var SQLBuilder = function() {
		var arrays = new Array();
		this.append = function(sql) {
			arrays.push(sql);
			return this;
		}
		
		/**
		 * 创建
		 */
		this.create = function(){
			arrays.push(" CREATE ");
			return this;
		}
		
		/**
		 * 更新
		 */
		this.update = function(){
			arrays.push(" UPDATE ");
			return this;
		}
		
		/**
		 * 删除
		 */
		this.del = function(){
			arrays.push(" DELETE ");
			return this;
		}
		
		/**
		 * 查询
		 */
		this.query = function(){
			arrays.push(" SELECT ");
			return this;
		}
		
		/**
		 * 来自
		 */
		this.from = function(table){
			arrays.push(" FROM ");
			arrays.push(" "+table+" ");
			return this;
		}
		
		/**
		 * 插入
		 */
		this.insert = function(){
			arrays.push(" INSERT ");
			return this;
		}
		
		/**
		 * into
		 */
		this.into = function(){
			arrays.push(" INTO ");
			return this;
		}
		
		/**
		 * 值
		 */
		this.val = function(){
			arrays.push(" VALUES ");
			return this;
		}
		
		/**
		 * 不为空
		 */
		this.notNull = function(){
			arrays.push(" NOT NULL ");
			return this;
		}
		
		/**
		 * 为空
		 */
		this.isNull = function(){
			arrays.push(" NULL ");
			return this;
		}
		
		/**
		 * 更改
		 */
		this.alter = function(){
			arrays.push(" ALTER ");
			return this;
		}
		
		/**
		 * 条件
		 */
		this.where = function(){
			arrays.push(" WHERE ");
			return this;
		}
		
		/**
		 * 相似
		 */
		this.like = function(){
			arrays.push(" LIKE ");
			return this;
		}
		
		/**
		 * 与
		 */
		this.and = function(){
			arrays.push(" AND ");
			return this;
		}
		
		/**
		 * 或
		 */
		this.or = function(){
			arrays.push(" OR ");
			return this;
		}
		
		/**
		 * 相等
		 */
		this.eq = function(){
			arrays.push(" = ");
			return this;
		}
		
		/**
		 * 不相等
		 */
		this.neq = function(){
			arrays.push(" != ");
			return this;
		}
		
		/**
		 * 大于
		 */
		this.gt = function(){
			arrays.push(" > ");
			return this;
		}
		
		/**
		 * 小于
		 */
		this.lt = function(){
			arrays.push(" < ");
			return this;
		}
		
		/**
		 * 小于等于
		 */
		this.le = function(){
			arrays.push(" <= ");
			return this;
		}
		
		/**
		 * 大于等于
		 */
		this.ge = function(){
			arrays.push(" >= ");
			return this;
		}
		
		/**
		 * 参数
		 */
		this.param = function(){
			arrays.push(" ? ");
			return this;
		}
		
		/**
		 * 逗号
		 */
		this.comma = function(){
			arrays.push(" , ");
			return this;
		}
		
		/**
		 * 主键
		 */
		this.pk = function(){
			arrays.push(" PRIMARY KEY ");
			return this;
		}
		
		/**
		 * 存在
		 */
		this.exists = function(){
			arrays.push(" IF EXISTS ");
			return this;
		}
		
		/**
		 * 不存在
		 */
		this.notexists = function(){
			arrays.push(" IF NOT EXISTS ");
			return this;
		}
		
		/**
		 * 作为
		 */
		this.as = function(){
			arrays.push(" AS ");
			return this;
		}
		
		/**
		 * 表格
		 */
		this.table = function(){
			arrays.push(" TABLE ");
			return this;
		}
		
		/**
		 * 左括号
		 */
		this.lb = function(){
			arrays.push(" ( ");
			return this;
		}
		
		/**
		 * set
		 */
		this.set = function(){
			arrays.push(" SET ");
			return this;
		}
		
		/**
		 * 右括号
		 */
		this.rb = function(){
			arrays.push(" ) ");
			return this;
		}
		
		/**
		 * 删除最后一个添加元素
		 */
		this.deleteLast = function() {
			return arrays.pop();
		}

		/**
		 * 转换成字符串
		 */
		this.toString = function() {
			return arrays.join("");
		}

	}

	MODBToolkit.SQLBuilder = SQLBuilder;

	/**
	 * 数据封装器
	 * @param {Object} jsonObject JSON对象
	 * @param {Object} tableNM 表名
	 */
	var DBWrapper = function(jsonObject, tableNM) {
		
		/**
		 * 模型
		 */
		var model = null;
	
		/**
		 * 表名
		 */
		var tableName = null;
		
		DBWrapper.keys = function(object) {
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
		 * 获得表格SQL
		 */
		this.getTableSql = function(pk) {

			if(DBWrapper.keys(model).length > 0) {
				var sql = new SQLBuilder();

				sql.create().table().notexists();

				sql.append(tableName);

				sql.lb();

				for(key in model) {
					sql.append(key);
					if(key == pk){
						sql.pk();
					}
					sql.comma();
				}
				sql.deleteLast();
				sql.rb();

				return sql.toString();
			}
			return null;
		};
		
		/**
		 * 获得更新SQL
		 */
		this.getUpdateSql = function(pk) {
			if(DBWrapper.keys(model).length > 0) {
				var sql = new SQLBuilder();

				sql.update().append(tableName).set();
				
				for(key in model) {
					sql.append(key).eq().param().comma();
				}
				sql.deleteLast();
				if(pk){
					sql.where().append(pk).eq().param();
				}
				return sql.toString();
			}
		};
		
		/**
		 * 获得删除SQL
		 */
		this.getDeleteSql = function(pk) {
			if(DBWrapper.keys(model).length > 0) {
				var sql = new SQLBuilder();

				sql.del().from(tableName);
				
				if(pk){
					sql.where().append(pk).eq().param();
				}
				return sql.toString();
			}
		};
		
		/**
		 * 获得查询SQL
		 */
		this.getSelectSql = function() {
			var sql = new SQLBuilder();

			sql.query();
			for(key in model) {
				sql.append(key).eq().param().comma();
			}
			sql.deleteLast();
			sql.rb().from(tableName);
			return sql.toString();
		};
		
		/**
		 * 获得插入SQL
		 */
		this.getInsertSql = function() {
			if(DBWrapper.keys(model).length > 0) {
				var sql = new SQLBuilder();

				sql.insert().notexists().into().append(tableName).lb();
				
				var values = new SQLBuilder();
				
				values.val().lb();
				for(key in model) {
					sql.append(key).comma();
					values.param().comma();
				}
				values.deleteLast();
				values.rb();
				sql.deleteLast();
				sql.rb().append(values.toString());
				return sql.toString();
			}
		};
	
		/**
		 * 拷贝赋值
		 */
		var copyObject = function(jsonObject) {
			if(jsonObject) {
				model = new Object();
				var keys = DBWrapper.keys(jsonObject);
				for(var key in keys) {
					model[keys[key]] = jsonObject[keys[key]];
				}
			}
		}

		this.setTableName = function(tableNM) {
			tableName = tableNM;
			return this;
		};

		this.getTableName = function() {
			return tableName;
		}

		copyObject(jsonObject);

		this.setTableName(tableNM);
	}
	
	MODBToolkit.DBWrapper = DBWrapper;

	return MODBToolkit;
});