;
define(["MComponent"], function(MComponent) {
	/**
	 * 面板
	 * @param {Object} background 背景
	 */
	var MPanel = function(background) {
		this.dom = this.query("<div></div>","MPanel");
		this.setBackground(background);
		this.init();
	};
	mofum.extend(MPanel, MComponent);
	return MPanel;
});