(function(){
	$.fn.banner = function(options){
         return new Banner($(this),options);
	}
	$.fn.banner.default = {
        'imgW':450,
        'imgH':281
	}
	var Banner = function(element,options){
       var me = this;
       me.settings = $.extend({},$.fn.banner.default,options || {});
       console.log(me.settings);
       me.element = element;
       me.window = $(window);
       me.ul = me.element.find('ul');
       me.li = me.ul.find('li');
       me.lilen = me.li.length;

       me.dragStart = null;  // 抓取标志
       me.gragPercentage = 0; // 拖动量的百分比
       me.dragThreshold = 0.5; //拖动临界值
       me.currentItem = 0;  //当前item

       me.animate = {
       	  'leftDrag': function(){
              me.currentItem.css('-webkit-transform','translate3d('+me.gragPercentage*100+'%,0,0)');
              var next = me.currentItem.index() == me.lilen-1? 0: me.currentItem.index()+1;
              me.li.eq(next).css('-webkit-transform','translate3d('+(100+me.gragPercentage*100)+'%,0,0)');
       	  },
       	  'rightDrag': function(){
              me.currentItem.css('-webkit-transform','translate3d('+me.gragPercentage*100+'%,0,0)');
              var prev = me.currentItem.index() == 0? me.lilen-1: me.currentItem.index()-1;
              me.li.eq(prev).css('-webkit-transform','translate3d('+(-100+me.gragPercentage*100)+'%,0,0)');
       	  },
       	  'nextItem': function(){
       	  	  var index = me.currentItem.index() == me.lilen-1? 0: me.currentItem.index()+1;
              me.changeCss(index);
              // me.transitionEvent();
       	  },
       	  'prevItem': function(){
              var index = me.currentItem.index() == 0? me.lilen-1: me.currentItem.index()-1;
              me.changeCss(index);
              // me.transitionEvent();
       	  },
       	  'showItem': function(){
              me.changeCss(me.currentItem.index());
              // me.transitionEvent();
       	  }
       }

       me.initDom();
       me.initEvent();

       // me.autoTimer = setInterval(function(){
       // 	    me.auto(me);
       // },3000);
	}
	Banner.prototype = {
	   'initDom': function(){
	   	   var me = this;
	   	   var boxHeight = Math.ceil(me.window.width()*me.settings.imgH/me.settings.imgW);
           me.element.css('height',boxHeight+'px');
           me.ul.css({
           	  'width':me.window.width()*me.lilen + 'px',
           	  'height': boxHeight+'px'
           });
           me.li.css('width',me.window.width()+'px');
           me.addList();
           me.list = me.element.find('.list').find('span');
           me.list.eq(0).addClass('active');
           me.changeCss(0);
           // $('body').append('<div class="overlay"></div>');
	   },
	   'addList': function(){
           var boxlist = '<div class="list">';
           for(var i=0; i<this.lilen; i++){
           	   boxlist += '<span></span>';
           }
           boxlist += '</div>';
           this.element.append(boxlist);
	   },
	   'initEvent': function(){
	   	   var me = this;
	   	   me.element.on({
	   	   	 'touchstart': function(event){ me.touchStart(event,me);},
	   	   	 'touchmove': function(event){ me.touchMove(event,me);},
	   	   	 'touchend': function(event){ me.touchEnd(event,me);},
	   	   	 'touchcancel': function(event){ me.touchEnd(event,me);}
	   	   });
         // $('.overlay').on('click', function(){
         //     $('.overlay').hide();
         // });
	   },
	   'touchStart': function(e,me){console.log(11);
	   	    // clearInterval(me.autoTimer);
          e = e || window.event;
          if(me.dragStart !== null) return;
          me.currentItem = $(e.target).closest('li');
          if(!me.currentItem.length){
             // $('.overlay').hide();
             return;
          }
          me.dragStart = e.originalEvent.touches[0].clientX;
          me.li.addClass('no-animation');
	   },
     'transitionEvent': function(){
          // this.currentItem.on('transitionend webkitTransitionEnd', function(){
          //     $('.overlay').hide();
          // })
     },
	   'touchMove': function(e,me){
	   	    e = e || window.event;
          e.preventDefault(); //防止ios拖动事件
          me.currentItem = $(e.target).closest('li');
          if(!me.currentItem.length){
             // $('.overlay').hide();
             return;
          }
          me.gragPercentage = (e.originalEvent.touches[0].clientX - me.dragStart)/ me.window.width();
          me.changeCss(me.currentItem.index());
          if(me.gragPercentage>0){  // 手指右滑
              me.animate.rightDrag();
          }else{  // 手指左滑
              me.animate.leftDrag();
          }
	   },
	   'touchEnd': function(e,me){
        // $('.overlay').show();
	   	  e = e || window.event;
	   	  me.dragStart = null;
	   	  me.li.removeClass('no-animation');
	   	  if(me.gragPercentage > me.dragThreshold){
              me.animate.prevItem();
	   	  }else if(Math.abs(me.gragPercentage) > me.dragThreshold){
              me.animate.nextItem();
	   	  }else{
              me.animate.showItem();
	   	  }
	   	  // me.autoTimer = setInterval(function(){
       // 	    me.auto(me);
       //    },3000);

	   },
	   'changeCss': function(index){
	   	   var me = this;
	   	   var prev = index == 0? me.lilen-1:index-1;
	   	   var next = index == me.lilen-1? 0 : index+1;
	   	   me.li.css('z-index',5);
           me.li.eq(index).css({
           	   '-webkit-transform':'translate3d(0,0,0)',
           	   'z-index':10
           });
           me.li.eq(prev).css({
           	   '-webkit-transform':'translate3d('+(-me.window.width())+'px,0,0)',
           	   'z-index':9
           });
           me.li.eq(next).css({
           	   '-webkit-transform':'translate3d('+me.window.width()+'px,0,0)',
           	   'z-index':9
           });
           me.list.removeClass('active').eq(index).addClass('active');
	   },
	   'auto': function(me){
	   	   me.currentItem = typeof me.currentItem == 'number'? me.currentItem:me.currentItem.index();
	   	   me.currentItem = me.currentItem == me.lilen-1? 0:++me.currentItem;
           me.changeCss(me.currentItem);
	   }
	}
})()