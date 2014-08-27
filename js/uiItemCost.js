uiItemCost = {
		id:"itemcost",
		itemsU: [],
		itemsE: [],		
		closeSuggestion: false,
		load: function(){
			var $l = $( "[mz-data-list='itemcost']" ); 
			$.each( $l , function(index, state) {
				var $ui = $l[index]; 
				var id = $ui.id;
				var ctype = $( $ui ).attr( "mz-data-type" );
				var data = {
						 "action":"itemcosts",  
						 "ctype" : ctype
		    	};
				helpAjax.call( data, function ( data, status ) {
					if (!helperMessage.showMessageErrorJSON ( data )){
						if ( ctype == "U" ){
							uiItemCost.itemsU = data;
						}
						else if ( ctype == "E" ) {
							uiItemCost.itemsE = data;
						}
						uiItemCost.loadSuggestion( "sugg" + id, data );
						$( $ui ).bind("input", function(e) {
							 var text = $.trim( $( this ).val() );
							 uiItemCost.filter( id, text );
						});
						$( $ui ).keyup(function() {
							if (uiItemCost.closeSuggestion){
								uiItemCost.closeSuggestion = false;
								uiItemCost.filter( id, "" );	
							}
						});						
						$( "#sugg" + id ).on("tap", "a", function(){
							uiItemCost.closeSuggestion = true;
							$( "#" + id ).val( $( this ).text() );							
							$( "#" + id ).trigger( "keyup" );				
						});
						$( $ui ).bind("blur", function() {
							uiItemCost.validBlur( this );			         
						});
						$( $ui ).on( "beforesaving", function(event, data) {					
							return uiItemCost.beforeSaving( this, data );
						});
						$( $ui ).on( "cleaner", function( event ) {					
							 uiItemCost.cleaner( this );
						});
					}	
		   	 	});	
				
			});
		},
		filter: function ( id, text ){
			$("#sugg" + id + " li").each(function (index) {
				var link = $(this).children("a:first");
				var name = link.text();
				var find = "";
				var indexOf = name.indexOf(text.toLowerCase());						
				if (indexOf > -1){
					find = text.toLowerCase();
				}
				indexOf = name.indexOf(text.toUpperCase());
				if (indexOf > -1){
					find = text.toUpperCase();
				}	
				if (find != ""){
					var tmp = '<font color="#0080FF"><b>{0}</b></font>';
					name = name = name.replace( find, '<font color="#0080FF"><b>' + find + '</b></font>'); 
					link.html( name ); 
					$(this).removeClass("ui-screen-hidden");
				}
				else{
					$(this).addClass("ui-screen-hidden");
				}
			});
			try {
				$( "#sugg" + id ).listview( "refresh" );
			}catch( err ) {
				helperMessage.showMessage( err.message );
			}		
		},
		loadSuggestion: function ( id, data ){
			var tmp = "<li data-icon='false' class='ui-screen-hidden'><a href='#' >{0}</a></li>";
			var html = "";
			for ( var i = 0, l = data.length; i < l; i++ ) {
				//var iditem = data[i][0];
				var name = data[i][1];
				html += tmp.replace( "{0}" , name); 
			}
			var suggestion = $( "#" + id );			
			suggestion.html( html );
		},
		selectedItem: function ( ui ){					
			var v = $( ui ).val();
			var type = $( ui ).attr( "mz-data-type" );
			var item = [];
			item["id"] = uiItemCost.getId( v, type );
			item["name"] = v;
			item["type"] = type;
			return item;
		},
		getId: function ( text, type ){
			var k = '';
			var l = [];
			if ( type == "U" ){
				l = uiItemCost.itemsU;
			}
			else if ( type == "E" ){ 
				l = uiItemCost.itemsE;
			}
			$.each( l, function( key, value ) { 
				if( $.trim(value[1]).toLowerCase() === $.trim(text).toLowerCase() ) {
			        k = value[0];
			        return false;
			    }
			});			
			return k;
		},
		validBlur: function ( ui ) {			
			if ( helpUI.isError( ui ) ){
				return uiItemCost.valid( ui );
			}
		},
		valid: function ( ui ) {			
			return helpUI.valid( ui );
		},
		cleaner: function ( ui ){
			uiItemCost.filter( $( ui ).attr( "id" ), "" );
			helpUI.cleaner ( ui );
		},
		beforeSaving: function ( ui,  data ){
			var para = $( ui ).attr( "mz-data-para" );			
			var valid = uiItemCost.valid( ui );
	    	if ( valid ){	    	  
		      var d = uiItemCost.selectedItem( ui );
		      data[ para ] = d["name"];
		      data[ "ctype" ] = d["type"];
	    	}
			return valid;
		},
};
