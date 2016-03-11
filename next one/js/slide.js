$('document').ready(function(){
	var itemsPerPage=3;
	var waresLine=$('.wares_line');
	waresLine.each(function(){
		var itemsCount=$(this).find('.wares_item').length;
		var stagesCount=Math.ceil(itemsCount/itemsPerPage);
		$(this).find('.count').html(stagesCount);

	});

	$('.control').click(function(){

		var item=$(this).siblings().children('.wares_lent').children('.wares_item');
		var itemWidth=parseInt(item.css('width').replace('px',""));
		var margin=parseInt(item.css('margin-right').replace('px',""));
		var offset=(itemWidth+margin)*itemsPerPage;
		var stage=$(this).siblings('.indication').children('.stage');
		var waresLent=$(this).siblings('.frame').children('.wares_lent');
		var animProperties={"left":"+="+offset+'px'};
		if ($(this).hasClass('prev')){
			
			if (parseInt(stage.html())>1){
				makeShift(animProperties, -1);
			}

		}
		else{

			if (parseInt(stage.html())<parseInt($(this).siblings('.indication').children('.count').html())){
				animProperties.left="-="+offset+'px';
				makeShift(animProperties, 1);
			}
		}
	function makeShift(animProps, shift){
		waresLent.animate(animProps, 'slow');
		stage.html(parseInt(stage.html())+shift);

		}
	});

});

