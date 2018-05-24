;
define(["MComponent"], function(MComponent) {
	/**
	 * 自由布局
	 * @param {Object} background 背景
	 */
	var MLFree = function(background) {
		this.dom = this.query("<div></div>","MLFree");
		this.setBackground(background);
		
		/**
		 * 放入一个组件，组件，坐标x,坐标y,显示层z
		 */
		this.put = function(dom,x,y,z){
			if(!x){
				x = 0;
			}
			
			if(!y){
				y = 0;
			}
			
			if(!z){
				z = 0;
			}
			
			if(dom instanceof MComponent){
				
				dom.setPositionModel("absolute");
				
				dom.setLocation(x,null,y,null);
				
				dom.setLayerIndex(z);
				
				this.append(dom);
			}
			
		};
		
		
		this.init();
	};
	mofum.extend(MLFree, MComponent);
	return MLFree;
});