$(document).bind( "pagebeforechange", function( e, data ) {
	if ( typeof data.toPage === "string" ) {
		var u = $.mobile.path.parseUrl( data.toPage ),
			re = /^#insMoney/;
		if ( u.hash.search(re) !== -1 ) {
			insMoney.showInsMoney( u, data.options );
			e.preventDefault();
		}
	}
});

$(document).on("pagebeforecreate", "#homepage",function(){
	menu.loadStartMenu("startmenu");	
	insMoney.load();
}); 

$(document).on("pageshow", "#insMoney",function(){
	if (user.fixLoad){
		user.refreshSelectUI(user.type, user.userid);
	}
	insMoney.setFocus();	
});



