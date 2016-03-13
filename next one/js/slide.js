var itemsPerPage=3;
$('document').ready(function(){
	$('.wares_line').each(function(){
		getStagesCount($(this));
	});
	
	


	$('.control').click(function(){

		var item=$(this).siblings().children('.wares_lent').children('.wares_item');
		var itemWidth=item.width();
		var margin=parseInt(item.css('margin-right').replace('px',""));
		var offset=(itemWidth+margin)*itemsPerPage;
		var stage=$(this).siblings('.indication').children('.stage');
		var waresLent=$(this).siblings('.frame').children('.wares_lent');

		var animProperties={"left":"-="+offset+'px'};
		var comareLeft=parseInt($(this).siblings('.indication').children('.count').html());
		var compareRight=parseInt(stage.html());
		var shift=1;
		//setting properties for 'previous' button
		if ($(this).hasClass('prev')){
			animProperties.left="+="+offset+'px';
			comareLeft=parseInt(stage.html());
			compareRight=1;
			shift=-1;
		}
		//making action
		if(comareLeft>compareRight){
			
			waresLent.animate(animProperties, 'slow');
		    stage.html(parseInt(stage.html())+shift);
		}		
	
	});

});


$('document').ready(function(){
	$('.invisible_checkbox').click(function(){
		id='w'+ $(this).attr('id').replace('check',"");
		if($(this).prop('checked')){
			if($('#'+id).length>0){
				$('#'+id).show(1500);
			}
			else{
				
				//$.getJSON("/js/"+id+".js", recieveData);
				$.ajax({url:"/js/"+id+".js", dataType:'json', cache:false, success: recieveData});

			}
		}
		else{
			
			$('#'+id).hide(3000);
		}


	});

});
$('document').ready(function(){
	$(".see_all").click(function(){
		$('.invisible_checkbox').each(function(){
			if (!$(this).prop('checked')){
				$(this).click();
			}
		})
	});

});
function recieveData(data){
	var waresLine=$('.wares_line').eq(0).clone(true,true);
	waresLine.attr('id','w3');
	waresLine.find(".heading").html(data.h2);
	waresLine.find(".wares_lent").empty();
	$.map(data.wares_lent, function(n){
		var waresMaster=$('.wares_item').eq(0).clone();
		waresMaster.find('h2>a').html(n.h2.text);
		waresMaster.find('h2>a').attr('href', n.h2.href);
		waresMaster.find('.image_link').attr('href', n.img.href);
		waresMaster.find('.image_link>img').attr('src', n.img.src);
		waresMaster.find('.size').html(n.size);
		waresMaster.find('.price').html(n.price);
		waresLine.find(".wares_lent").append(waresMaster);

	});

	getStagesCount(waresLine);
	$('.wares').append(waresLine);

	
}

function getStagesCount(Obj){
	var itemsCount=Obj.find('.wares_item').length;
	var stagesCount=Math.ceil(itemsCount/itemsPerPage);
	var itemWidth=parseInt(Obj.find('.wares_item').css('width').replace('px',""));
	var margin=parseInt(Obj.find('.wares_item').css('margin-right').replace('px',""));
	var objWidth=((itemWidth+margin)*itemsCount)+10;
	Obj.find('.count').html(stagesCount);
	Obj.find('.stage').html('1');
	Obj.find('.wares_lent').css("left","6px");
	Obj.find('.wares_lent').css("width",objWidth+"px");
}