//导入公共的Common.js
importScripts("../../../../mofumui/ui/common.js");
//创建一个客户端Runable
var runable = new MClientRunable();

//处理接收数据
runable.receive(function(e){
	//处理 字符串转MOTimer函数
	var MOTimer = eval("(true&&"+e.data+")");
	
	//创建定时器
	var timer = new MOTimer();

	//设置任务
	timer.setTask(function(counter) {
		runable.send(counter);
	});

	//启动任务
	timer.start();
});