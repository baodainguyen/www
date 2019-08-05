
var Service = (function(){
  function getInfo(callback) {
    var url = 'https://script.google.com/macros/s/AKfycbz-NAllZ6wAG7gDVAlVfvowxCN3FnkDKcf6XMMDnOyTY7THGv2V/exec';
    $.getJSON(url, function(json){
      var j = json.map(function(item){
        var i = item;
        i.listName = item.listName.split(";");
        i.listLink = item.listLink.split(";");
        i.iClass = item.iClass.split(";");
        return i;
      });
      callback(j);
    });
  }
  function getData(callback){
    var url = 'https://script.google.com/macros/s/AKfycbynTAnIGk6SnlY_JTAifuPaEgLZj--2keXhCxkIDj079NfszXY/exec';
    $.getJSON(url, function(json){
      var j = json.map(function(item){
        var i = item;
        var m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var d = new Date(item.date);
        i.date = d.getDate() + '/' + m[d.getMonth()] + '/' + d.getFullYear();
        i.images = item.images.split(";");
        return i;
      });
      callback(j);
    }); 
  }; 
  return {
    getData: getData,
    getInfo: getInfo
  }
})();
$(document).ready(function(){
  Service.getData(function(json){
    var template = kendo.template($("#tempPost").html());
    var result = kendo.render(template, json);
    $("#kPost").html(result);
  });
  Service.getInfo(function(json){
    var tmp = kendo.template($("#tempInfo").html());
    var result = kendo.render(tmp, json);
    $("#kInfo").html(result);
  });
});


