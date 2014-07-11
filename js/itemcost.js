itemcost = {
		suggestion:{},
		closeSuggestion: false,
		load: function(){	
			var data = {
				 "action":"itemcosts"    			
	    	};
			helpAjax.call(data, function ( data ) {
				if (!helperMessage.showMessageErrorJSON ( data )){
					itemcost.suggestion = data;
					itemcost.loadSuggestion( data );
					
					$( "#itemcost" ).on("input", function(e) {
						 var text = $.trim($(this).val());
						 itemcost.filter( text );
					});
					
					$( '#itemcost' ).keyup(function() {
						if (itemcost.closeSuggestion){
							itemcost.closeSuggestion = false;
							itemcost.filter( "" );	
						}
					});
					
					$( '#suggitemcost' ).on('tap', 'a', function(){
						itemcost.closeSuggestion = true;
						$( '#itemcost' ).val($(this).text());
						$( '#itemcost' ).trigger( 'keyup' );				
					});
				}	
	   	 	});	
			$('#itemcost').on('blur', function() {
				itemcost.validBlur();			         
			});
		},
		filter: function ( text ){
			$('#suggitemcost li').each(function (index) {
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
			$("#suggitemcost").listview( "refresh" );
		},
		loadSuggestion: function ( data ){
			var tmp = "<li data-icon='false' class='ui-screen-hidden'><a href='#' >{0}</a></li>";
			var html = "";
			for ( var i = 0, l = data.length; i < l; i++ ) {
				var id = data[i][0];
				var name = data[i][1];
				html += tmp.replace( "{0}" , name); 
			}
			var suggestion = $( "#suggitemcost" );			
			suggestion.html( html );
		},
		selectedItem: function (){
			/*
			 * se serve implementare ID della voce, l'aggancio al metodo 
			 * è già predisposto
			*/ 			
			var v = $( '#itemcost' ).val();
			var item = [];
			item['id'] = itemcost.getId( v );
			item['name'] = v;
			return item;
		},
		getId: function ( text ){
			var k = '';
			$.each(itemcost.suggestion, function(key, value) { 
				if($.trim(value[1]).toLowerCase() === $.trim(text).toLowerCase()) {
			        k = value[0];
			        return false;
			    }
			});			
			return k;
		},
		validBlur: function () {
			var ui = $( "#itemcost" );
			if ( helpUI.isError( ui ) ){
				return helpUI.valid( ui );
			}
		},
		valid: function () {
			var ui = $( "#itemcost" );
			return helpUI.valid( ui );
		}	
};
