;
define(function() {
	/**
	 * 随机组件
	 */
	var MORandom = function() {
		/**
		 * 随机整数，从start 开始，end结束
		 */
		this.randNum = function(start,end){
			if(end <= start){
				throw "随机数不正确！";
			}
			
			return Math.floor(Math.random()*end+start)
		}
		
		/**
		 * 随机一个数组。且数组元素内容不重复,当3次未随机出正确的数时，则终止程序。
		 */
		this.randNoRepeatNum = function(start,end,size,count){
			var exisNums = new Array();
			var queryCount = -1;
			while(true){
				queryCount++;
				if(queryCount > count){
					break;
				}
				var num = this.randNum(start,end);
				var res = exisNums.join(",").indexOf(num); 
				
				if(res != -1){
					continue;
				}
				exisNums.push(num);
				if(exisNums.length == size){
					break;
				}
			}
			return exisNums;
		}
		
		/**
		 * 随机RGB的color颜色
		 */
		this.randColor = function(){
			var r = this.randNum(0,255);
			var g = this.randNum(0,255);
			var b = this.randNum(0,255);
			return "rgb(" + r+","+g+","+b+")";
		}
		
		/**
		 * 随机16进制的color颜色
		 */
		this.randHexColor = function(){
			var r = this.randNum(0,255).toString(16);
			var g = this.randNum(0,255).toString(16);
			var b = this.randNum(0,255).toString(16);
			
			if(r.length == 1){
				r += "0";
			}
			
			if(g.length == 1){
				r += "0";
			}
			
			if(b.length == 1){
				r += "0";
			}
			
			var color = "#"+r+g+b;
			return color;
		}
		
		/**
		 * 随机一个16进制颜色数组，且数据元素不重复
		 */
		this.randNoRepeatColor = function(size,count){
			var exisColors = new Array();
			var queryCount = -1;
			while(true){
				queryCount++;
				if(queryCount > count){
					break;
				}
				var color = this.randHexColor();
				var res = exisColors.join(",").indexOf(color); 
				
				if(res != -1){
					continue;
				}
				exisColors.push(color);
				if(exisColors.length == size){
					break;
				}
			}
			return exisColors;
		}
		
		/**
		 * 随机点坐标
		 */
		this.randPointData = function(x,y,w,h){
			var rx = this.randNum(x,w);
			var ry = this.randNum(y,h);
			return {"x":rx,"y":ry};
		}
	};
	mofum.extend(MORandom, Object);
	return MORandom;
});