
$(document).ready(function(){
    bindData("technical-stack", "https://raw.githubusercontent.com/baodainguyen/data/master/TechnicalStack.json");
    bindData("package-manager", "https://raw.githubusercontent.com/baodainguyen/data/master/PackageManager.json");
});
function bindData(id, jsonUrl) {
    $.getJSON(jsonUrl, function(result){
    	bindView(id, result);
    });
};
function bindView(id, data){
	var viewModel = kendo.observable({
		tablehead : data.header,
		tablebody: data.body
	});
	kendo.bind($("#" + id), viewModel);
};