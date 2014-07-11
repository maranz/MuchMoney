insMoney = {
	urlObj: null,
	load: function (){
		user.load();
		itemcost.load();
		money.load();
		dreg.load();
		$( "#saveMoney" ).bind( "click", function(event, ui) {
			insMoney.save();
		});
	},	
	showInsMoney: function ( urlObj, options ){
		if (options.changeHash) {
			insMoney.urlObj = new helperURL( urlObj );	
		 	var hu = insMoney.urlObj;	
		 	var type = hu.item( "type" );
		 	var name =  hu.item( "name" );
		 	var pageSelector = hu.item( "selector" );
		 	var ownerid = hu.item( "ownerid" );
		 	
		 	user.refreshSelectUI(type, ownerid);
		 	
	        $('#dreg').val(helperInput.getDateNow());
	        
	        var $page = $( pageSelector );
		 	$page.page();
		    options.dataUrl = urlObj.href;
		 	$.mobile.changePage( $page, options );
		}
	},
	setFocus: function (){
		if (!$('#user').is(':disabled')){
			$('#user').focus().tap();			
		}
		else{
			$('#dreg').focus().tap();
		}
	},	
	save: function (){
		if (user.valid()
		  & dreg.valid()
		  & itemcost.valid()
		  & money.valid()){
			var usr = user.selectedItem();
			var d = dreg.selectedItem();
			var itmcst = itemcost.selectedItem();
			var mny = money.selectedItem();
			var grp = insMoney.getGroup();
			var data = {
				"action": "insertmoneyout",
				"useridowner": usr["id"],
				"itemcostname": itmcst["name"],
				"vdate": d,
				"money": mny["val"],
				"groupid": grp
		    };
			helpAjax.call(data, function ( data ) {
				if (!helperMessage.showMessageErrorJSON ( data )){
					alert('saveOk');
				}	
	   	 	});	
		}	
	},
	getGroup: function () {
		if (insMoney.urlObj != null
			&& insMoney.urlObj.item( "type" ) != null
			&& insMoney.urlObj.item( "type" ) != 'undefined'
			&& insMoney.urlObj.item( "type" ) == 'group'
			&& insMoney.urlObj.item( "ownerid" ) != null
			&& insMoney.urlObj.item( "ownerid" ) != 'undefined'){
				return insMoney.urlObj.item( "ownerid" );
		}
		else{
			return '';
		}
	}
};
