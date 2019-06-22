var navigation = {
    "avatar" : "http://cdn.collider.com/uploads/imagegallery/iron_man_movie/iron_man_movie_image.jpg",
    "navbar" :  
        [
            { "url" : "https://raw.githubusercontent.com/baodainguyen/www/master/test/test-page-content.html"  , "icon": "fa-home", "name" : "Home", "type": "loadpage"},
            { "url" : "https://raw.githubusercontent.com/baodainguyen/www/master/technical.html"  , "icon": "fa-code", "name" : "Projects", "type": "loadpage"},
            { "url" : "load-gallery"  , "icon": "fa-image", "name" : "Gallery", "type": "loadpage"},
            { "url" : "load-about"  , "icon": "fa-gg", "name" : "Technic", "type": "loadpage"},
            { "url" : "http://www.load-more-contact-knowledges"  , "icon": "fa-ellipsis-h", "name" : "More", "type": "newpage"}
        ]
};
$(document).ready(function(){
    bindView();
    controlNav();
});
function bindView(){
    var viewModel = kendo.observable({
		imgAvatar : navigation.avatar,
		dataNavigator: navigation.navbar,
        isLarge: true,
        isMobile: true
	});
	kendo.bind($("#navigator-bar"), viewModel);
};
function controlNav(){
    var ipadNav = $('#navigator-bar > nav > div').children();
    var iphoneNav = $('#navigator-bar div.w3-bar').children();
    loopNav(ipadNav, iphoneNav);
    loopNav(iphoneNav, ipadNav);
    function loadAndRemoveAllSelector(selector){
        var loadType = $(selector).attr('loadtype');
        var url = $(selector).attr('loadhref');
        switch(loadType){
            case 'loadpage' :
                $('#main-page-content').load(url);
                break;
            case 'newpage' :
                window.open(url);
                break;
        };
        iphoneNav.each(function() { $(this).removeClass('w3-black'); });
        ipadNav.each(function() { $(this).removeClass('w3-black'); });
    };
    function loopNav(arrayNav1, arrayNav2){
        arrayNav1.each(function(index) {
        $(this).click(function(){
            if($(this).hasClass('w3-black')) return;
            loadAndRemoveAllSelector(this);
            $(this).addClass('w3-black');
            $(arrayNav2[index]).addClass('w3-black');
        });
    });
    };
};