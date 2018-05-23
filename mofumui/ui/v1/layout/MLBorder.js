;
define(["MComponent","MPanel"], function(MComponent,MPanel) {
	/**
	 * 主框架
	 * @param {Object} background 背景
	 */
	var MLBorder = function() {
		this.dom = this.query("<div></div>","MLBorder");
		var panels = MPanel.list(5);
		
		/**
		 * 获得中间面板
		 */
		this.getCenter = function(){
			return panels[0];
		}
		
		/**
		 * 获得东部面板
		 */
		this.getEast = function(){
			return panels[1];
		}
		
		/**
		 * 获得西部面板
		 */
		this.getWest = function(){
			return panels[2];
		}
		
		/**
		 * 获得北部面板
		 */
		this.getNorth = function(){
			return panels[3];
		}
		
		/**
		 * 获得南部面板
		 */
		this.getSourth = function(){
			return panels[4];
		}
		
		/**
		 * 重新定义大小
		 */
		this.resize = function(){
			this.getNorth().setLocation(0,0,0,null);
			this.getSourth().setLocation(0,0,null,0);
			this.getEast().setLocation(null,0,
				this.getNorth().getHeight(),
				this.getSourth().getHeight()
			);
			this.getWest().setLocation(0,null,
				this.getNorth().getHeight(),
				this.getSourth().getHeight()
			);
			this.getCenter().setLocation(
				this.getWest().getWidth(),
				this.getEast().getWidth(),
				this.getNorth().getHeight(),
				this.getSourth().getHeight()
			);
		}
		
		//应用父级样式
		this.init();
		
		//重写父级样式
		this.init = function(){
			for(var i in panels){
				panels[i].setPositionModel("absolute");
				this.append(panels[i]);
			}
			this.setFullToParent();
			this.resize();
		};
		//更新样式
		this.init();
	};
	
	mofum.extend(MLBorder, MComponent);
	return MLBorder;
});