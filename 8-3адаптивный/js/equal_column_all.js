
jQuery('document').ready(function(){

	var a=jQuery('.column');
	var maxh=a.height();
	a.each(function(){
		

		if ($(this).height()>maxh){
			maxh=$(this).height();

		}
	});

    a.each(function(){
    	if($(this).css('float')!='none'){
    		$(this).height(maxh);
    	}


    });
	





	

    



});