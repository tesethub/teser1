$('document').ready(function(){
	var cartList=$.cookie('cartList');
	if(cartList){
		cartList=cartList.split(',');	
	}
	else{
		cartList=[]
	}
	handleCart(cartList);
	

	$('.add-button').click(function(){
		
		var item=$(this).parent('.wares-item');
		cartList.push(item.data('item-id'));
		handleCart(cartList);

		$.cookie('cartList', cartList.join(','));
	});

	$('.remove-button').click(function(){
		var item=$(this).parent('.wares-item');
		cartList.splice(cartList.indexOf(item.data('item-id')),1);
		
		handleCart(cartList);
		$.cookie('cartList', cartList.join(','));

	});
	function handleCart(cartList) {
		var rate=parseFloat($('.currency-choose').data('rate'));
		var summary=0;
		$('.wares-item').removeClass('selected');
		$.each(cartList, function(n,value){
			var item=$('[data-item-id='+value+']');
			summary+=parseFloat(item.find('.price').data('price-default'));
			item.addClass('selected');

		});
		$('.cart .price').data('price-default',summary);
		$('.cart .count').html(cartList.length);
		$('.cart .price').html(reCalculate($('.cart .price'), rate ));
	}
});

$('document').ready(function(){
	$('.currency-list li').click(function(){
		
		$('.currency-choose>.currency, .wares-item .currency, .cart .currency').html($(this).children('.currency').html());
		$('.currency-choose>.currency-abbr').html($(this).find('.currency-abbr').html());
		$('.currency-list li').css('display','block');
		$(this).css('display','none');
		$('.currency-choose').data('rate')

		//recalcutating prices
		var rate=parseFloat($(this).data('rate'));
		$('.currency-choose').data('rate', rate);

		$('.price').each(function(){
			$(this).html(reCalculate($(this), rate));
		});

	});
});
function reCalculate(obj, rate){
	return Math.round(parseFloat(obj.data('price-default')) * rate*100)/100;
}