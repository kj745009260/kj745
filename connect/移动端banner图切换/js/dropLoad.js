;(function($){
	$.fn.dropload = function(options){
       return new MyDropLoad($(this),options);
	}
	$.fn.dropload.deault = {
		domUp : {    // 上方DOM
	        domClass   : 'dropload-up',
	        domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
	        domUpdate  : '<div class="dropload-update">↑释放更新</div>',
	        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
	    },
	    domDown : {   // 下方DOM
	        domClass   : 'dropload-down',
	        domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
	        domUpdate  : '<div class="dropload-update">↓释放加载</div>',
	        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
	    },
	    distance : 50,        // 拉动距离
	    loadUpFn : '',        // 上方function
	    loadDownFn : ''       // 下方function
	}
	var MyDropLoad = function(element,options){
		var me = this;
		me.element = element;
		me.loading = false;
		me.settings = $.extend(true, $.fn.dropload.deault, options || {});
		me.settings.scrollArea = me.settings.scrollArea == undefined ? $(window):me.settings.scrollArea == window? $(window): me.settings.scrollArea;
        me.init();
	}
	MyDropLoad.prototype = {
		init: function(){
			var me = this;
			me.element.on('touchstart',function(e){
                me.fnGetTouch(e);
                me.fnTouchStart(e);
			})
		},
		fnGetTouch: function(e){
            if(!e.touches){
               e.touches = e.originalEvent.touches;
            }
		},
		fnTouchStart: function(e){
			var me = this;
			me.startY = e.touches[0].pageY;
			if()

		}
	}
})(jQuery)