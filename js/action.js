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
		      case uiUser.id:
	    		  valid = uiUser.valid( ui );
		    	  if ( valid ){
		    		  var usr = uiUser.selectedItem( ui );
			    	  data[ para ] = usr[ "id" ];  
		    	  }
		    	  break;
		      case uiItemCost.id:
		    	  valid = uiItemCost.valid( ui );
		    	  if ( valid ){
			    	  var itmcst = uiItemCost.selectedItem( ui );
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
		      case uiMoney.id:
		    	  valid = uiMoney.valid( ui );
		    	  if ( valid ){
			    	  var mny = uiMoney.selectedItem( ui );
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
			var list = $( ui ).attr( "mz-data-list" );
			switch( list ){
		      case uiUser.id:
		    	  uiUser.clear( ui );
		    	  break;
		      case uiItemCost.id:
		    	  uiItemCost.clear( ui );
		    	  break;
		    }
			var type = $( ui ).attr( "mz-data-type" ); 
			switch(type){
		      case dreg.id:
		    	  dreg.clear( ui );
		    	  break;
		      case uiMoney.id:
		    	  uiMoney.clear( ui );
		    	  break;
		    }
		}
};