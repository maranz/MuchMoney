user = {		
		fixLoad:false,
		type:"",
		userid:"",
		users:[],
		load: function()
		{	
			var data = {
				 "action":"users"    			
	    	};			
			helpAjax.call(data, function ( data ) {
				if (!helperMessage.showMessageErrorJSON ( data ))
	   	    		user.loadSelectUI( data );
	   	 	});	
			
			$('#selectUsers').on('blur', function() {
				user.validBlur();			         
			});
		},
		loadSelectUI: function ( data ){
			var s = $(".selectUsers");			
			$.each(data, function(index, state) {
				var opt = "<option value='{0}'>{1}</option>";
				var k = data[index][0];
				var v = data[index][1];
				opt = opt.replace('{0}', k).replace('{1}', v);
				s.append(opt);
			});
		},
		refreshSelectUI: function ( type, userid ){
			user.type = type;
			user.userid = userid;
			user.fixLoad = false;
		 	if (type === 'user'){
		    	$( '#selectUsers' ).val( userid );
		    	try{
		    		$( '#selectUsers' ).selectmenu('disable');
		    		$( "#selectUsers" ).selectmenu("refresh");
		    	} catch( e ) { 
		    		user.fixLoad = true;
		    	}
		 	}
		 	else{		 		
		 		try{		 			
		    		$( '#selectUsers' ).selectmenu('enable');
		    		$( "#selectUsers" ).selectmenu("refresh");
		    	} catch( e ) { 
		    		user.fixLoad = true;
		    	}
		 	}
		},
		selectedItem: function(){
			var item = [];
			var val = $( '#selectUsers' ).val();
			if (val != 'err'){
				item['id'] = val;
				item['name'] = $( '#selectUsers option:selected' ).text();
			}
			return item;
		},
		validBlur: function () {
			var ui = $( "#selectUsers" );
			if ( helpUI.isError( ui ) ){
				return helpUI.valid( ui );
			}
		},
		valid: function () {
			var ui = $( "#selectUsers" );
			return helpUI.valid( ui );
		}
};
