user = {
		id:"user",
		fixLoad:false,
		type:"",
		userid:"",
		users:[],
		load: function(){
			var data = {
				 "action":"users"    			
	    	};			
			helpAjax.call(data, function ( data ) {
				if (!helperMessage.showMessageErrorJSON ( data ))
					var $l = $("[mz-data-list='user']"); 
					$.each( $l , function(index, state) {						
						user.loadSelectUI( $l[index], data );
					});
	   	    		
	   	 	});				
			var $l = $("[mz-data-list='user']"); 
			$.each( $l , function(index, state) {
				var $ui = $l[index];				
				$( $ui ).bind( "change", function(event, ui) {
					user.validChange( this );
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
		refreshSelectUI: function ( ui, type, userid ){
			user.type = type;
			user.userid = userid;
			user.fixLoad = false;
		 	if (type === 'user'){
		    	$( ui ).val( userid );
		    	try{
		    		$( ui ).selectmenu('disable');
		    		$( ui ).selectmenu("refresh");
		    	} catch( e ) { 
		    		user.fixLoad = true;
		    	}
		 	}
		 	else{		 		
		 		try{		 			
		    		$( ui ).selectmenu("enable");
		    		$( ui ).selectmenu("refresh");
		    	} catch( e ) { 
		    		user.fixLoad = true;
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
				return user.valid( ui );
			}
		},
		valid: function ( ui ) {			
			return helpUI.valid( ui );
		},
		clear: function ( ui , type, ownerid) {
			helpUI.clear ( ui );			
			user.refreshSelectUI( ui , type, ownerid );
		}
};
