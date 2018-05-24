;
define(["MComponent","MPanel"], function(MComponent,MPanel) {
	/**
	 * 面板
	 * @param {Object} background 背景
	 */
	var MLLayer = function(background) {
		this.dom = this.query("<div></div>","MLLayer");
		this.setBackground(background);
		var panels = new Object();
		
		/**
		 * 放入一个面板到LayerLayout中
		 */
		this.put = function(index,panel){
			if(panels[index] != null){
				panels[index].remove();
				panels[index] = null;
			}
			
			if(!panel){
				panel = new MPanel();
				panel.setFullToParent();
			}
			
			//创建一个容器
			var container = new MPanel();
			container.setPositionModel("absolute");
			container.setLayerIndex(index);
			container.setContent(panel);
			container.setFullToParent();
			
			
			panels[index] = panel;
			this.append(container);
			
			return panels[index];
		}
		
		/**
		 * 获得一个面板
		 */
		this.get = function(index){
			return panels[index];
		}
		
		this.init();
		
		this.init = function(){
			this.setFullToParent();
		};
		
		this.init();
		
	};
	mofum.extend(MLLayer, MComponent);
	return MLLayer;
});