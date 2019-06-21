var navigation = {
    "avatar" : "http://cdn.collider.com/uploads/imagegallery/iron_man_movie/iron_man_movie_image.jpg",
    "navbar" :  
        [
            { "url" : "https://raw.githubusercontent.com/baodainguyen/www/master/test/test-page-content.html"  , "icon": "fa-home", "name" : "Home"},
            { "url" : "https://raw.githubusercontent.com/baodainguyen/www/master/technical.html"  , "icon": "fa-user", "name" : "About"},
            { "url" : "#photos"  , "icon": "fa-image", "name" : "Photos"},
            { "url" : "#contact"  , "icon": "fa-envelope", "name" : "Contact"},
            { "url" : "#"  , "icon": "fa-ellipsis-h", "name" : "More"}
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
    ipadNav.each(function(index) {
        $(this).click(function(){
            loadAndRemoveAllSelector(this);
            $(this).addClass('w3-black');
            $(iphoneNav[index]).addClass('w3-black');
        });
    });
    iphoneNav.each(function(index) {
        $(this).click(function(){
            loadAndRemoveAllSelector(this);
            $(this).addClass('w3-black');
            $(ipadNav[index]).addClass('w3-black');
        });
    });
    function loadAndRemoveAllSelector(selector){
        var url = $(selector).attr('loadhref');
        $('#main-page-content').load(url);
        iphoneNav.each(function() { $(this).removeClass('w3-black'); });
        ipadNav.each(function() { $(this).removeClass('w3-black'); });
    };
};