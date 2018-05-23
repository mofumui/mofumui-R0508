;
define(["MComponent"], function(MComponent) {
	/**
	 * 盒子包装器
	 * @param {Object} background 背景
	 */
	var MWBox = function(background) {
		this.dom = this.query("<div></div>","MWBox");
		this.setBackground(background);
		this.init();
		this.init = function(){
			this.setStyle("margin","0 auto");
		};
		this.init();
	};
	mofum.extend(MWBox, MComponent);
	return MWBox;
});