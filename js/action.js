action = {
		load: function (){
			var $l = $( "[mz-data-action]" ); 
			$.each( $l , function(index, state) {
				var $ui = $l[index];
				$( $ui ).bind( "click", function() {
					action.handleClick( this );
				});				
			});
		},
		handleClick: function ( event ){
			var $p = $( event ).parent();
			var $l = $( $p ).find(":input");
			var act = $( event ).attr( "mz-data-action" );
			var data = {};
			data[ "action" ] = act;
			var $page = $( event ).closest( "[data-role='page']" );
			var ownerid = $( $page ).data( "ownerid" );
			if (ownerid != 'undefined' && ownerid != null || ownerid != ''){
				data[ "groupid" ] = ownerid;
			}
			var valid = true;
			$.each( $l , function(index, state) {
				var v = action.handleClickItem( $l[index] , data);
				if ( valid ) {
					valid = v;
				}
			});
			if ( valid ){
				/*
				 helpAjax.call(data, function ( data ) {
					if (!helperMessage.showMessageErrorJSON ( data )){
						alert('saveOk');
					}	
		   	 	});
		   	 	*/	
			}
		},
		handleClickItem: function ( item, data){
			var list = $( item ).attr( "mz-data-list" );
			var para = $( item ).attr( "mz-data-para" );			
			var valid = true;
			switch( list ){
		      case user.id:
	    		  valid = user.valid( item );
		    	  if ( valid ){
		    		  var usr = user.selectedItem( item );
			    	  data[ para ] = usr[ "id" ];  
		    	  }
		    	  break;
		      case itemcost.id:
		    	  valid = itemcost.valid( item );
		    	  if ( valid ){
			    	  var itmcst = itemcost.selectedItem( item );
			    	  data[ para ] = itmcst[ "name" ];
		    	  }
		    	  break;
		    }
			var type = $( item ).attr( "mz-data-type" ); 
			switch(type){
		      case dreg.id:
		    	  valid = dreg.valid( item );
		    	  if ( valid ){
			    	  var d = dreg.selectedItem( item );
			    	  data[ para ] = d;
		    	  }
		    	  break;
		      case money.id:
		    	  valid = money.valid( item );
		    	  if ( valid ){
			    	  var mny = money.selectedItem( item );
			    	  data[ para ] = mny["val"];
		    	  }
		    	  break;
		    }
			return valid;
		},
		clear: function() {
			
		}
};