;
define(["MComponent"], function(MComponent) {
	/**
	 * 过渡包装器
	 * @param {Object} background 背景
	 */
	var MWTransition = function(background) {
		this.dom = this.query("<div></div>", "MWTransition");
		this.setBackground(background);
		
		var props = new Array();

		this.transition = function(value) {
			this.setTransition(this,value);
		};
		
		this.setTransition = function(dom,value){
			dom.setStyle("transition", value);
			dom.setStyle("-ms-transition", value);
			dom.setStyle("-moz-transition", value);
			dom.setStyle("-webkit-transition", value);
			dom.setStyle("-o-transition", value);
		}
		
		this.prop = function(prop){
			props.push(prop);
			return this.comma();
		}
		
		this.append = function(value){
			props.push(value);
			return this;
		}
		
		this.del = function(){
			props.pop();
			return this;
		}
		
		this.comma = function(){
			props.push(",");
			return this;
		}
		
		this.build = function(){
			return props.join("");
		}
		

		this.copyBind = function(dom, value) {
			if(dom instanceof MComponent) {
				this.setTransition (dom,value);
			}
		};

		this.init();
	};

	/**
	 * 销毁过渡效果
	 * @param {Object} dom
	 */
	MWTransition.destroy = function(dom) {
		if(dom instanceof MComponent) {
			dom.setStyle("transition", "");
		}
	};
	mofum.extend(MWTransition, MComponent);
	return MWTransition;
});