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
						var id = $l[index].id;
						user.loadSelectUI( id, data );
					});
	   	    		
	   	 	});				
			var $l = $("[mz-data-list='users']"); 
			$.each( $l , function(index, state) {
				var id = $l[index].id;
				$( "#" + id ).on( "blur", function() {
					user.validBlur( id );
				});
			});
		},
		loadSelectUI: function ( id,  data ){
			var s = $( "#" + id );			
			$.each(data, function(index, state) {
				var opt = "<option value='{0}'>{1}</option>";
				var k = data[index][0];
				var v = data[index][1];
				opt = opt.replace('{0}', k).replace('{1}', v);
				s.append(opt);
			});
		},
		refreshSelectUI: function ( id, type, userid ){
			user.type = type;
			user.userid = userid;
			user.fixLoad = false;
		 	if (type === 'user'){
		    	$( "#" + id ).val( userid );
		    	try{
		    		$( "#" + id ).selectmenu('disable');
		    		$( "#" + id ).selectmenu("refresh");
		    	} catch( e ) { 
		    		user.fixLoad = true;
		    	}
		 	}
		 	else{		 		
		 		try{		 			
		    		$( "#" + id ).selectmenu("enable");
		    		$( "#" + id ).selectmenu("refresh");
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
		clear: function ( id ) {
			$( "#" + id ).val( "" );
		}
};
