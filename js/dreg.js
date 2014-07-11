dreg ={
		load: function () {
			$('#dreg').on('blur', function() {
				dreg.validBlur();			         
			});
		},
		validBlur: function () {
			var ui = $( "#dreg" );
			if ( helpUI.isError( ui ) ){
				return helpUI.valid( ui );
			}
		},
		valid: function () {
			var val = $('#dreg').val();
			if (helpData.overFlowNow( val )){
				helpUI.addError( $('#dreg') );
				return false;
			}else{
				helpUI.removeError( $('#dreg') );
				return true;	
			}
			
		},
		selectedItem: function () {
			return $('#dreg').val();
		}
};