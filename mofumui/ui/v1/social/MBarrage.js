;
define(["MComponent", "MPanel", "MORandom", "MLLayer", "MOTimer"], function(MComponent, MPanel, MORandom, MLLayer, MOTimer) {
	/**
	 * 弹幕
	 * @param {Object} background 背景
	 */
	var MBarrage = function(background) {
		this.dom = this.query("<div></div>", "MBarrage");
		this.setBackground(background);

		var layer = new MLLayer();
		
		/**
		 * 文字色彩
		 */
		var colorArray = [];
		
		/**
		 * 最大速度
		 */
		var maxSpeed = 5;
		
		/**
		 * 最小速度
		 */
		var minSpeed = 1;
		
		/**
		 * 每30ms执行一次
		 */
		var sleep = 30;
		
		/**
		 * 弹幕方向
		 */
		var direction = "LEFT";

		var random = new MORandom();
		
		/**
		 * 设置文字颜色
		 */
		this.setColors = function(colors){
			if(colors instanceof Array){
				colorArray = colors;
			}else{
				colorArray = [colors];
			}
		}
		
		/**
		 * 设置时间单位。ms
		 */
		this.setTimeUnit = function(timeUnit){
			sleep = timeUnit;
		}
		
		/**
		 * 设置最大速度
		 */
		this.setMaxSpeed = function(speed){
			if(minSpeed > maxSpeed){
				throw "最大速度不能小于最大速度！"
			}
			maxSpeed = speed;
		}
		
		/**
		 * 设置最小速度
		 */
		this.setMinSpeed = function(speed){
			if(minSpeed > maxSpeed){
				throw "最小速度不能大于最大速度！"
			}
			
			minSpeed = speed;
		}
	
		/**
		 * 设置背景面板
		 */
		this.setBackground = function(background) {
			if(background instanceof MComponent) {
				background.setFullToParent();
				layer.put(0, background);
			} else {
				layer.put(0).setBackground(background);
			}
			return this;
		}
		
		/**
		 * 获得背景面板
		 */
		this.getBackground = function() {
			return layer.get(0);
		}
		
		/**
		 * 设置正文面板
		 */
		this.setContent = function(content) {
			if(content instanceof MComponent) {
				content.setFullToParent();
				layer.put(1, content)
			} else {
				layer.put(1).setBackground(content);
			}
		}
		
		/**
		 * 获得面板
		 */
		this.getContent = function() {
			return layer.get(1);
		}
		
		/**
		 * 设置玻璃面板
		 */
		this.setGlass = function(glass) {
			if(glass instanceof MComponent) {
				layer.put(2, glass)
			} else {
				layer.put(2).setBackground(glass);
			}
		}
		
		/**
		 * 获得玻璃面板
		 */
		this.getGlass = function() {
			if(!layer.get(2)){
				this.setGlass(2,new MPanel());
			}
			return layer.get(2);
		}
		
		/**
		 * 发送一条弹幕，value可以是组件
		 */
		this.sendBarrage = function(value,direction,color) {
			var barrage = null;
			if(value instanceof MComponent) {
				barrage = value;
			} else {
				barrage = new MPanel();
				if(!color){
					color = colorArray[random.randNum(0, colorArray.length)];
				}
				var width = value.toString().length;
				
				barrage.setFontColor(color);
				barrage.setContent(value);
				barrage.setStyle("width",width+"em");
				barrage.setStyle("height","1em");
			}
			barrage.setPositionModel("absolute");
			
			this.getGlass().append(barrage);
			this.createTimer(barrage,direction);
		}
		
		/**
		 * 创建定时器
		 */
		this.createTimer = function(barrage,direction) {
			var timer = new MOTimer();

			timer.setUnit(sleep);

			var speed = random.randNum(minSpeed, maxSpeed);
			
			if(!direction){
				var array = ["LEFT", "RIGHT", "TOP", "BOTTOM"]
				var finalDirection = random.randNum(0, array.length);
				direction = array[finalDirection]
			}
			
			var that = this;
			var height = this.getHeight();
			var width = this.getWidth();
			var startHeight = random.randNum(0, height);
			var startWidth = random.randNum(0, width);
			timer.setTask(function(counter) {
				
				var calcSpeed = counter * speed;
				
				var res = that.changeDirection(barrage,direction,calcSpeed,startHeight,startWidth);
				
				if(calcSpeed > (res == 0? width:height)) {
					timer.stop();
					barrage.remove();
					barrage = null;
				}
			});
			
			timer.start();

		}
		
		/**
		 * 改变方向
		 */
		this.changeDirection = function(barrage, direction,calcSpeed,startHeight,startWidth) {
			switch(direction) {
				case "LEFT":
					barrage.setLocation(calcSpeed,null,startHeight,null);
					return 0;
				case "RIGHT":
					barrage.setLocation(null,calcSpeed,startHeight,null);
					return 0;
				case "TOP":
					barrage.setLocation(startWidth,null,calcSpeed,null);
					return 1;
				case "BOTTOM":
					barrage.setLocation(startWidth,null,null,calcSpeed);
					return 1;
			}
		}
		
		this.init = function(){
			this.append(layer);
		}

		this.init();
	};
	mofum.extend(MBarrage, MComponent);
	return MBarrage;
});