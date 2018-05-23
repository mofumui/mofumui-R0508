;
define(function() {
	/**
	 * 定时器组件
	 * @param {Object} option 参数
	 */
	var MOTimer = function(option) {
		//计数器
		var counter = 0;
		
		//执行任务的ID
		var taskId = null;
		
		//时间单位量。1000ms = 1秒
		var unit = 1000;
		
		//任务函数
		var task = null;
		
		//Timer名称
		var name = "default";
		
		/**
		 * 启动
		 */
		this.start = function start() {
			var that = this; // 保存当前对象this
			counter++;
			taskId = setTimeout(function() {
				that.start();
			}, unit);
			if(task!= null && typeof task === "function") {
				task(counter);
			}
			return this;
		};
		
		/**
		 * 完全终止
		 */
		this.stop = function(callback) {
			if(taskId != null && taskId != undefined) {
				counter = 0;
				clearTimeout(taskId);
			}
			if(callback!= null && typeof task === "function") {
				callback();
			}
			return this;
		};
		
		/**
		 * 暂停终止
		 */
		this.suspend = function(callback) {
			if(taskId != null && taskId != undefined) {
				clearTimeout(taskId);
			}
			if(callback!= null && typeof task === "function") {
				callback();
			}
			return this;
		};
		
		/**
		 * 获得Timer名称
		 */
		this.getName = function(){
			return name;
		};
		
		this.setName = function(_name){
			if(typeof _name !== 'string'){
				throw "仅支持String 类型的参数！" 
			}
			name = _name;
			return this;
		};
		
		this.setUnit = function(_unit){
			if(typeof _unit !== 'number'){
				throw "仅支持Number 类型的参数！" 
			}
			unit = _unit;
			return this;
		};
		
		this.getUnit = function(){
			return unit;
		};
		
		/**
		 * 设置任务
		 */
		this.setTask = function(_task){
			if(typeof _task !== 'function'){
				throw "仅支持Funtion 类型的参数！" 
			}
			task = _task;
			return this;
		};
		
		/**
		 * 获得当前任务
		 */
		this.getTask = function(){
			return task;
		};
		
		/**
		 * 获得计数器
		 */
		this.getCounter = function(){
			return counter;
		};
		
		if(mofum.isNotNull(option)){
			this.setTask(option.task);
			this.setName(option.name);
			this.setUnit(option.unit);
		}
		
	};
	mofum.extend(MOTimer, Object);
	return MOTimer;
});