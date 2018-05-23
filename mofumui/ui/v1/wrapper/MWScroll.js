;
define(["MComponent"], function(MComponent) {
	/**
	 * 滚动条包装器
	 * @param {Object} background 背景
	 */
	var MWScroll = function(background) {
		this.dom = this.query("<div></div>","MWScroll");
		this.setBackground(background);
		this.init();
		//动画状态
		var isAnimate = false;
		//滚动状态
		var isOnScroll = false;
		
		this.init = function(){
			this.setStyle("margin","0 auto");
		};
		
		/**
		 * 当滚动条滚动时触发
		 */
		this.onScroll = function(func){
			this.unbind("scroll");
			var el = this.dom;
			isOnScroll = true;
			this.dom.scroll(function(){
				if(func && typeof func == "function" && !isAnimate){
					func(el.scrollLeft(),el.scrollTop());
					isOnScroll = false;
				}
			});
		};
		
		/**
		 * 设置滚动条位置
		 */
		this.setScrollPosition = function(left,top,ms){
			if(isOnScroll){
				return;
			}
			isAnimate = true;
			this.dom.animate({scrollTop:top,scrollLeft:left},ms,function(){
				isAnimate = false;
			});
		};
		
		this.init();
	};
	mofum.extend(MWScroll, MComponent);
	return MWScroll;
});