/*
  __dirname: 当前文件所在的文件夹的路径
  __filename: 当前文件的路径
*/

//一个模块兼容Node、AMD、CMD以及常见的浏览器环境
;(function(name, definition){
	    //检测上下文环境是否为AMD、CMD
	var hasDefine = typeof define === 'function',
	    //检测上下文环境是否为Node
	    hasExports = typeof module !== 'undefined' && module.exports;

	if(hasDefine){
		define(definition);
	}else if(hasExports){
		module.exports = definition;
	}else{
		this[name] = definition;
	}
})('hello', function(){
	var hello = function(){ console.log('hello')};
	return hello;
});

//process.nextTick()优先级高于setImmediate()
process.nextTick(function(){
	console.log('nextTick延迟执行');
})
setImmediate(function(){
	console.log('setImmediate延迟执行');
})
console.log('正常执行');

//正常执行
//nextTick延迟执行
//setImmediate延迟执行