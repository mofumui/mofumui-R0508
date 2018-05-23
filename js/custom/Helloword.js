;
define(function() {
	/**
	 * 定义自己的类
	 */
	var HelloWorld = function() {
		
		this.message =  "Hello World!";
		
		this.say = function(){
			console.log( 	this.message );
		}
	};
	mofum.extend(HelloWorld, Object);
	return HelloWorld;
});