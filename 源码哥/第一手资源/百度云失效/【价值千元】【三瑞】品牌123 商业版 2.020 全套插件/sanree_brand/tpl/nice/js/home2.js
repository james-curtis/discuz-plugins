jQuery(function(){
	jQuery('.nr-con ul li:last, .nc-newcom ul li:last, .nc-com ul li:last').addClass("lastli");
	jQuery(".ncc-comment img.zoom, .ncc-comment font").hide();
	jQuery(".nm-right ul li:nth-child(4n), .nr-toplist .nrt-list ul li:nth-child(6n), .n-activity ul li:nth-child(5n), .n-tell ul li:nth-child(5n), .nrt-blist ul li:nth-child(5n)").addClass("lastli");
	jQuery(".com-list ul li:eq(0)").addClass("otherli");
	jQuery(".com-list ul li:eq(1)").addClass("secondli");
	jQuery(".nn-pl .np-tp ul li:last").addClass("lastli");
	jQuery(".ncc-comment br:gt(0)").hide();
	var a =jQuery(".nhn-onelist ul li:gt(13)");
	    a.hide();
	jQuery(".boxdown").click(function(){
		if(a.is(':visible')){
			 a.slideUp('fast');
			 jQuery(this).removeClass('up');
		}else{
			a.slideDown('fast').show();
			jQuery(this).addClass('up');
	}		
	});
	jQuery(".ntte-code").click(function() {
		jQuery(this).next(".ntte-con").toggle();
	});
	jQuery(document).click(function(e){
		if(e.target.className!='ntte-code'){
			jQuery(".ntte-con").hide();
		}
	});
	jQuery(".nhn-onelist ul li").each(function(index){
	jQuery(this).mouseover(function(){
		jQuery(".nhn-box").css({display:"none"});
		var height = index * 30+"px";
		jQuery(".nhn-box").eq(index).addClass("show showcontent").css({display:"block",top:height});
		jQuery(this).addClass("hover");
	}).mouseleave(function(){
		jQuery(".nhn-box").eq(index).css({display:"none"});
		jQuery(this).removeClass("hover");
		});
	});
	jQuery(".nhn-box").hover(function(){
	jQuery('.nhn-box').eq(jQuery('.nhn-box').index(jQuery(this))).addClass("show showcontent").css({display:"block"});
	jQuery(".nhn-onelist ul li").eq(jQuery('.nhn-box').index(jQuery(this))).addClass("hover");},function(){
		jQuery(".nhn-onelist ul li").removeClass("hover");
		jQuery('.nhn-box').css({display:"none"});
	});
	/*jQuery(".tit-code").each(function(){
		jQuery(this).bind("mouseover",function(){
			jQuery(this).parent().siblings().children("span").hide(500);
			jQuery(this).siblings("span").toggle();
			jQuery(".tit-code span").bind("mouseout",function(){
				jQuery(this).show(500);
			})
		})
	});*/
	/*jQuery(".tit-code").each(function(){
		jQuery(this).hover(function(){
			if(jQuery(this).children('span.code-box').css("opacity") == 0){
				jQuery(this).children('span.code-box').stop().animate({
					opacity:"1",
					top:"-16px"
				})
			}else{
				jQuery(this).children('span.code-box').stop().animate({
					opacity:"0",
					top:"0px"
				})
			}
		})
	});*/
});
/*jQuery(function(){
	jQuery('.tit-code i').mouseenter(function(){
		jQuery(".tit-code").children('span').stop().animate({top: "-16px", opacity: "1"});
	});
	jQuery(".tit-code span").mouseleave(function(){
			jQuery(".tit-code").children('span').stop().animate({top: "0px", opacity: "0"});
	});
});*/
jQuery(".nhs-slide, .com-slide").hover(function() {
    jQuery(this).find(".prev,.next").stop(true, true).fadeTo("slow",0.5).slide({delayTime: 5000});
},
function() {
    jQuery(this).find(".prev,.next").fadeOut()
});
jQuery(".nhs-slide, .com-slide, .nn-slide").slide({
    titCell: ".hd ul",
    mainCell: ".bd ul",
    effect: "fold",
    autoPlay: true,
    autoPage: true,
    trigger: "click",
    startFun: function(i) {
        var curLi = jQuery(".nhs-slide .bd li, .com-slide .bd li").eq(i);
        if ( !! curLi.attr("_src")) {
            curLi.css("background-image", curLi.attr("_src")).removeAttr("_src")
        }
    }
});
jQuery(document).ready(function(){
	jQuery(".nr-list").dayuwscroll({
		parent_ele:'.nr-con',
		list_btn:'.btn-list',
		pre_btn:'.btn-left',
		next_btn:'.btn-right',
		path: 'left',
		auto:true,
		time:3000,
		num:5,
		gd_num:5,
		waite_time:3000
	});
});
(function($){
    $(function(){
		var numli = $("ul.nr-list li").length;
		var index = numli%5==0?numli/5-1:parseInt(numli/5);
		var show = $("ul.btn-list li");
		show.slice(index+1).hide();
		if(numli > 5){
			$(".r-more").show();
			$(".nr-con").hover(function(event){
				$(".btn-left, .btn-right").stop().animate({opacity: "1"});
				},function(event){
					$(".btn-left, .btn-right").stop().animate({opacity: "0"});
				}
			);
		}else {
			$(".nr-con").hover(function(event){
				$(".btn-left, .btn-right").stop().animate({opacity: "0"});
				},function(event){
					$(".btn-left, .btn-right").stop().animate({opacity: "0"});
				}
			);
		}
    });
})(jQuery);