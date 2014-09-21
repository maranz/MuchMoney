var helperURL = function ( url ) {
	 var list = new Array();
	 if (url != null){
		 list ["selector"] = url.replace( /\?.*$/, "" );
		 var urlParam = url.replace( /.*\?/, "" );
		 var params = urlParam.split("&");
		 for (var param in params) {
			 var split =  params[param].split("=");
		     var key = $.trim(split[0]); 
		     var value = $.trim(split[1]);
		     list[key] = value;
		 };
	 }
     this.item = function(key){
    	 return list[key];
     };
};

helperData = {
	addDataKey: function( data ){
    	 data["userid"] = config.idUser();
		 data["appid"] = config.idApp();
     }
};

helperDate = {
	overFlow : function ( val ){
		var c = val.replace ( /-/g , "");
		var n = helperDate.getDateNowToString();
		return ( c > n );
	},
	getDateNowToString: function () {
		var n = new Date();
		var m = (n.getMonth() + 1); 
		if ( m.length = 1 ){
			return "".concat( n.getFullYear()
					 , "0"
					 , m
					 , n.getDate());
		}else{
			return "".concat( n.getFullYear()					 
					 , m
					 , n.getDate());
		}
	},
	getNowToString: function () {
		var now = new Date();   
        var dd = ("0" + now.getDate()).slice(-2);
        var mm = ("0" + (now.getMonth() + 1)).slice(-2);        
        var yyyy = now.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
	},
	getYear: function (){
		return ( new Date ).getFullYear();
	}
};

helperMessage = {
	showAJAXException: function( xhr, status ) {
		if (xhr.status === 0) {
			helperMessage.showMessage('Not connect.\n Verify Network.');
        } else if (xhr.status == 404) {
        	helperMessage.showMessage('Requested page not found. [404]');
        } else if (xhr.status == 500) {
        	helperMessage.showMessage('Internal Server Error [500].');
        } else if (status === 'parsererror') {
        	helperMessage.showMessage('Requested JSON parse failed.');
        } else if (status === 'timeout') {
        	helperMessage.showMessage('Time out error.');
        } else if (status === 'abort') {
        	helperMessage.showMessage('Ajax request aborted.');
        } else {
        	helperMessage.showMessage('Uncaught Error.\n' + xhr.responseText);
        }
	},
	showMessage: function( msg ){
		console.log ('MuchMoneyLog: ' + msg );  
		//alert( msg );
	},
	showMessageErrorJSON: function( data ){
		if ($(data).length > 0 && data[0]["error"] != null){
			helperMessage.showMessage(data[0]["msg"]);
			return true;
		}
		return false;
	}
};

helperString = {
	isEmpty: function ( value ){
		if (value === null || value === 'undefined'){
			return true;			
		}
		else{
			if (value.trim().length === 0)
				return true;
			else
				return false;
		}	
	},
	pad: function (str, max, p) {
	  str = str.toString();
	  return str.length < max ? helperString.pad(p + str, max, p) : str;
	},
	padSpace: function(text, max) {		
		var d = max - text.length;
		var t = "";
		for ( var i = 0, l = d; i < l; i++ ) {
			t += "&nbsp";
		}
		t += text;
		return t;
	}
};

helpAjax = {
	call: function (data, success){
		helperData.addDataKey(data);
		var url = config.service();		
		var json = JSON.stringify(data);
		/*
		*   Chiamata CrossDomain tecnica jsonp con Jquery
		*   purtroppo funziona solo con la GET
		*   l'altra possibilita è la tecnica CORS
		*   non sono riuscito a farla funzionare, da vedere se con jsonp 
		*   la sicurezza potrebbe essere a rischio.
		*/
		//data: "param=" + json,
		$.ajax({
			  type: 'GET',
			  url: url,
			  data: 'param=' + json,	   	      
	   	      dataType: "jsonp",
	   	      crossDomain: true,
	   	      jsonp:'callback',
	   	      timeout:10000,
	   	      beforeSend: function() { $.mobile.loading('show'); },
	   	      complete: function() { $.mobile.loading('hide'); },
	   	      success: success,
	       	  error: function ( xhr, status ) {
	       		  helperMessage.showAJAXException(  xhr, status );
	       	  }  
		});		
		/*
		 * Chiamata ajax classica con post, Funziona con sito nello stesso dominio
		 * del servizio. Non fattibile nello scenario di muchmoney.
		$.ajax({  	      
	   	      type: "POST",
	   	      dataType: "json",	      
	   	      url: url, 
	   	      data: data,
	   	      success: success,
	       	  error: function ( xhr, status ) {
	       		helperMessage.showAJAXException(  xhr, status );
	       	  }       		
   	      });
		*/
	}	
};

helpUI = {
	valid: function ( ui ) {
		var required = ( $( ui ).attr( "mz-data-required" ) == "true");
		if (required && helpUI.isVoid( ui )){
			helpUI.addError( ui );				
			return false;
		}
		helpUI.removeError( ui );
		return true;
	},
	addError: function ( ui ) {
		$( ui ).closest('div').addClass('ui-error');
	},	
	removeError: function ( ui ) {
		$( ui ).closest('div').removeClass('ui-error');
	},
	isVoid: function ( ui ) {
		var v = $( ui ).val();
		return v == null || $.trim(v) == '' || $.trim(v) == 'null';
	},
	isError: function ( ui ){
		return $( ui ).closest('div').hasClass( "ui-error" );
	},
	cleaner: function ( ui ){
		$( ui ).val( "" );
		helpUI.removeError( ui );
	}
};