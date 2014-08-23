money = {	
		id:"money",
		load: function(){
			var $l = $("[mz-data-type='money']"); 
			$.each( $l , function(index, state) {
				var $ui = $l[index];
				$( $ui ).bind( "keyup", function(e, ui) {
					money.mask( this );					
				});	
				$( $ui ).bind('blur', function() {
					money.validBlur( this );			         
				});
			});
		},
		mask: function(input) {
			var pos = $( input ).caret();				
			var text = $( input ).val();
			var mask = new maskMoneyItem(pos, text);
			helperMaskEuro.RemovePoint(mask);
			mask.setPointCount();			
			helperMaskEuro.removeSymbolEuro( mask );
			helperMaskEuro.replacePointTo( mask );			
			helperMaskEuro.removeCharNotValid( mask );
			helperMaskEuro.Overflow( mask );
			helperMaskEuro.removeComma( mask );
			helperMaskEuro.addSymbolEuro( mask );			
			helperMaskEuro.formatEuro( mask );			
			if ($( input ).val() != mask.text){
				$( input ).val( mask.text );
				mask.refreshPos();
				$( input ).caret( mask.pos );
			}
		},
		selectedItem: function( ui ){
			var val = $( ui ).val();
			var item = [];			
			item["val"] = helperMaskEuro.removeFormat( val );
			item["text"] = val;			
			return item;			 
		},
		validBlur: function ( ui ) {			
			if ( helpUI.isError( ui ) ){
				return money.valid( ui );
			}
		},
		valid: function ( ui ) {			
			return helpUI.valid( ui );
		},
		clear: function ( ui ){
			helpUI.clear ( ui );
		}
};

maskMoneyItem = function (pos, text){
	this.pos = pos;	
	this.text = text;	
	this.pointcount = 0;
	this.refreshPos = function(){
		var pc =  helperMaskEuro.countPoint(this.text, this.pos);
		this.pos = this.pos + (pc - this.pointcount);	
	};
	this.setPointCount = function (){
		this.pointcount = helperMaskEuro.countPoint(this.text, this.pos);
	};
};

helperMaskEuro = {	
	getFormatText: function ( text ){
		return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");		
	},
	addSymbolEuro: function ( mask ){
		var text = mask.text;
		if (text != "" && text.match(/^\u20ac/) == null){
			mask.text = '\u20ac ' + text;					
		}
	},	
	removeSymbolEuro: function ( mask ){
		var text = mask.text;		
		var pattern = /^\u20ac([^0-9]*?)\s/g;
		var m = text.match(pattern);
		if (m != null){			 
			mask.text = text.replace(pattern, '');
			mask.pos = mask.pos - (m[0].length - 2);
		}else{
			mask.pos = mask.pos + 2;
		}
	},
	replacePointTo: function ( mask ){
		var text = mask.text;
		var isComma = text.match(/,/g);		
		if (isComma == null) {
			isComma = text.match(/([0-9]\.$|\.[0-9]{0,2}$)/g);
		}else{
			isComma = null;
		}
		var pattern = /\.+/g;
		var points = text.match(pattern);
		if (points != null){
			if (isComma != null){
				text = text.replace(/\.$/g, ",");				
			}
			mask.text = text.replace(pattern, "");
		}
	},
	RemovePoint: function ( mask ){
		var pattern = /\.{2,}/g;
		var text = mask.text;
		var m = text.match(pattern);
		if (m != null){
			mask.text = text.replace(pattern, "");
			mask.pos = mask.pos - m[0].length;
		}
	},
	removeCharNotValid: function ( mask ){
		var text = mask.text;
		var pattern = /[^0-9\,]+/g;
		var m = text.match(pattern);
		if (m != null){
			mask.text = text.replace(pattern, "");
			mask.pos = mask.pos - m[0].length;  
		}
	},
	Overflow: function ( mask ){
		var text = mask.text;
		var m = text.match(/,\d{3,}$/g);		
		if (m != null){
			var d = text.match(/,\d{2}/g);			
			mask.text = text.replace(m[0], d[0]);
		}
	},
	removeComma: function ( mask ){
		var text = mask.text;
		var pattern = /,\d{0,2}$/g;
		var m = text.match(pattern );
		if (m == null){
			mask.text = text.replace( /,/g, "" );
		}else{
			var v = m[0].replace( ",", "#" );
			text = text.replace( pattern, v );
			var pattern1 = /,+/g;
			var m = text.match( pattern1 );				
			text = text.replace( pattern1, "" );
			text = text.replace( /#/g, "," );				
			mask.text = text;
			if (m != null){
				mask.pos = mask.pos - m[0].length;	
			}
		}
	},
	formatEuro: function ( mask ){
		var text = mask.text;
		var pattern = /(\d)(?=(\d{3})+(?!\d))/g;
		var m = text.match( pattern );
		if (m != null){
			mask.text = text.replace( pattern, "$1." );
		}			
	},
	countPoint: function ( text, pos ){
		var current = text.split("");
		var c = 0;
		for(i = 0; i < pos; i++){
			if (i > 0 && i < current.length){
				var s = current[i - 1] + current[i] + current[i + 1];
				var m = s.match(/\d\.\d/g); 
				if (m != null){
					c += 1;
				}	
			}
		}
		return c;		
	},
	removeFormat: function ( text ){
		var t = text.replace(/\u20ac\s|\./g, "");
		t = t.replace(",", ".");
		return t;
	}	
};