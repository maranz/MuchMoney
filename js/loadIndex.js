$(document).bind( "pagebeforechange", function( e, data ) {
	if (typeof data.toPage !== "string")
        return;
	var u = $.mobile.path.parseUrl( data.toPage );
	var isShow = insMoney.pagebeforechange( u, data );
	if ( isShow )
		e.preventDefault();
		return;
});

$(document).on("pagebeforecreate", "#homepage",function(){
	menu.loadStartMenu("startmenu");
	user.load();
	dreg.load();
	itemcost.load();
	money.load();
	action.load();
}); 

