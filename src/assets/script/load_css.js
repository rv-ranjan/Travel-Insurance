function load_css(app_version) {
	if(app_version && (app_version === 'IMAGIC_APP' || app_version === 'IMAGIC_WEB')){
		$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://origin-cdnh.policyboss.com/website/css/i-magic/i-Magic_NewStyle.css') );
	}
}