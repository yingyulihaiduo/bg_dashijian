// 吧api总接口抽到一个js文件中

$.ajaxPrefilter(function(options){
	options.url='http://www.liulongbin.top:3007'+options.url
})