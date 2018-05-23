;
/**
 * 定义组件 
 */
define(["jQuery"], function($) {
	/**
	 * 组件类
	 * @param {Object} selector 选择器
	 * @param {Object} clazzName 类名
	 */
	var MComponent = function(selector, clazzName) {
		/** 获得 */
		var className = "MComponent";

		/** 父级大小组件状态 */
		var parentSizeExtendFlag = false;

		/** 当前组件注册的事件 */
		var eventsName = new Object();

		this.query = function(selector, clazzName) {
			var obj = mofum.ui(selector);
			className = clazzName;
			obj.attr("data-mclass", className);
			return obj;
		};

		/** 当前文档 */
		this.dom = this.query(selector, clazzName);
		this.q = this.query;

		/**
		 * 设置背景
		 */
		this.setBackground = function(value) {
			this.setStyle("background",value);
			return this;
		};
		
		/**
		 * 设置背景图片
		 */
		this.setBackgroundImage = function(image,attachment,position,repeat) {
			if(mofum.isNotNull(image)){
				this.setStyle("background-image","url("+image+")");
			}
			if(mofum.isNotNull(attachment)){
				this.setStyle("background-attachment",attachment);
			}
			if(mofum.isNotNull(position)){
				this.setStyle("background-position",position);
			}
			if(mofum.isNotNull(repeat)){
				this.setStyle("background-repeat",repeat);
			}
			return this;
		};

		/**
		 * 设置高度
		 */
		this.setHeight = function(value) {
			var val = parseInt(value);
			this.setStyle("height", val + "px");
			return this;
		};

		/**
		 * 设置宽度
		 */
		this.setWidth = function(value) {
			var val = parseInt(value);
			this.setStyle("width", val + "px");
			return this;
		};

		/**
		 * 获得组件高度
		 */
		this.getHeight = function() {
			var val = this.getStyle("height");
			
			if(parseInt(val) == 0){
				val = this.getStyle("min-height");
			}
			
			if(parseInt(val) == 0){
				val = this.getHTMLDom().offsetWidth;
			}
			return mofum.replacePx(val);
		};

		/**
		 * 获得组件宽度
		 */
		this.getWidth = function() {
			var val = this.getStyle("width");
			
			if(parseInt(val) == 0){
				val = this.getStyle("min-width");
			}
			
			if(parseInt(val) == 0){
				val = this.getHTMLDom().offsetWidth;
			}
			return mofum.replacePx(val);
		};

		/**
		 * 设置组件大小
		 */
		this.setSize = function(width, height) {
			if(arguments.length == 1) {
				if(arguments[0] instanceof Array) {
					if(arguments[0].length == 2) {
						this.setWidth(arguments[0][0]);
						this.setHeight(arguments[0][1]);
					} else {
						throw "参数长度不正确";
					}
				} else if(typeof arguments[0] == 'object') {
					this.setWidth(arguments[0].width);
					this.setHeight(arguments[0].height);
				}
			} else {
				this.setWidth(width);
				this.setHeight(height);
			}
			return this;
		};

		/**
		 * 将组件设置为父级组件大小
		 */
		this.setFullToParent = function() {
			this.setStyle("width", "100%");
			this.setStyle("height", "100%");
			parentSizeExtendFlag = true;
			return this;
		};

		/**
		 * 返回继承父级大小状态
		 */
		this.isParentSize = function() {
			return parentSizeExtendFlag;
		};

		/**
		 * 设置显示Y轴滚动条
		 */
		this.setYScrollbarVisible = function(flag) {
			if(flag) {
				this.setStyle("overflow-y", "auto")
			} else {
				this.setStyle("overflow-y", "hidden")
			}
			return this;
		};

		/**
		 * 设置显示X轴滚动条
		 */
		this.setXScrollbarVisible = function(flag) {
			if(flag) {
				this.setStyle("overflow-x", "auto")
			} else {
				this.setStyle("overflow-x", "hidden")
			}
			return this;
		};

		/**
		 * 设置滚动条显示
		 */
		this.setScrollbarVisible = function(flag) {
			this.setYScrollbarVisible(flag);
			this.setXScrollbarVisible(flag);
			return this;
		};
		
		/**
		 * 设置组件显示状态
		 */
		this.setVisible = function(flag){
			if(flag){
				this.dom.show();
			}else{
				this.dom.hide();
			}
		}
		
		/**
		 * 操作Hover事件
		 */
		this.handleHover = function(func,func2){
			this.dom.hover(func,func2);
			eventsName["hover"] = "hover";
		}

		/**
		 * 设置透明度
		 */
		this.setOpaque = function(value) {
			if(value > 1) {
				var otherValue = value / 100.0;
				this.setStyle("opacity", otherValue);
				this.setStyle("filter", "alpha(opacity=" + value + ")");
			} else {
				var ieValue = value * 100;
				this.setStyle("opacity", value);
				this.setStyle("filter", "alpha(opacity=" + ieValue + ")");
			}
			return this;
		};

		/**
		 * 设置字体
		 */
		this.setFont = function(fonts) {
			this.setStyle("font", fonts);
			return this;
		};

		/**
		 * 设置字体颜色
		 */
		this.setFontColor = function(color) {
			this.setStyle("color", color);
			return this;
		};

		/**
		 * 设置字体大小
		 */
		this.setFontSize = function(size) {
			this.setStyle("font-size", size)
			return this;
		};

		/**
		 * 设置字体的粗细。
		 */
		this.setFontWeight = function(weight) {
			this.setStyle("font-weight", weight)
			return this;
		};

		/**
		 * 设置组件在父级组件中的位置
		 */
		this.setLocation = function(left, right, top, bottom) {
			if(this.getPositionModel() == 'static') {
				throw "该组件不支持定位，原因是组件定位模式为static。";
			};

			if(mofum.isNotNull(left) || typeof left == 'number') {
				var val = parseInt(left);
				this.setStyle("left",  val + "px");
			}

			if(mofum.isNotNull(right) || typeof right == 'number') {
				var val = parseInt(right);
				this.setStyle("right",  val + "px");
			}

			if(mofum.isNotNull(top) || typeof top == 'number') {
				var val = parseInt(top);
				this.setStyle("top",  val + "px")
			}

			if(mofum.isNotNull(bottom) || typeof bottom == 'number') {
				var val = parseInt(bottom);
				this.setStyle("bottom", val + "px")
			}

			return this;
		};

		/**
		 * 获得组件在父级组件中的位置
		 */
		this.getLocation = function() {
			var locationOffset = new Object();
			
			var val = this.getStyle("left");
			locationOffset.left = mofum.replacePx(val);
			
			val = this.getStyle("right");
			locationOffset.right = mofum.replacePx(val);
			
			val = this.getStyle("top");
			locationOffset.top = mofum.replacePx(val);
			
			val = this.getStyle("bottom");
			locationOffset.bottom = mofum.replacePx(val);
			
			return locationOffset;
		};

		/**
		 * 设置组件的边界大小
		 */
		this.setBound = function(x,y,width,height) {
			if(this.getPositionModel() == 'static') {
				throw "该组件不支持定位，原因是组件定位模式为static。";
			};
			this.setLocation(x,null,y,null);
			this.setSize(width,height);
			return this;
		};

		/**
		 * 获得组件的边界大小
		 */
		this.getBound = function() {
			var bound = new Object();
			var locationOffset = this.getLocation();
			
			bound.x = locationOffset.left;
			bound.y = locationOffset.top;
			
			bound.width = this.getWidth();
			bound.height = this.getHeight();
			
			return bound;
		};
		
		/**
		 * 设置内边距
		 */
		this.setPaddingAll = function(value){
			return this.setPadding(value,value,value,value);
		};
		
		/**
		 * 设置内边距
		 */
		this.setPadding = function(left,right,top,bottom){
			if(mofum.isNotNull(left) || typeof left == 'number') {
				var val = parseInt(left);
				this.setStyle("padding-left",  val + "px");
			}

			if(mofum.isNotNull(right) || typeof right == 'number') {
				var val = parseInt(right);
				this.setStyle("padding-right",  val + "px");
			}

			if(mofum.isNotNull(top) || typeof top == 'number') {
				var val = parseInt(top);
				this.setStyle("padding-top",  val + "px")
			}

			if(mofum.isNotNull(bottom) || typeof bottom == 'number') {
				var val = parseInt(bottom);
				this.setStyle("padding-bottom", val + "px")
			}
			return this;
		};
		
		/**
		 * 设置首行缩进
		 */
		this.setTextIndent = function(value){
			var val = parseInt(value);
			this.setStyle("text-indent", val + "px");
			return this;
		};
		
		/**
		 * 获得首行缩进
		 */
		this.getTextIndent = function(){
			var val = this.getStyle("text-indent");
			return mofum.replacePx(val);
		};
		
		/**
		 * 获得文本对齐方式
		 */
		this.getTextAlign = function(){
			var val = this.getStyle("text-align");
			return val;
		};
		
		/**
		 * 获得文本对齐方式
		 */
		this.setTextAlign = function(val){
			var val = this.getStyle("text-align",val);
			return this;
		};

		/**
		 * 从网页中移除此元素和组件。
		 */
		this.remove = function() {
			this.dom.remove();
		};

		/**
		 * 设置组件的HTML 元素属性
		 */
		this.setProperty = function(key,value) {
			this.dom.prop(key,value);
			return this;
		};

		/**
		 * 设置组件的HTML 元素属性
		 */
		this.setAttribute = function(key,value) {
			this.dom.attr(key,value);
			return this;
		};

		/**
		 * 设置组件的HTML 元素属性
		 */
		this.setAttr = function(key,value) {
			this.dom.attr(key,value);
			return this;
		};

		/**
		 * 设置组件的HTML 元素属性
		 */
		this.setProp = function(key,value) {
			this.dom.prop(key,value);
			return this;
		};

		/**
		 * 获得组件的HTML 元素属性
		 */
		this.getProperty = function(key) {
			return this.dom.prop(key);
		};

		/**
		 * 获得组件的HTML 元素属性
		 */
		this.getAttribute = function(key) {
			return this.dom.attr(key);
		};

		/**
		 * 获得组件的HTML 元素属性
		 */
		this.getAttr = function(key) {
			return this.dom.attr(key);
		};

		/**
		 * 获得组件的HTML 元素属性
		 */
		this.getProp = function(key) {
			return this.dom.prop(key);
		};

		/**
		 * 处理此组件的各种事件
		 */
		this.handle = function(ename,func) {
			if(arguments == 1){
				return this.trigger(ename);
			};
			this.dom.on(ename,function(e){
				func(e);
			});
			eventsName[ename] = ename;
			return this;
		};

		/**
		 * 注册此组件的事件
		 */
		this.register = function(ename,func) {
			this.dom.on(ename,function(e){
				func(e);
			});
			eventsName[ename] = ename;
			return this;
		};
		
		/**
		 * 解绑事件 多个事件由逗号分隔
		 */
		this.unbind = function(eventName,func){
			eventsName[eventName] = null;
			this.dom.unbind(eventName,func)
		};

		/**
		 * 触发此组件的事件
		 */
		this.trigger = function(eventName,params) {
			if(params instanceof Array){
				this.dom.trigger(eventName,params)
			}else{
				this.dom.trigger(eventName,[params]);
			}
			eventsName[eventName] = eventName;
			return this;
		};

		/**
		 * 获得当前组件已经注册的事件名称
		 */
		this.getEventsName = function() {
			return eventsName;
		};

		/**
		 * 设置当前组件的样式
		 */
		this.setStyle = function(style, value) {
			if(arguments.length == 1) {
				if(arguments[0] instanceof Array) {
					if(arguments[0].length == 2) {
						this.dom.css(arguments[0][0], arguments[0][1]);
					} else {
						throw "参数长度不正确";
					}
				} else if(typeof arguments[0] == 'object') {
					this.dom.css(arguments[0].style, arguments[0].value);
				}
			} else {
				this.dom.css(style, value);
			}
			return this;
		};

		/**
		 * 设置当前组件的样式
		 */
		this.css = function(style, value) {
			this.dom.css(style, value);
		};

		/**
		 * 获得当前组件的样式
		 */
		this.getStyle = function(style) {
			return this.dom.css(style);
		};

		/**
		 * 添加组件的样式类
		 */
		this.addClass = function(option) {
			if(option[0] instanceof Array) {
				for(var i in option) {
					var temp = option[i];
					this.dom.addClass(temp);
				}
			} else if(typeof option == 'function') {
				this.dom.addClass(function(index, oldclass) {
					option(index, oldclass);
				});
			} else {
				this.dom.addClass(option);
			}
			return this;
		};

		/**
		 * 为该组件添加可切换的样式类
		 */
		this.toggleClass = function(option) {
			if(typeof option == 'function') {
				this.dom.toggleClass(function(index, oldclass) {
					option(index, oldclass);
				}, arguments[1]);
			} else {
				this.dom.toggleClass(option, arguments[1]);
			}
			return this;
		};

		/**
		 * 当前组件是否拥有某个样式类
		 */
		this.hasClass = function(clazz) {
			return this.dom.hasClass(clazz);
		};

		/**
		 * 移除作用于该组件的样式类
		 */
		this.removeClass = function(clazz) {
			this.dom.removeClass(clazz);
			return this;
		};
		
		/**
		 * 设置行高
		 */
		this.setLineHeight = function(value){
			var val = parseInt(value);
			this.setStyle("line-height",  val + "px");
			return this;
		};
		
		/**
		 * 获得行高
		 */
		this.getLineHeight = function(){
			var val = this.getStyle("line-height");
			return mofum.replacePx(val);
		};

		/**
		 * 设置组件的内容或组件
		 */
		this.setContent = function(value) {
			if(value instanceof MComponent){
				this.dom.html(value.dom);
			}else{
				this.dom.html(value);
			}
			return this;
		};

		/**
		 * 获得组件的内容或组件
		 */
		this.getContent = function() {
			return this.dom.html();
		};

		/**
		 * 追加内容或组件，当前组件文档内末尾追加
		 */
		this.append = function(value) {
			if(value instanceof MComponent){
				this.dom.append(value.dom);
			}else{
				this.dom.append(value);
			}
			return this;
		};

		/**
		 * 追加内容或组件，当前组件文档内最前追加
		 */
		this.prepend = function(value) {
			if(value instanceof MComponent){
				this.dom.prepend(value.dom);
			}else{
				this.dom.prepend(value);
			}
			return this;
		};

		/**
		 * 当前组件文档外追加内容
		 */
		this.afterAppend = function(value) {
			if(value instanceof MComponent){
				this.dom.after(value.dom);
			}else{
				this.dom.after(value);
			}
			return this;
		};

		/**
		 * 当前组件文档外追加内容
		 */
		this.beforeAppend = function(value) {
			if(value instanceof MComponent){
				this.dom.before(value.dom);
			}else{
				this.dom.before(value);
			}
			return this;
		};

		/**
		 * 获得JQuery Dom 
		 */
		this.getDom = function() {
			return this.dom;
		};

		/**
		 * 获得HTML Dom
		 */
		this.getHTMLDom = function() {
			return this.dom.get(0);
		};

		/**
		 * 获得组件对象的类名
		 */
		this.getObjectClassName = function() {
			return className;
		};
		
		/**
		 * 设置组件的显示方式
		 */
		this.setDisplay = function(value){
			this.setStyle("display",value)
			return this;
		};
		
		/**
		 * 获得组件的显示方式
		 */
		this.getDisplay = function(){
			return this.getStyle("display");
		};

		/**
		 * 设置组件的定位模型：absolute,relative,fixed,static
		 */
		this.setPositionModel = function(value) {
			this.setStyle("position", value)
			return this;
		};

		/**
		 * 获得组件的定位模型。
		 */
		this.getPositionModel = function() {
			return this.getStyle("position");
		};
		
		/**
		 * 设置为定位后的大小
		 */
		this.setPositionSize = function(){
			if(this.getPositionModel() == 'static') {
				throw "该组件不支持定位，原因是组件定位模式为static。";
			}
			this.setLocation(0,0,0,0);
			return this;
		};
		
		
		/**
		 * 设置显示层
		 */
		this.setLayerIndex = function(index){
			if(this.getPositionModel() == 'static') {
				throw "该组件不支持定位，原因是组件定位模式为static。";
			}
			
			this.setStyle("z-index",index);
			
			return this;
		};
		
		/**
		 * 获得当前组件的显示层
		 */
		this.getLayerIndex = function(){
			return this.getStyle("z-index");
		};
		
		
		/**
		 * 组件界面初始化
		 */
		this.init = function() {
			this.setStyle("border", "0px");
			this.setStyle("margin", "0px");
			this.setStyle("padding", "0px");
			this.setStyle("position", "relative");
			this.setScrollbarVisible(false);
		};
		
		/**
		 * 动画
		 */
		this.animate = function(params,speed,callback){
			this.dom.animate(params,speed,callback);
			return this;
		}
		
		/**
		 * 位于元素中间
		 */
		this.frameCenter = function(parent){
			
			if(parent && parent instanceof MComponent){
				
				var width = parent.getWidth() - this.getWidth();
				
				var height = parent.getHeight() - this.getHeight();
				
				(function(width,height,el){
					return function(){
						el.setLocation(Math.floor(width/2),null,Math.floor(height/2),null)
					}();
				}(width,height,this));
				
			}
		};
		
		this.init();
	};

	mofum.extend(MComponent, Object);
	mofum.ui = jQuery;
	return MComponent;
});