uiDate ={
		id:"dreg",
		load: function () {
			var $l = $("[mz-data-type='dreg']"); 
			$.each( $l , function(index, state) {
				var $ui = $l[index];				
				$( $ui ).on("blur", function() {
					uiDate.validBlur( $ui );			         
				});
			});
		},
		validBlur: function ( ui ) {			
			if ( helpUI.isError( ui ) ){
				return uiDate.valid( ui );
			}
		},
		valid: function ( ui ) {
			var valid = helpUI.valid( ui );
			if ( valid ){
				var val = $( ui ).val();
				if (val == "" || helperDate.overFlow( val )){
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
		clear: function ( ui ) {
			helpUI.clear ( ui );
			var def =  $( ui ).attr( "mz-data-default" );
			if (def == "now"){
				$( ui ).val( helperDate.getNowToString() );
			}
		}
};