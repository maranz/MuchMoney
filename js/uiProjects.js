uiProjects = {
		id:"projects",
		fixLoad:false,
		Projects:[],
		load: function(){
			var data = {
				 "action":"projects"    			
	    	};			
			helpAjax.call(data, function ( data ) {
				if (!helperMessage.showMessageErrorJSON ( data ))
					var $l = $("[mz-data-list='projects']"); 
					$.each( $l , function(index, state) {						
						uiProjects.loadSelectUI( $l[index], data );
					});
	   	    		
	   	 	});				
			var $l = $("[mz-data-list='projects']"); 
			$.each( $l , function(index, state) {
				var $ui = $l[index];				
				$( $ui ).bind( "change", function( event ) {
					uiProjects.validChange( this );
				});				
				$( $ui ).on( "beforesaving", function( event, data ) {					
					return uiProjects.beforeSaving( this, data );
				});
				$( $ui ).on( "cleaner", function( event ) {					
					 uiProjects.cleaner( this );
				});
			});
		},		
		loadSelectUI: function ( ui,  data ){						
			$.each(data, function(index, state) {
				var opt = "<option value='{0}'>{1}</option>";
				var v = data[index][0];				
				var d = data[index][1];
				opt = opt.replace('{0}', v).replace('{1}', d);
				$( ui ).append(opt);
			});
		},
		refreshSelectUI: function ( ui ){			
			var $page = $( ui ).closest( "[data-role='page']" );
			var type = $( $page ).data( "type" );
			var ownerid = $( $page ).data( "ownerid" );
			uiProjects.fixLoad = false;
		 	if (type === 'user'){
		    	$( ui ).val( ownerid );
		    	try{
		    		$( ui ).selectmenu('disable');
		    		$( ui ).selectmenu("refresh");
		    	} catch( e ) { 
		    		uiProjects.fixLoad = true;
		    	}
		 	}
		 	else{		 		
		 		try{		 			
		    		$( ui ).selectmenu("enable");
		    		$( ui ).selectmenu("refresh");
		    	} catch( e ) { 
		    		uiProjects.fixLoad = true;
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
				return uiProjects.valid( ui );
			}
		},
		valid: function ( ui ) {			
			return helpUI.valid( ui );
		},
		cleaner: function ( ui ) {
			helpUI.cleaner ( ui );			
			uiProjects.refreshSelectUI( ui );
		},
		beforeSaving: function ( ui,  data ){			
			var para = $( ui ).attr( "mz-data-para" );
			var valid = uiProjects.valid( ui );
	    	if ( valid ){
	    		var usr = uiProjects.selectedItem( ui );
		    	data[ para ] = usr[ "id" ];  
		    }
	    	return valid;
		}
};
