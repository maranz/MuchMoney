pgInsMoney = {
	load: function (){
		var $ui = "#insMoney";
		$( $ui ).on("pageshow", function(){
			if (uiUser.fixLoad){
				uiUser.refreshSelectUI( $( "#selectUsersout" ) );
				uiUser.refreshSelectUI( $( "#selectUsersin" ) );
			}
			pgInsMoney.setFocus();	
		});
		$( $ui ).on("aftersavepage", function( event, data ){
			pgInsMoney.afterSavePage( data );
		});
	},
	afterSavePage: function ( data ) {
		var moneyID = data[0];
		var itemCostId = data[1];
		var itemCostName = data[2];
		action.cleaner( $( "#insMoney" ) );
		uiItemCost.load( $( "#insMoney" ) );
	},
	pagebeforechange: function ( u, data ){
		if ((data.options.fromPage != null 
			|| data.options.fromPage != undefined) 
		    && !data.options.changeHash) {	
			return false;
		}
		if ( u.hash.search(/^#insMoney/) !== -1 ) {			
			pgInsMoney.urlObj = new helperURL( u.hash );
			var hu = pgInsMoney.urlObj;	
		 	var type = hu.item( "type" );
		 	var name =  hu.item( "name" );
		 	var pageSelector = hu.item( "selector" );
		 	var ownerid = hu.item( "ownerid" );
		 	var act = hu.item( "action" );
		 	var $ui = $( pageSelector );
		 	$( $ui ).data( "type",  type);
	        $( $ui ).data( "ownerid",  ownerid);
	        if ( act === "new"){
				action.cleaner( $( "#insMoney" ) );	
			}
			var isinsMoneyout = ( u.hash.search(/^#insMoneyout/) !== -1 );
			var isinsMoneyin = ( u.hash.search(/^#insMoneyin/) !== -1 );
			if (data.options.fromPage === null 
			 || data.options.fromPage === undefined){
				pgInsMoney.showInsMoneyPage( u, data.options, type,  $ui, "new" );
			}else if ( isinsMoneyout || isinsMoneyin ) {
				pgInsMoney.showInsMoneyContent( u, pageSelector );
			}
			else {
				pgInsMoney.showInsMoneyPage( u, data.options, type,  $ui, act );
			}
			return true;
		}
	},
	showInsMoneyPage: function ( urlObj, options, type, ui ){
	 	insMoneynav.load( type );
	 	uiItemCost.load( ui );
	 	ui.page();
	    options.dataUrl = urlObj.href;
	 	$.mobile.changePage( ui, options );
	},
	showInsMoneyContent: function ( u, pageSelector ){
		var $content = $( pageSelector );
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
