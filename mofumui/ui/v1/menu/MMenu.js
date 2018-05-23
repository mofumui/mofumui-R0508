;
define(["MComponent", "MPanel", "MMenuItem"], function(MComponent, MPanel, MMenuItem) {
	/**
	 * 面板
	 * @param {Object} background 背景
	 */
	var MMenu = function(background, prevMenuItem,width) {
		this.dom = this.query("<div></div>", "MMenu");
		this.prev = prevMenuItem;
		this.setBackground(background);
		//菜单容器
		var menuContainer = new MPanel();
		var menuItems = new Array();
		
		//内边距
		var ipadding = {"left":10,"right":10};
		
		//宽度
		var iwidth = width;
		
		//系统样式
		var styleSytemFlag = true;
		
		/**
		 * 设置系统样式
		 */
		this.setStyleSytemFlag = function(flag){
			styleSytemFlag = flag;
			return this;
		};
	
		/**
		 * 设置内边距
		 */
		this.setIPadding = function(padding){
			ipadding = padding;
		};
	
		/**
		 * 追加一列
		 */
		this.appendMenuItem = function(menuItem) {
			return this.addMenuItem(menuItems.length, menuItem);
		};
		
		/**
		 * 添加菜单
		 */
		this.addMenuItem = function(index, menuItem) {
			if(menuItems[index] != null) {
				menuItems[index].remove();
				menuItems[index] = null;
			}
			var contaniner = null;
			if(menuItem instanceof MMenuItem) {
				contaniner = menuItem;
				if(index == 0) {
					contaniner.prev = null;
				} else {
					contaniner.prev = menuItems[(index - 1)];
				}
			} else {
				if(index == 0) {
					contaniner = new MMenuItem();
				} else {
					contaniner = new MMenuItem(null, menuItems[(index - 1)]);
				}
				contaniner.append(menuItem);
			}
			contaniner.setHeight(this.getHeight());
			contaniner.setWidth(this.getWidth());
			contaniner.parent = this;
			
			menuItems[index] = contaniner;
			menuContainer.append(contaniner);
			return this;
		};

		/**
		 * 添加菜单数组
		 */
		this.addMenuItems = function(menuItems) {
			if(menuItems instanceof Array) {
				for(var index in menuItems) {
					this.addMenuItem(index, menuItems[index]);
				}
			}
			return this;
		};

		/**
		 * 获得菜单
		 */
		this.getMenuItem = function(index) {
			return menuItems[index];
		};
		
		/**
		 * 获得菜单容器
		 */
		this.getMenuItemContainer = function(){
			return menuContainer;
		}
		
		/**
		 * 设置高度
		 */
		this.setHeight = function(value) {
			var val = parseInt(value);
			this.setStyle("height", val + "px");
			this.setLineHeight(val);
			return this;
		};

		/**
		 * 设置宽度
		 */
		this.setWidth = function(value) {
			var val = parseInt(value);
			this.setStyle("width", val + "px");
			return this;
		}
		
		/**
		 * 设置父级显示
		 */
		this.setParentContainerShow = function(flag){
			if(this.parent){
				this.parent.getMenuItemContainer().setVisible(flag);
				this.parent.setParentContainerShow(flag);
			}
		}

		/**
		 * 初始化显示
		 */
		this.initMenu = function() {
			menuContainer.setVisible(false);
			this.setPositionModel("absolute");
			if(this.prev == null) {
				this.setBound(0, 0, this.getWidth(), this.getHeight());
			} else {
				var bound = this.prev.getBound();
				var p_l = parseInt(this.prev.getStyle("padding-left"));
				var p_r = parseInt(this.prev.getStyle("padding-right"));
				this.setBound(bound.x + bound.width + p_l + p_r, bound.y, this.getWidth(), this.getHeight());
			}
			this.setPadding(ipadding.left,ipadding.right, null, null);
			
			menuContainer.setPositionModel("absolute");
			
			
			var el = this;
			menuContainer.handleHover(function(){
				menuContainer.setVisible(true);
			},function(){
				menuContainer.setVisible(false);
			});
			
			
			this.handleHover(function(){
				el.getDom().parent().after(menuContainer.dom);
				var bound = el.getBound();
				menuContainer.setBound(bound.x,el.getHeight(),null,null);
				
				if(styleSytemFlag){
					menuContainer.setSize(bound.width,el.getHeight() * menuItems.length);
				}
				menuContainer.setVisible(true);
			},function(){
					menuContainer.setVisible(false);
			});
			this.append(menuContainer);
		};
		
		/**
		 * 批量设置菜单项
		 */
		this.setMenuItems = function(func){
			for(var i in menuItems){
				func(menuItems[i]);
			}
		};

		this.init();
		this.init = function() {
			this.setWidth(iwidth)
			this.setStyle("min-width","100px");
			this.initMenu();
		};

		this.init();
	};
	mofum.extend(MMenu, MComponent);
	return MMenu;
});