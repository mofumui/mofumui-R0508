;
define(["MComponent"], function(MComponent) {
	/**
	 * 移动包装器
	 * @param {Object} background 背景
	 */
	var MWMove = function(background) {
		this.dom = this.query("<div></div>", "MWMove");
		this.setBackground(background);
		//按下状态
		var isDown = false;
		
		this.init();
		
		//初始化移动
		this.initMove = function() {
			var el = this;
			this.handle("mousedown", function(e) {
				//获取x坐标和y坐标
				var x = e.clientX;
				var y = e.clientY;

				//获取左部和顶部的偏移量
				var moveLeft = el.getHTMLDom().offsetLeft;
				var moveTop = el.getHTMLDom().offsetTop;
				//开关打开
				isDown = true;
				//设置样式  
				el.setStyle("cursor", "move");

				el.handle("mousemove", function(e) {
					if(isDown == false) {
						return;
					}
					//获取x和y
					var nx = e.clientX;
					var ny = e.clientY;
					//计算移动后的左偏移量和顶部的偏移量
					var nl = nx - (x - moveLeft);
					var nt = ny - (y - moveTop);

					el.setLocation(nl, null, nt, null);
				});
			});

			this.handle("mouseup", function(e) {
				el.unbind("mousemove");
				//开关打开
				isDown = true;
				//设置样式  
				el.setStyle("cursor", "default");
			});

		};

		this.init = function() {
			this.initMove();
		};

		this.init();
	};
	mofum.extend(MWMove, MComponent);
	return MWMove;
});