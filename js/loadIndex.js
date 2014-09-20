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
	uiUsers.load();
	uiYears.load();
	uiProjects.load();
	uiDate.load();
	uiMoney.load();
	pgInsMoney.load();
	pgVisMoney.load();
	action.load();
}); 

