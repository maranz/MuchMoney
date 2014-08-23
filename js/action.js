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
				var v = action.loadDataByUI( $l[index] , data);
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
		loadDataByUI: function ( ui, data){
			var para = $( ui ).attr( "mz-data-para" );
			var valid = true;
			var list = $( ui ).attr( "mz-data-list" );
			switch( list ){
		      case user.id:
	    		  valid = user.valid( ui );
		    	  if ( valid ){
		    		  var usr = user.selectedItem( ui );
			    	  data[ para ] = usr[ "id" ];  
		    	  }
		    	  break;
		      case itemcost.id:
		    	  valid = itemcost.valid( ui );
		    	  if ( valid ){
			    	  var itmcst = itemcost.selectedItem( ui );
			    	  data[ para ] = itmcst[ "name" ];
		    	  }
		    	  break;
		    }
			var type = $( ui ).attr( "mz-data-type" ); 
			switch(type){
		      case dreg.id:
		    	  valid = dreg.valid( ui );
		    	  if ( valid ){
			    	  var d = dreg.selectedItem( ui );
			    	  data[ para ] = d;
		    	  }
		    	  break;
		      case money.id:
		    	  valid = money.valid( ui );
		    	  if ( valid ){
			    	  var mny = money.selectedItem( ui );
			    	  data[ para ] = mny["val"];
		    	  }
		    	  break;
		    }
			return valid;
		},
		clear: function( ui ) {
			var $l = $( ui ).find(":input");
			$.each( $l , function(index, state) {
				action.clearUI( $l[index] );
			});
		},
		clearUI: function ( ui ){
			var $page = $( ui ).closest( "[data-role='page']" );
			var type = $( $page ).data( "type" );
			var ownerid = $( $page ).data( "ownerid" );
			var list = $( ui ).attr( "mz-data-list" );
			switch( list ){
		      case user.id:
		    	  user.clear( ui, type, ownerid );
		    	  break;
		      case itemcost.id:
		    	  itemcost.clear( ui );
		    	  break;
		    }
			var type = $( ui ).attr( "mz-data-type" ); 
			switch(type){
		      case dreg.id:
		    	  dreg.clear( ui );
		    	  break;
		      case money.id:
		    	  money.clear( ui );
		    	  break;
		    }
		}
};