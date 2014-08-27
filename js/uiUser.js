uiUser = {
		id:"user",
		fixLoad:false,
		users:[],
		load: function(){
			var data = {
				 "action":"users"    			
	    	};			
			helpAjax.call(data, function ( data ) {
				if (!helperMessage.showMessageErrorJSON ( data ))
					var $l = $("[mz-data-list='user']"); 
					$.each( $l , function(index, state) {						
						uiUser.loadSelectUI( $l[index], data );
					});
	   	    		
	   	 	});				
			var $l = $("[mz-data-list='user']"); 
			$.each( $l , function(index, state) {
				var $ui = $l[index];				
				$( $ui ).bind( "change", function( event ) {
					uiUser.validChange( this );
				});				
				$( $ui ).on( "beforesaving", function( event, data ) {					
					return uiUser.beforeSaving( this, data );
				});
				$( $ui ).on( "cleaner", function( event ) {					
					 uiUser.cleaner( this );
				});
			});
		},		
		loadSelectUI: function ( ui,  data ){						
			$.each(data, function(index, state) {
				var opt = "<option value='{0}'>{1}</option>";
				var k = data[index][0];
				var v = data[index][1];
				opt = opt.replace('{0}', k).replace('{1}', v);
				$( ui ).append(opt);
			});
		},
		refreshSelectUI: function ( ui ){			
			var $page = $( ui ).closest( "[data-role='page']" );
			var type = $( $page ).data( "type" );
			var ownerid = $( $page ).data( "ownerid" );
			uiUser.fixLoad = false;
		 	if (type === 'user'){
		    	$( ui ).val( ownerid );
		    	try{
		    		$( ui ).selectmenu('disable');
		    		$( ui ).selectmenu("refresh");
		    	} catch( e ) { 
		    		uiUser.fixLoad = true;
		    	}
		 	}
		 	else{		 		
		 		try{		 			
		    		$( ui ).selectmenu("enable");
		    		$( ui ).selectmenu("refresh");
		    	} catch( e ) { 
		    		uiUser.fixLoad = true;
		    	}
		 	}
		},
		selectedItem: function( ui ){
			var item = [];
			var val = $( ui ).val();
			if (val != "err"){
				item["id"] = val;
				item["name"] = $( ui ).children(":selected").text();
			}
			return item;
		},
		validChange: function ( ui ) {			
			if ( helpUI.isError( ui ) ){
				return uiUser.valid( ui );
			}
		},
		valid: function ( ui ) {			
			return helpUI.valid( ui );
		},
		cleaner: function ( ui ) {
			helpUI.cleaner ( ui );			
			uiUser.refreshSelectUI( ui );
		},
		beforeSaving: function ( ui,  data ){			
			var para = $( ui ).attr( "mz-data-para" );
			var valid = uiUser.valid( ui );
	    	if ( valid ){
	    		var usr = uiUser.selectedItem( ui );
		    	data[ para ] = usr[ "id" ];  
		    }
	    	return valid;
		}
};
