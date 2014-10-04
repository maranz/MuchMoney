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
			var projectid = $( $page ).data( "projectid" );
			if (projectid  != undefined && projectid  != null || projectid  != ''){
				data[ "projectid" ] = projectid ;
			}
			var valid = true;
			$.each( $l , function(index, state) {				
				var event = $.Event( "beforesaving" );				
				if ($( $l[index] ).is(':visible')) {
					$( $l[index] ).trigger( event, data );
					if ( valid ) {
						valid = event.result;
					}
				}
			});
			if ( valid ){				
				 helpAjax.call(data, function ( data ) {
					if (!helperMessage.showMessageErrorJSON ( data )){
						var event = $.Event("aftersavepage");						
						var r = $page.trigger( event, data );
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