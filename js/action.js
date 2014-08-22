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
			$.each( $l , function(index, state) {
				action.handleClickItem( $l[index] , data);				
			});
		},
		handleClickItem: function ( item, data){
			var list = $( item ).attr( "mz-data-list" );
			var para = $( item ).attr( "mz-data-para" );
			switch( list ){
		      case user.id:
		    	  var usr = user.selectedItem( item );
		    	  data[ para ] = usr[ "id" ];
		    	  break;
		      case itemcost.id:
		    	  var itmcst = itemcost.selectedItem( item );
		    	  data[ para ] = itmcst[ "name" ];
		    	  break;
		    }
			var type = $( item ).attr( "mz-data-type" ); 
			switch(type){
		      case dreg.id:
		    	  var d = dreg.selectedItem( item );
		    	  data[ para ] = d;
		    	  break;
		      case money.id:
		    	  var mny = money.selectedItem( item );
		    	  data[ para ] = mny["val"];
		    	  break;
		    }
		}
};