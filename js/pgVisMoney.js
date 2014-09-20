pgVisMoney = {
	load: function (){
		var data = {
				 "action":"vismoney",
				 "year":"2013",
				 "projectid":"all"
	    	};			
			helpAjax.call(data, function ( data ) {
				if (!helperMessage.showMessageErrorJSON ( data )){
					var $l = $("[mz-data-view='vismoney']"); 
					$.each( $l , function(index, state) {						
						pgVisMoney.loadUI( $l[index], data );
					});			
				}		
	   	 	});
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
			var moneyIn =  pgVisMoney.formatMoney( data[i][6] );
			var moneyOut =  pgVisMoney.formatMoney( data[i][7] );
			var moneyDelta =  pgVisMoney.formatMoney( data[i][8] );
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
			html += "<p>&nbsp;{0}&nbsp;-</p>".replace("{0}", moneyIn); 
			html += "<p>&nbsp;{0}&nbsp;</p>".replace("{0}", moneyOut);
			html += "<p><span class='ui-span-money-result'>&nbsp;&nbsp;{0}&nbsp;</span></p>".replace("{0}", moneyDelta);
			html += "</div>";
			
			html += "<div style='float:right;'>";				      		
			html += "<p><span class='ui-span-money-in'>Entrate:</span></p>"; 
			html += "<p><span class='ui-span-money-out'>Spese:</span></p>"; 
			html += "<p>=</p>";
			html += "</div>";
			
			html += "</div>";
			html += "</li>";
			html += "<li class='ui-money-gra'>";			  						     	
			html += "<div style='width:{0}%;' class='ui-div-money-in'>".replace("{0}", pMoneyIn);	
			html += "</div>";		     		 
			html += "<div style='width:{0}%;' class='ui-div-money-out'>".replace("{0}", pMoneyOut);
     		html += "</div>";						
    		html += "</li>";    		
			
    		titlePrev = title;
    		
    		if (i == (data.length - 1)){
    			html += pgVisMoney.getEndGroup();
			}
		}
		$( u ).html( html );
	},	
	formatMoney: function ( text ){		
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
	}
};
