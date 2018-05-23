![MOFUM-UI](https://gitee.com/uploads/images/2018/0514/113955_2be0af3f_1183052.png "MofumUI设计.png")
一款基于JQuery，Requare框架的建立起来的具有面向对象特性的便于灵活组织各个组件的UI框架。用极少的代码和语言去组织网页内容。它是一个以JS渲染界面为主的界面库，也就是使用它你可以尽量避免写HTML,CSS代码。且很少关心浏览器的兼容问题。

虽然我们基于JQuery,但是我们并不是JQuery那种传统写法，只是运用它操作DOM。如果你非常喜欢JQuery的组织方式，我们也提供了相关的方法可以直接和JQuery进行互动。


 **使用方式** 

```
<script type="text/javascript" src="../../js/mofumui.js" ></script>
```

 **第一个程序** 

```
<script type="text/javascript">
			
	//设置js的路由。
	mofum.setPrefix("../../");
	mofum.imports(["MFrame"],function(MFrame){
		
		//创建框架
		var frame = new MFrame("#f00");
		
		//设置文本
		frame.setContent("Hello World!");
		
	});
	
</script>
```

是的我们的例子很简单，因为这就是我们要做的事情。你可以像JAVA一样写代码。对此我们提供了一些API的Word文档和PPT，以便于你更快的理解。其他分支上有一些有趣的例子，比如贪吃蛇，轮播等等。这些例子会根据项目发布的进度进一步更改。除此之外，你还可以定义自己的组件。怎么定义组件，已经在custom目录有详细的例子说明。




