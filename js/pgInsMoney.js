pgInsMoney = {
	selector:"#insMoney",
	load: function (){
		var page = $(  pgInsMoney.selector );
		$( page ).on("pageshow", function(){
			if (uiUsers.fixLoad){
				uiUsers.refreshSelectUI( $( "#selectUsersout" ) );
				uiUsers.refreshSelectUI( $( "#selectUsersin" ) );
			}
			if (uiProjects.fixHiden){
				var ui = $( page ).find( uiProjects.selector );
				uiProjects.show( $( ui ), false );
			}
			if (uiProjects.fixShow){
				var ui = $( page ).find( uiProjects.selector );
				uiProjects.show( ui, true );
			}
			pgInsMoney.setFocus();	
		});
		$( page ).on("aftersavepage", function( event, data ){
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
		 	var projectid = hu.item( "projectid" );
		 	var act = hu.item( "action" );
		 	var page = $( pageSelector );
		 	if (type == undefined){
		 		$( page ).data( "type",  null);
		 	}else{
		 		$( page ).data( "type",  type);	
		 	}
		 	if ( type == "user" ){
		 		$( page ).data( "ownerid",  projectid);
		 		$( page ).data( "projectid",  null);
		 	}else if ( type == "project" ){
		 		$( page ).data( "projectid",  projectid);
		 		$( page ).data( "ownerid",  null);
		 	}else {
		 		$( page ).data( "projectid",  null);
		 		$( page ).data( "ownerid",  null);
		 	}
	        if ( act === "new"){
				action.cleaner( $( "#insMoney" ) );	
			}
			var isinsMoneyout = ( u.hash.search(/^#insMoneyout/) !== -1 );
			var isinsMoneyin = ( u.hash.search(/^#insMoneyin/) !== -1 );
			if (data.options.fromPage === null 
			 || data.options.fromPage === undefined){
				pgInsMoney.showInsMoneyPage( u, data.options, type,  page, "new" );
			}else if ( isinsMoneyout || isinsMoneyin ) {
				pgInsMoney.showInsMoneyContent( u, pageSelector );
			}
			else {
				pgInsMoney.showInsMoneyPage( u, data.options, type,  page, act );
			}
			return true;
		}
	},
	showInsMoneyPage: function ( urlObj, options, type, page ){
	 	insMoneynav.load( type );
	 	uiItemCost.load( page );
	 	pgInsMoney.showUIProjects( page, type );
	 	page.page();
	    options.dataUrl = urlObj.href;
	 	$.mobile.changePage( page, options );
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
	},
	showUIProjects: function ( page, type ){
		var ui = $( page ).find( uiProjects.selector );
		if ( type === "full" || type === null || type === undefined ){
			uiProjects.show( ui, true );
		}else{
			uiProjects.show( ui, false );
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
		if (type === "user" || type === "full") {
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
