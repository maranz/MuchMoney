dreg ={
		id:"dreg",
		load: function () {
			var $l = $("[mz-data-type='dreg']"); 
			$.each( $l , function(index, state) {
				var $ui = $l[index];				
				$( $ui ).on("blur", function() {
					dreg.validBlur( $ui );			         
				});
			});
		},
		validBlur: function ( ui ) {			
			if ( helpUI.isError( ui ) ){
				return dreg.valid( ui );
			}
		},
		valid: function ( ui ) {
			var valid = helpUI.valid( ui );
			if ( valid ){
				var val = $( ui ).val();
				if (val == "" || helpDate.overFlow( val )){
					helpUI.addError( ui );
					return false;
				}else{
					helpUI.removeError( ui );
					return true;	
				}	
			}
		},
		selectedItem: function ( ui ) {
			return $( ui ).val();
		},
		setDateNow: function ( id ) {
			$( "#" + id ).val( helperInput.getDateNow() );
		}
};