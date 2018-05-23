;
define(["MComponent"], function(MComponent) {
	/**
	 * 主框架
	 * @param {Object} background 背景
	 */
	var MFrame = function(background) {
		this.bodydom = this.query("body","MFrame");
		this.htmldom = this.query("html");
		this.setBackground(background);
		this.dom = this.bodydom;
		/**
		 * 设置为定位后的大小
		 */
		this.setPositionSize = function(){
			if(this.getPositionModel() == 'static') {
				throw "该组件不支持定位，原因是组件定位模式为static。";
			}
			this.dom = this.htmldom;
			this.setFullToParent();
			this.dom = this.bodydom;
			this.setFullToParent();
			return this;
		};
		this.init();
	};
	mofum.extend(MFrame, MComponent);
	return MFrame;
});