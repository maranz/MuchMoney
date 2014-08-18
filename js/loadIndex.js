$(document).bind( "pagebeforechange", function( e, data ) {
	if (typeof data.toPage !== "string")
        return;
	var u = $.mobile.path.parseUrl( data.toPage );
	if ( u.hash.search(/^#insMoney/) !== -1 ) {	
		var isinsMoneyout = ( u.hash.search(/^#insMoneyout/) !== -1 );
		var isinsMoneyin = ( u.hash.search(/^#insMoneyin/) !== -1 );
		if ( isinsMoneyout || isinsMoneyin ) {
			insMoney.showInsMoneyContent( u );
		}
		else {
			insMoney.showInsMoneyPage( u, data.options );
		}
		e.preventDefault();
		return;
	}		
});

$(document).on("pagebeforecreate", "#homepage",function(){
	menu.loadStartMenu("startmenu");
	user.load();
	dreg.load();
	itemcost.load();
	money.load();
	insMoney.load();
}); 

$(document).on("pageshow", "#insMoney", function(){
	if (user.fixLoad){
		user.refreshSelectUI( "selectUsersout", user.type, user.userid );
		user.refreshSelectUI( "selectUsersin", user.type, user.userid );
	}
	insMoney.setFocus();	
});



