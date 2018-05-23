;
define(["MComponent"], function(MComponent) {
	/**
	 * 旋转包装器
	 * @param {Object} background 背景
	 */
	var MWTransform = function(background) {
		this.dom = this.query("<div></div>", "MWTransform");
		this.setBackground(background);
		this.init();
		this.init = function() {

		};
		
		/**
		 * 矩阵变换
		 */
		this.matrix = function(m1, m2, m3, m4, dx, dy) {
			this.setStyle("transform", "matrix(" + m1 + "," + m2 + ", " + m3 + ", " + m4 + ", " + dx + ", " + dy + ")");
			this.setStyle("-ms-transform", "matrix(" + m1 + "," + m2 + ", " + m3 + ", " + m4 + ", " + dx + ", " + dy + ")");
			this.setStyle("-moz-transform", "matrix(" + m1 + "," + m2 + ", " + m3 + ", " + m4 + ", " + dx + ", " + dy + ")");
			this.setStyle("-webkit-transform", "matrix(" + m1 + "," + m2 + ", " + m3 + ", " + m4 + ", " + dx + ", " + dy + ")");
			this.setStyle("-O-transform", "matrix(" + m1 + "," + m2 + ", " + m3 + ", " + m4 + ", " + dx + ", " + dy + ")");
			
			var that = this;
			var ie6 = function(){
				that.setStyle("filter", "progid:DXImageTransform.Microsoft.Matrix ( enabled= 'true' , SizingMethod='auto expand' ,M11=" + m3 + ",M12=" + m4 + ", M21=" + m1 + ", M22=" + m2 + ",dx=" + dx + ", dy=" + dy + ")");
			}
			//IE 兼容
			mofum.ieCallback(ie6,ie6,ie6,function(){})
		}
		
		/**
		 * 旋转
		 */
		this.rotate = function(degs, dx, dy) {

			var m1 = Math.cos(degs / 180 * Math.PI);

			var m2 = Math.sin(degs / 180 * Math.PI);

			var m3 = -Math.sin(degs / 180 * Math.PI);

			var m4 = Math.cos(degs / 180 * Math.PI);

			if(!dx) {
				dx = 0;
			}

			if(!dy) {
				dy = 0;
			}

			this.matrix(m1, m2, m3, m4, dx, dy);
		}

		this.init();
	};
	mofum.extend(MWTransform, MComponent);
	return MWTransform;
});