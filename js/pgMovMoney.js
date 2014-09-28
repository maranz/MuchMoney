pgMovMoney = {
	load: function (  ){		
		year = helperDate.getYear(); 
		pgMovMoney.loadData( year, 'all', '');
		var page = $( "#movMoney" );
		var li = $( page ).find ( "[mz-data-list='years']" );
		if (li.length > 0){
			var uiYear = li[0];
			$( uiYear ).bind( "change", function( event ) {
				var year = uiYears.selectedItem( this );
				pgMovMoney.changeYear( year );
			});
		}
		
		li = $( page ).find ( "[mz-data-list='user']" );
		if (li.length > 0){
			var uiUser = li[0];
			$( uiUser ).bind( "change", function( event ) {
				var user = uiUsers.selectedItem( this );
				pgMovMoney.changeUser( user );
			});
		}
		
		li = $( page ).find ( "[mz-data-list='projects']" );
		if (li.length > 0){
			var uiProject = li[0];
			$( uiProject ).bind( "change", function( event ) {
				var project = uiProjects.selectedItem( this );
				pgMovMoney.changeProject( project );
			});
		}
	},	
	loadData: function ( year, projectid , ownerid){
			if ( projectid == null ||  projectid  == 'all' ) {
				projectid  = '';
			}
			if ( ownerid == null || ownerid == 'null' ) {
				ownerid = '';
			}
			var data = {
				 "action":"movmoney",
				 "year":"" + year + "",
				 "projectid":"" + projectid + "",
				 "ownerid":"" + ownerid	 + ""
	    	};			
			helpAjax.call(data, function ( data ) {
				var $l = $("[mz-data-view='movmoney']");
				if (!helperMessage.showMessageErrorJSON ( data )){
					$.each( $l , function(index, state) {						
						pgMovMoney.loadUI( $l[index], data );
					});		
				}else{					
					$.each( $l , function(index, state) {						
						pgMovMoney.cleaner( $l[index] );
					});					
				}	
	   	 	});
	},
	cleaner: function ( ui ) {
		$( ui ).html( "" );
	},
	loadUI: function (u, data){
		var html = "";
		var titlePrev = null;
		var swatch = ['', 'ui-li-speedread'];
		for ( var i = 0, l = data.length; i < l; i++ ) {
			var moneyid = data[i][0];			
			var year = data[i][1];
			var month = data[i][2];
			var title = data[i][3];
			var day = data[i][4];
			var vdate = data[i][5];
			var userid = data[i][6];
			var username = data[i][7];
			var avatar = data[i][8];
			var projectid = data[i][9];
			var projectname = data[i][10];
			var itemcostid = data[i][11];
			var itemcostname = data[i][12];
			var ctype = data[i][13];
			var money = pgVisMoney.formatMoney( data[i][14] );
			
			if ( i == 0 ){
				html += pgMovMoney.getStartGroup( title, true );
			} else if (titlePrev != null && titlePrev != title) {
				html += pgMovMoney.getEndGroup();
				html += pgMovMoney.getStartGroup( title, false );
			}
			
			html += "<li data-icon='custom' class='ui-money-content ui-btn-icon-right {0} {1}'>"
					.replace("{0}",  swatch[i % 2] )
					.replace("{1}", ( ctype == 'U' ?  "ui-icon-moneyout" : "ui-icon-moneyin" ));
			
			html += "<img src='img/{0}' class='ui-li-thumb'>".replace("{0}", avatar);
			html += "<h2 class='ui-li-heading'>{0}</h3>".replace("{0}", username);			
			html += "<p><span>{0}:</span>&nbsp;{1}&nbsp;</p>".replace("{0}", itemcostname).replace("{1}", money);
			html += "<p class='ui-li-aside'>{0}&nbsp;</p>".replace("{0}", day + "/" + month + "/" + year);
			html += "<p>{0}</p>".replace("{0}", ( projectname == 'Private' ? 'Personale': projectname ));
			
			html += "</li>";
			
    		titlePrev = title;
    		
    		if (i == (data.length - 1)){
    			html += pgMovMoney.getEndGroup();
			}
		}
		$( u ).html( html );
		$( u ).trigger("create");
	},	
	formatMoney: function ( text ){	
		if ( text == null ){
			return null;
		}
		var mask = new maskMoneyItem( text.length, text );
		helperMaskEuro.maskNumText( mask );
		return mask.text;
	},
	getStartGroup: function ( title, collapsed ){		
		var html = "<div data-role='collapsible' data-iconpos='right' {0}>"
				   .replace("{0}", (collapsed ? " data-collapsed='false' " : ""));
		html += "<h3>{0}</h3>".replace("{0}", title);
		html += "<ul data-role='listview' data-theme='a' mz-data-list='movmoney'>";
		return html; 
	},
	getEndGroup: function (){
		var html = '</ul>';
		html += '</div>';
		return html;
	},
	changeYear: function ( year ){
		var page = $( "#movMoney" );
		
		var li = $( page ).find ( "[mz-data-list='projects']" );		
		var project = uiProjects.selectedItem( li[0] );
		
		li = $( page ).find ( "[mz-data-list='user']" );
		var user = 	uiUsers.selectedItem( li[0] );
		
		pgMovMoney.loadData( year, project["id"], user["id"] );
	},
	changeProject: function ( project ){
		var page = $( "#movMoney" );
		
		var li = $( page ).find ( "[mz-data-list='years']" );
		var year = uiYears.selectedItem( li[0] );
		
		li = $( page ).find ( "[mz-data-list='user']" );
		var user = 	uiUsers.selectedItem( li[0] );
		
		pgMovMoney.loadData( year, project["id"], user["id"] );
	},
	changeUser: function ( user ){
		var page = $( "#movMoney" );
		
		var li = $( page ).find ( "[mz-data-list='years']" );
		var year = uiYears.selectedItem( li[0] );
		
		var li = $( page ).find ( "[mz-data-list='projects']" );		
		var project = uiProjects.selectedItem( li[0] );
		
		pgMovMoney.loadData( year, project["id"], user["id"] );
	}
};
