;
define(["MComponent", "MPanel"], function(MComponent, MPanel) {
	/**
	 * 主框架
	 * @param {Object} background 背景
	 */
	var MLGrid = function(col, row) {
		this.dom = this.query("<div></div>", "MLGrid");
		
		//存放的面板
		var elements = new Object();
	
		//格子参数
		var options = new Object();

		//列
		var icol = col;
		
		//行
		var irow = row;

		/**
		 * 验证数据合法性
		 * @param {Object} col 列
		 * @param {Object} row 行
		 * @param {Object} colnum 列数
		 * @param {Object} rolnum 行数
		 */
		var vertify = function(col, row, colnum, rolnum) {
			if(col > icol) {
				throw "非法参数，请输入有效的值！"
			}

			if(row > irow) {
				throw "非法参数，请输入有效的值！"
			}

			if((col + colnum) > icol) {
				throw "非法参数，请输入有效的值！"
			}

			if((row + rolnum) > irow) {
				throw "非法参数，请输入有效的值！"
			}
			return true;
		}
		
		/**
		 * 计算宽度
		 * @param {Object} col 列
		 * @param {Object} colnum 列数
		 */
		var calcWidth = function(col,colnum){
			if((col+colnum) == icol){
				return  colnum * options.w + options.lw;
			}else{
				return  colnum * options.w;
			}
		};
		
		/**
		 * 计算高度
		 * @param {Object} row 行
		 * @param {Object} rownum 行数
		 */
		var calcHeight = function(row,rownum){
			if((row+rownum) == irow){
				return  rownum * options.h + options.lh;
			}else{
				return  rownum * options.h;
			}
		};

		/**
		 * 放入面板
		 */
		this.put = function(col, row, colnum, rownum, panel) {

			if(vertify(col, row, colnum, rownum)) {

				if(elements[col + "_" + row] != null) {
					elements[col + "_" + row].remove();
				}

				var container = new MPanel();
				container.setPositionModel("absolute");
				var finalWeight = calcWidth(col,colnum);
				var finalHeight = calcHeight(row,rownum);
				var startWeight = calcWidth(0,col);
				var startHeight = calcHeight(0,row);
				
				container.setStyle("left",startWeight + "%");
				container.setStyle("right", (100 - (startWeight + finalWeight)) + "%");
				container.setStyle("top",startHeight + "%");
				container.setStyle("bottom",(100 - (startHeight + finalHeight)) + "%");
				container.setContent(panel);
				
				elements[col + "_" + row] = container;
				this.append(elements[col + "_" + row]);
			}
			return elements[col + "_" + row];
		}
		
		/**
		 * 取出面板
		 */
		this.get = function(col,row){
			return elements[col + "_" + row];
		}

		/**
		 * 初始化参数
		 */
		this.initOptions = function() {
			options.w = Math.floor((100 / col) * 100) / 100;
			var wmodel = 100 - options.w * col;
			options.lw = options.w + wmodel > 0 ? wmodel : 0;

			options.h =  Math.floor((100 / row) * 100) / 100;
			var hmodel = 100 - options.h * row;
			options.lh = options.h + hmodel > 0 ? hmodel : 0;
		}
		
		/**
		 * 获得参数
		 */
		this.getOptions = function() {
			return options;
		}

		this.init();

		this.init = function() {
			this.initOptions();
			this.setFullToParent();
		}

		this.init();
	};
	mofum.extend(MLGrid, MComponent);
	return MLGrid;
});