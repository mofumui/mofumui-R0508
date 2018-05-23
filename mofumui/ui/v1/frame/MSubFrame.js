;
define(["MComponent","MFrame"], function(MComponent,MFrame) {
	/**
	 * 主框架
	 * @param {Object} background 背景
	 */
	var MSubFrame = function() {
		this.dom = this.query("<div><iframe frameborder='no'  border='0'  marginwidth='0'  marginheight='0' style='width:inherit;height:inherit;'></iframe></div>","MSubFrame");
		
		/**
		 * 设置frame Src源内容，同域下可以使用handle函数。
		 */
		this.setSrc = function(src,handle){
			var iframe = this.dom.children("iframe");
			iframe.attr("src",src);
			iframe.load(function(){
				var subFrame = new MFrame();
				subFrame.dom = subFrame.query(iframe.contents().find("body"),"MFrame");
				handle(subFrame);
			});
		};
		
		this.init();
	};
	mofum.extend(MSubFrame, MComponent);
	return MSubFrame;
});