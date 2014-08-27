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
			if (ownerid != undefined && ownerid != null || ownerid != ''){
				data[ "groupid" ] = ownerid;
			}
			var valid = true;
			$.each( $l , function(index, state) {				
				var event = $.Event( "beforesaving" );
				var v = $( $l[index] ).trigger( event, data );
				if ( valid ) {
					valid = v;
				}				
			});
			if ( valid ){				
				 helpAjax.call(data, function ( data ) {
					if (!helperMessage.showMessageErrorJSON ( data )){
						var moneyID = data[0][0];
						var itemCostId = data[0][1];
						var itemCostName = data[0][2];
						
						$.each( $l , function(index, state) {
							var event = $.Event( "aftersaved" );
							$( $l[index] ).trigger( event, data );
						});
						/*var event = $.Event("aftersavepage");						
						var r = $page.trigger( event );
						if (event.result == false)
							alert ( 'Stop' );
						*/
						
						//action.clear ( $page );
					}	
		   	 	});		   	 	
			}
		},
		cleaner: function( ui ) {
			var $l = $( ui ).find(":input");
			$.each( $l , function(index, state) {
				var event = $.Event( "cleaner" );
				$( $l[index] ).trigger( event );
			});
		}
};