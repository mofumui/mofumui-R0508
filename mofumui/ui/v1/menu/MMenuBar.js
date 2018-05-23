;
define(["MComponent","MMenu"], function(MComponent,MMenu) {
	/**
	 * 菜单栏
	 * @param {Object} background 背景
	 */
	var MMenuBar = function(background) {
		this.dom = this.query("<div></div>","MMenuBar");
		this.setBackground(background);
		var menus = new Array();
		
		/**
		 * 追加菜单
		 */
		this.appendMenu = function(menu){
			return this.addMenu(menus.length,menu);
		};
		
		/**
		 * 添加菜单
		 */
		this.addMenu = function(index,menu){
			if(menus[index] != null){
				menus[index].remove();
				menus[index] = null;
			}
			var contaniner = null;
			if(menu instanceof MMenu){
				 contaniner = menu;
				 if(index == 0){
					contaniner.prev = null;
				}else{
					contaniner.prev = menus[(index-1)];
				}
			}else{
				if(index == 0){
					contaniner = new MMenu();
				}else{
					contaniner = new MMenu(null,menus[(index-1)]);
				}
				contaniner.append(menu);
			}
			contaniner.setHeight(this.getHeight());
			menus[index] = contaniner;
			this.append(contaniner);
			return this;
		};
		
		/**
		 * 添加Menu数组
		 */
		this.addMenus = function(menus){
			if(menus instanceof Array){
				for(var index in menus){
					this.addMenu(index,menus[index]);
				}
			}
			return this;
		};
		
		/**
		 * 获得菜单
		 */
		this.getMenu = function(index){
			return menus[index];
		};
		
		/**
		 * 设置高度
		 */
		this.setHeight = function(value){
			var val = parseInt(value);
			this.setStyle("height", val + "px");
			this.setLineHeight(val);
			return this;
		};
		
		/**
		 * 设置菜单
		 */
		this.setMenus = function(func){
			for(var i in menus){
				func(menus[i]);
			}
			return this;
		}
		
		this.init();
		this.init = function(){
			this.setStyle("width","100%");
		};
		this.init();
	};
	mofum.extend(MMenuBar, MComponent);
	return MMenuBar;
});