insMoney = {	
	showInsMoneyPage: function ( urlObj, options ){
		if (options.changeHash) {
			insMoney.urlObj = new helperURL( urlObj );	
		 	var hu = insMoney.urlObj;	
		 	var type = hu.item( "type" );
		 	var name =  hu.item( "name" );
		 	var pageSelector = hu.item( "selector" );
		 	var ownerid = hu.item( "ownerid" );
		 	var $page = $( pageSelector );
		 	$( $page ).data( "type",  type);
	        $( $page ).data( "ownerid",  ownerid);
		 	insMoneynav.load(type); 
		 	action.clear( $( "#insMoney" ) );
		 	$page.page();
		    options.dataUrl = urlObj.href;
		 	$.mobile.changePage( $page, options );
		}
	},
	showInsMoneyContent: function ( urlObj ){
		var $a = $("div[data-role='navbar'] a[href='" + urlObj.hash + "']");		
		var $content = $($a.attr("href"));
	    $content.siblings().hide();
	    $content.show();
	},
	setFocus: function (){
		if (!$('#user').is(':disabled')){
			$('#user').focus().tap();			
		}
		else{
			$('#dreg').focus().tap();
		}
	}
};

insMoneynav = {
	hide: function (){
		$('#insMoneynav').hide();
	},	
	show: function () {
		$('#insMoneynav').show();
	},
	load: function (type){
		if (type === "user") {
			insMoneynav.show();
		}else{
			insMoneynav.hide();			
		}
		$('#insMoneynav a').removeClass('ui-btn-active');
		$('#insMoneynav a[href="#insMoneyout"]').addClass('ui-btn-active');
		var $content = $("#insMoneyout");
		$content.siblings().hide();
	    $content.show();
	}
};
