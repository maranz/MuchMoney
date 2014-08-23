$(document).bind( "pagebeforechange", function( e, data ) {
	if (typeof data.toPage !== "string")
        return;
	var u = $.mobile.path.parseUrl( data.toPage );
	var isShow = pgInsMoney.pagebeforechange( u, data );
	if ( isShow )
		e.preventDefault();
		return;
});

$(document).on("pagebeforecreate", "#homepage",function(){
	menu.loadStartMenu("startmenu");
	uiUser.load();
	dreg.load();
	uiItemCost.load();
	uiMoney.load();
	action.load();
}); 

