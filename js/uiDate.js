uiDate ={
		id:"dreg",
		load: function () {
			var $l = $("[mz-data-type='dreg']"); 
			$.each( $l , function(index, state) {
				var $ui = $l[index];				
				$( $ui ).on("blur", function() {
					uiDate.validBlur( $ui );			         
				});
				$( $ui ).on( "beforesaving", function(event, data) {					
					return uiDate.beforeSaving( this, data );
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
		},
		beforeSaving: function ( ui,  data ){
			var para = $( ui ).attr( "mz-data-para" );
			var valid = uiDate.valid( ui );
    	    if ( valid ){
	    	  var d = uiDate.selectedItem( ui );
	    	  data[ para ] = d;
    	    }
	    	return valid;
		}
};