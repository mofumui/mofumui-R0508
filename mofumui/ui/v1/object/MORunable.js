;
define(function() {
	/**
	 * 前端多线程组件
	 */
	var MORunable = function(option) {
		
		//前端多线程组件
		var task = null;
		
		//脚本路径
		var scriptSrc = null;

		//数据处理器
		var proccessor = null;

		/**
		 * 创建运行Woker
		 */
		this.run = function() {
			if(mofum.isNull(scriptSrc)) {
				throw "任务脚本不存在！";
			}
			task = new Worker(scriptSrc);
		};

		/**
		 * 设置脚本路径
		 */
		this.setScriptSrc = function(src) {
			scriptSrc = src;
		};

		/**
		 * 接收数据
		 */
		this.receive = function(func) {
			if(task != null) {
				task.onmessage = function(e) {
					if(proccessor == null) {
						func(e);
					} else {
						func(proccessor.format(e));
					}
				};
			}
		};
		
		/**
		 * 监听错误
		 */
		this.onError = function(func) {
			if(task != null) {
				worker.addEventListener("error", func);
			}
		};

		/**
		 * 注册事件
		 */
		this.regEvents = function(name,func) {
			worker.addEventListener(name, func);
		};

		/**
		 * 发送数据
		 */
		this.send = function(data) {
			if(task != null) {
				
				task.postMessage(data);
			}
		};
		
		/**
		 * 启动线程
		 */
		this.start = function(){
			this.run();
		};
		
		/**
		 * 终止线程
		 */
		this.close = function(){
			if(task != null) {
				task.terminate();
			}
		};

		if(mofum.isNotNull(option)) {
			this.setScriptSrc(option.src);
		};

	};
	mofum.extend(MORunable, Object);
	return MORunable;
});