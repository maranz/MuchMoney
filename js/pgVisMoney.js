pgVisMoney = {
	load: function (  ){		
		year = helperDate.getYear(); 
		pgVisMoney.loadData( year, 'all' );
		var page = $( "#visMoney" );
		var li = $( page ).find ( "[mz-data-list='years']" );
		if (li.length > 0){
			var uiYear = li[0];
			$( uiYear ).bind( "change", function( event ) {
				var year = uiYears.selectedItem( this );
				pgVisMoney.changeYear( year );
			});
		}
		li = $( page ).find ( "[mz-data-list='projects']" );
		if (li.length > 0){
			var uiProject = li[0];
			$( uiProject ).bind( "change", function( event ) {
				var project = uiProjects.selectedItem( this );
				pgVisMoney.changeProject( project );
			});
		}
	},	
	loadData: function ( year, projectid ){				
			var data = {
				 "action":"vismoney",
				 "year":"" + year + "",
				 "projectid":"" + projectid + ""				 
	    	};			
			helpAjax.call(data, function ( data ) {
				var $l = $("[mz-data-view='vismoney']");
				if (!helperMessage.showMessageErrorJSON ( data )){					
					$.each( $l , function(index, state) {						
						pgVisMoney.loadUI( $l[index], data );
					});			
				}else{
					$.each( $l , function(index, state) {						
						pgVisMoney.cleaner( $l[index] );
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
		
		for ( var i = 0, l = data.length; i < l; i++ ) {
			var year = data[i][0];
			var order = data[i][1];
			var title =	data[i][2];
			var userid = data[i][3];
			var username = data[i][4];
			var avatar = data[i][5];
			var moneyIn = pgVisMoney.formatMoney( data[i][6] );
			var moneyOut =  pgVisMoney.formatMoney( data[i][7] );
			var moneyDelta = pgVisMoney.formatMoney( data[i][8] );
			var pMoneyIn = data[i][9];
			var pMoneyOut = data[i][10];
			
			var collapsed = (data[i][11] == 1 ? true : false);
			
			if ( i == 0 ){
				html += pgVisMoney.getStartGroup( title, collapsed );
			} else if (titlePrev != null && titlePrev != title) {
				html += pgVisMoney.getEndGroup();
				html += pgVisMoney.getStartGroup( title, collapsed );
			}
			
			html += "<li class='ui-money-content'>";
			html += "<div class='ui-money-content-left'>";
			html += "<img src='img/{0}' class='ui-li-thumb'>".replace("{0}", avatar);
			html += "<h3 class='ui-li-heading'>{0}</h3>".replace("{0}", username);
			html += "</div>";
			html += "<div class='ui-money-content-right'>";
			
			html += "<div style='float:right;'>";
			if ( moneyIn != null){
				html += "<p>&nbsp;{0}&nbsp;-</p>".replace("{0}", moneyIn);	
			}
			html += "<p>&nbsp;{0}&nbsp;</p>".replace("{0}", moneyOut);
			if ( moneyDelta != null){
				html += "<p><span class='ui-span-money-result'>&nbsp;&nbsp;{0}&nbsp;</span></p>".replace("{0}", moneyDelta);
			}
			html += "</div>";
			
			html += "<div style='float:right;'>";
			if ( moneyIn != null){
				html += "<p><span class='ui-span-money-in'>Entrate:</span></p>";
			}
			html += "<p><span class='ui-span-money-out'>Spese:</span></p>";
			if ( moneyDelta != null){
				html += "<p>=</p>";
			}
			html += "</div>";
			
			html += "</div>";
			html += "</li>";
			html += "<li class='ui-money-gra'>";	
			if ( pMoneyIn != null){
				html += "<div style='width:{0}%;' class='ui-div-money-in'></div>".replace("{0}", pMoneyIn);
			}
			if ( pMoneyOut != null){     		 
				html += "<div style='width:{0}%;' class='ui-div-money-out'></div>".replace("{0}", pMoneyOut);
			}					
    		html += "</li>";    		
			
    		titlePrev = title;
    		
    		if (i == (data.length - 1)){
    			html += pgVisMoney.getEndGroup();
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
		html += "<ul data-role='listview' data-theme='a' mz-data-list='vismoney'>";
		return html; 
	},
	getEndGroup: function (){
		var html = '</ul>';
		html += '</div>';
		return html;
	},
	changeYear: function ( year ){
		var page = $( "#visMoney" );
		var li = $( page ).find ( "[mz-data-list='projects']" );
		if (li.length > 0){
			var project = uiProjects.selectedItem( li[0] );
			pgVisMoney.loadData( year, project["id"] );
		}
	},
	changeProject: function ( project ){
		var page = $( "#visMoney" );
		var li = $( page ).find ( "[mz-data-list='years']" );
		if (li.length > 0){
			var year = uiYears.selectedItem( li[0] );
			pgVisMoney.loadData( year, project["id"]  );
		}
	}
};
