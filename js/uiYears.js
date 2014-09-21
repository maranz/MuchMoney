uiYears = {
		id:"years",
		fixLoad:false,
		years:[],
		load: function(){
			var data = {
				 "action":"years"    			
	    	};			
			helpAjax.call(data, function ( data ) {
				if (!helperMessage.showMessageErrorJSON ( data )){
					var $l = $("[mz-data-list='years']"); 
					$.each( $l , function(index, state) {						
						uiYears.loadSelectUI( $l[index], data );
					});	
				}
	   	 	});				
			var $l = $("[mz-data-list='years']"); 
			$.each( $l , function(index, state) {
				var $ui = $l[index];				
				$( $ui ).bind( "change", function( event ) {
					uiYears.validChange( this );
				});				
				$( $ui ).on( "beforesaving", function( event, data ) {					
					return uiYears.beforeSaving( this, data );
				});
				$( $ui ).on( "cleaner", function( event ) {					
					 uiYears.cleaner( this );
				});
			});
		},		
		loadSelectUI: function ( ui,  data ){						
			$.each(data, function(index, state) {
				var opt = "<option value='{0}'>{1}</option>";
				var v = data[index][0];				
				opt = opt.replace('{0}', v).replace('{1}', v);
				$( ui ).append(opt);
			});
		},
		refreshSelectUI: function ( ui ){			
			var $page = $( ui ).closest( "[data-role='page']" );
			var type = $( $page ).data( "type" );
			var ownerid = $( $page ).data( "year" );
			uiYears.fixLoad = false;
		 	if (type === 'user'){
		    	$( ui ).val( ownerid );
		    	try{
		    		$( ui ).selectmenu('disable');
		    		$( ui ).selectmenu("refresh");
		    	} catch( e ) { 
		    		uiYears.fixLoad = true;
		    	}
		 	}
		 	else{		 		
		 		try{		 			
		    		$( ui ).selectmenu("enable");
		    		$( ui ).selectmenu("refresh");
		    	} catch( e ) { 
		    		uiYears.fixLoad = true;
		    	}
		 	}
		},
		selectedItem: function( ui ){			
			return $( ui ).val();
		},
		validChange: function ( ui ) {			
			if ( helpUI.isError( ui ) ){
				return uiYears.valid( ui );
			}
		},
		valid: function ( ui ) {			
			return helpUI.valid( ui );
		},
		cleaner: function ( ui ) {
			helpUI.cleaner ( ui );			
			uiYears.refreshSelectUI( ui );
		},
		beforeSaving: function ( ui,  data ){			
			var para = $( ui ).attr( "mz-data-para" );
			var valid = uiYears.valid( ui );
	    	if ( valid ){
	    		var usr = uiYears.selectedItem( ui );
		    	data[ para ] = usr[ "year" ];  
		    }
	    	return valid;
		}
};
