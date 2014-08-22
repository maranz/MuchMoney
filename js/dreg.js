dreg ={
		id:"dreg",
		load: function () {
			var $l = $("[mz-data-type='dreg']"); 
			$.each( $l , function(index, state) {
				var id = $l[index].id;				
				$("#" + id).on("blur", function() {
					dreg.validBlur( id );			         
				});
			});
		},
		validBlur: function ( id ) {
			var ui = $( "#" + id);
			if ( helpUI.isError( ui ) ){
				return helpUI.valid( ui );
			}
		},
		valid: function ( id ) {
			var val = $( "#" + id ).val();
			if (helpData.overFlowNow( val )){
				helpUI.addError( $( "#" + id ) );
				return false;
			}else{
				helpUI.removeError( $("#" + id) );
				return true;	
			}
		},
		selectedItem: function ( ui ) {
			return $( ui ).val();
		},
		setDateNow: function ( id ) {
			$( "#" + id ).val( helperInput.getDateNow() );
		}
};