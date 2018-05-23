;
define(["MComponent","MLBorder"], function(MComponent,MLBorder) {
	/**
	 * 窗口面板
	 * @param {Object} background 背景
	 */
	var MPWindow = function(background) {
		this.dom = this.query("<div></div>","MPWindow");
		this.setBackground(background);
		
		//边框
		var border = new MLBorder();
		
		this.init();
		
		//设置内容
		this.setContent = function(value){
			border.getCenter().setContent(value);
			return this;
		};
		
		//获得标题
		this.getTitle = function(){
			return border.getNorth();
		};
		
		//获得底部
		this.getFooter = function(){
			return border.getSourth();
		}
		
		//获得左边
		this.getLeft = function(){
			return border.getWest();
		}
		
		//获得右边
		this.getRight = function(){
			return border.getEast();
		}
		
		//获得内容
		this.getContent = function(){
			return border.getCenter();
		}
		
		//设置标题高度
		this.setTitleHeight = function(value){
			border.getNorth().setHeight(value);
			border.getNorth().setLineHeight(value);
			border.resize();
			return this;
		};
		
		//设置标题内容
		this.setTitleContent = function(value){
			border.getNorth().setContent(value);
			return this;
		};
		
		//设置底部高度
		this.setFooterHeight = function(value){
			border.getSourth().setHeight(value);
			border.getSourth().setLineHeight(value);
			border.resize();
			return this;
		};
		
		//设置左边内容
		this.setLeftContent = function(value){
			border.getWest().setContent(value);
			return this;
		};
		
		//设置右边内容
		this.setRightContent = function(value){
			border.getEast().setContent(value)
			return this;
		};
		
		//设置左边宽
		this.setLeftWidth = function(value){
			border.getWest().setWidth(value);
			border.resize();
			return this;
		};
		
		//设置右边宽
		this.setRightWidth = function(value){
			border.getEast().setWidth(value);
			border.resize();
			return this;
		};
		
		//设置底部内容
		this.setFooterContent = function(value){
			border.getSourth().setContent(value);
			return this;
		};
		
		//获得边框布局
		this.getBorder = function(){
			return border;
		}
		
		
		this.init = function(){
			this.append(border);
//			border.resize();
		}
		
		this.init();
	};
	mofum.extend(MPWindow, MComponent);
	return MPWindow;
});