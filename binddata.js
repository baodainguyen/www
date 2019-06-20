var navigation = {
    "avatar" : "http://cdn.collider.com/uploads/imagegallery/iron_man_movie/iron_man_movie_image.jpg",
    "navbar" :  
        [
            { "url" : "#"  , "icon": "fa-home", "name" : "Home"},
            { "url" : "#about"  , "icon": "fa-user", "name" : "About"},
            { "url" : "#photos"  , "icon": "fa-image", "name" : "Photos"},
            { "url" : "#contact"  , "icon": "fa-envelope", "name" : "Contact"},
            { "url" : "#"  , "icon": "fa-ellipsis-h", "name" : "More"}
        ]
};
$(document).ready(function(){
    bindView();
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