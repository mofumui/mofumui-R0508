;
define(["MComponent", "MPanel"], function(MComponent, MPanel) {
	/**
	 * 菜单项
	 * @param {Object} background 背景
	 */
	var MMenuItem = function(background, prevMenuItem) {
		this.dom = this.query("<div></div>", "MMenuItem");
		this.prev = prevMenuItem;
		this.setBackground(background);
		//菜单容器
		var menuItemContainer = new MPanel();
		var menuItems = new Array();
		//系统样式
		var styleSytemFlag = true;
		
		this.parent = null;
		
		var el = this;

		/**
		 * 设置系统样式
		 */
		this.setStyleSytemFlag = function(flag){
			styleSytemFlag = flag;
			return this;
		};

		/**
		 * 追加子菜单项
		 */
		this.appendMenuItem = function(menuItem) {
			return this.addMenuItem(menuItems.length, menuItem);
		};
		
		/**
		 * 添加子菜单项
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
			menuItemContainer.append(contaniner);
			return this;
		};

		/**
		 * 添加子菜单项内容
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
		 * 获得菜单项
		 */
		this.getMenuItem = function(index) {
			return menuItems[index];
		};
		
		/**
		 * 获得菜单容器
		 */
		this.getMenuItemContainer = function(){
			return menuItemContainer;
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
		 * 父级显示
		 */
		this.setParentContainerShow = function(flag){
			if(this.parent){
				this.parent.getMenuItemContainer().setVisible(flag);
				this.parent.setParentContainerShow(flag);
			}
		}

		
		/**
		 * 初始化菜单
		 */
		this.initMenuItem = function() {
			menuItemContainer.setVisible(false);
			this.setPositionModel("absolute");
			if(this.prev == null) {
				this.setBound(0, 0, this.getWidth(), this.getHeight());
			} else {
				var bound = this.prev.getBound();
				this.setBound(bound.x, bound.y + bound.height, this.getWidth(), this.getHeight());
			}
			this.setPadding(10, 10, null, null);
			menuItemContainer.setPositionModel("absolute");
			
			var el = this;
			
			menuItemContainer.handleHover(function(){
				menuItemContainer.setVisible(true);
				el.setParentContainerShow(true);
			},function(){
				el.setParentContainerShow(false);
				menuItemContainer.setVisible(false)
			});
			
			
			var el = this;
			this.handleHover(function(){
				el.getDom().parent().after(menuItemContainer.dom);
				var bound = el.parent.getMenuItemContainer().getBound();
				var sbound = el.getBound();
				menuItemContainer.setBound(bound.x + bound.width,bound.y+sbound.y,null,null);
				
				if(styleSytemFlag){
					menuItemContainer.setSize(bound.width,el.getHeight() * menuItems.length);
				}
				menuItemContainer.setVisible(true);
			},function(){
				menuItemContainer.setVisible(false);
			});
			this.append(menuItemContainer);
			
		};
		
		/**
		 * 批量初始化菜单
		 */
		this.setMenuItems = function(func){
			for(var i in menuItems){
				func(menuItems[i]);
			}
		};

		this.init();
		this.init = function() {
			this.initMenuItem();
		};

		this.init();
	};
	mofum.extend(MMenuItem, MComponent);
	return MMenuItem;
});