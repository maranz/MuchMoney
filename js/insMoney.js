insMoney = {
	urlObj: null,	
	showInsMoneyPage: function ( urlObj, options ){
		if (options.changeHash) {
			insMoney.urlObj = new helperURL( urlObj );	
		 	var hu = insMoney.urlObj;	
		 	var type = hu.item( "type" );
		 	var name =  hu.item( "name" );
		 	var pageSelector = hu.item( "selector" );
		 	var ownerid = hu.item( "ownerid" );
		 	
		 	insMoneynav.load(type); 	
		 	insMoney.initInsMoneyout( type, ownerid );
		 	insMoney.initInsMoneyin( type, ownerid );
		 	
	        var $page = $( pageSelector );
		 	$page.page();
		    options.dataUrl = urlObj.href;
		    
		 	$.mobile.changePage( $page, options );
		}
	},
	initInsMoneyout: function (type, ownerid){		
		user.clear( "selectUsersout" );
		user.refreshSelectUI( "selectUsersout" , type, ownerid );
		dreg.setDateNow( "dregout" );
		itemcost.clear( "itemcostout" );
		money.clear( "moneyout" );
	},
	initInsMoneyin: function (type, ownerid){		
		user.clear( "selectUsersin" );
		user.refreshSelectUI( "selectUsersin" , type, ownerid );
		dreg.setDateNow( "dregin" );
		itemcost.clear( "itemcostin" );
		money.clear( "moneyin" );
	},
	showInsMoneyContent: function ( urlObj ){
		var $a = $("div[data-role='navbar'] a[href='" + urlObj.hash + "']");		
		var $content = $($a.attr("href"));
	    $content.siblings().hide();
	    $content.show();
	},
	setFocus: function (){
		if (!$('#user').is(':disabled')){
			$('#user').focus().tap();			
		}
		else{
			$('#dreg').focus().tap();
		}
	},	
	saveout: function (){
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
				"vdate": d,
				"itemcostname": itmcst["name"],
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
	savein: function (){
		
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

insMoneynav = {
	hide: function (){
		$('#insMoneynav').hide();
	},	
	show: function () {
		$('#insMoneynav').show();
	},
	load: function (type){
		if (type === "user") {
			insMoneynav.show();
		}else{
			insMoneynav.hide();			
		}
		$('#insMoneynav a').removeClass('ui-btn-active');
		$('#insMoneynav a[href="#insMoneyout"]').addClass('ui-btn-active');
		var $content = $("#insMoneyout");
		$content.siblings().hide();
	    $content.show();
	}
};
