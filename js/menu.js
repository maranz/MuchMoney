menu = {		 
	 loadStartMenu: function ( idContainer ){
		 var data = {
			 "action":"startmenu"
    	 };
		 helpAjax.call(data, function ( data ) {
	   	    	if (!helperMessage.showMessageErrorJSON ( data ))
	   	    		menu.loadContainer(idContainer, data);
	   	 });		 
	 },
	 loadContainer: function( idContainer, data ){
		 $("#" + idContainer ).html( "" );
		 $("#" + idContainer).append( "<ul id='lst" + idContainer + "' data-role='listview' class='ui-listview'></ul>");
		 $("#" + idContainer).trigger("create");		 
		 for ( var i = 0, l = data.length; i < l; i++ ) {
			 var id = data[i][0];
			 var order = data[i][1];
			 var title = $.trim(data[i][2]);
			 var subtitle = $.trim(data[i][3]);
			 var img = $.trim(data[i][4]);
			 var selector = $.trim(data[i][5]);
			 var type = $.trim(data[i][6]);
			 var projectid = $.trim(data[i][8]);
			 var html = "<li data-theme='c'>";
			 html += ("<a href='{0}?type={1}&name={2}&projectid={3}&action=new' class='ui-link-inherit'>")
			 		 .replace("{0}", selector)
			 		 .replace("{1}", type)
			 		 .replace("{2}", title)
			 		 .replace("{3}", projectid);
			 html += ("<img src='img/{0}' class='ui-li-thumb'>").replace("{0}", img); 
			 html += ("<h3 class='ui-li-heading'>{0}</h3>").replace("{0}", title);
			 html += ("<p class='ui-li-desc'>{0}</p>").replace("{0}", subtitle);  
			 html += "</a>";
			 html += "</li>"; 
			 $("#lst" + idContainer).append(html);
		 }
		 $("#lst" + idContainer).listview("refresh");
	 }
};




