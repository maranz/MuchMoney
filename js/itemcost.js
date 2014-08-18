itemcost = {
		closeSuggestion: false,
		load: function(){
			var $l = $( "[mz-data-list='itemcost']" ); 
			$.each( $l , function(index, state) {
				var $item = $l[index]; 
				var id = $item.id;
				var ctype = $( $item ).attr( "mz-data-type" );
				var data = {
						 "action":"itemcosts",  
						 "ctype" : ctype
		    	};
				helpAjax.call(data, function ( data, ctype ) {
					if (!helperMessage.showMessageErrorJSON ( data )){							
						itemcost.loadSuggestion( "sugg" + id, data );
						$( "#" + id ).on("input", function(e) {
							 var text = $.trim($(this).val());
							 itemcost.filter( id, text );
						});
						
						$( "#"  + id ).keyup(function() {
							if (itemcost.closeSuggestion){
								itemcost.closeSuggestion = false;
								itemcost.filter( id, "" );	
							}
						});						
						$( "#sugg" + id ).on('tap', 'a', function(){
							itemcost.closeSuggestion = true;
							$( "#" + id ).val($(this).text());
							$( "#" + id ).trigger( 'keyup' );				
						});
					}	
		   	 	});	
				$("#" + id).on('blur', function() {
					itemcost.validBlur( id );			         
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
			$( "#sugg" + id ).listview( "refresh" );
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
		selectedItem: function ( id ){
			/*
			 * se serve implementare ID della voce, l'aggancio al metodo 
			 * è già predisposto
			*/ 			
			var v = $( "#" + id ).val();
			var item = [];
			item['id'] = itemcost.getId( v );
			item['name'] = v;
			return item;
		},
		getId: function ( text ){
			var k = '';
			$.each(itemcost.suggestion, function( key, value ) { 
				if($.trim(value[1]).toLowerCase() === $.trim(text).toLowerCase()) {
			        k = value[0];
			        return false;
			    }
			});			
			return k;
		},
		validBlur: function ( id ) {
			var ui = $( "#" + id );
			if ( helpUI.isError( ui ) ){
				return helpUI.valid( ui );
			}
		},
		valid: function ( id ) {
			var ui = $( "#" + id );
			return helpUI.valid( ui );
		},
		clear: function ( id ){
			$( "#" + id ).val( "" );
		}
};
