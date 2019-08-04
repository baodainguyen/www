var Test = (function(){
  return {
    posts: [
      {  imgTitle: 'https://www.w3schools.com/w3images/avatar1.png', title: 'DaiNB 1 working from Kloon as Developer and lead Designer', date: '1 min', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
         images: ['https://www.w3schools.com/w3images/lights.jpg', 'https://www.w3schools.com/w3images/nature.jpg'], view: '30k', like: '300', id: 1, viewMore: 'http://www.link.com'
      },
      {  imgTitle: 'https://www.w3schools.com/w3images/avatar2.png', title: 'DaiNB 3000', date: '1 min', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
         images: ['https://www.w3schools.com/w3images/nature.jpg'], view: '3', like: '0', id: 1, viewMore: ''
      },
      {
        imgTitle: 'https://www.w3schools.com/w3images/avatar5.png', title: 'DaiNB 2', date: '03/7/2019', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ',
        images: [""], view: '15k', like: '1', id: 2, viewMore: 'http://www.link3'
      }
    ],
    right: {
      
    }
  }
})();
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
        //i.date = new Date(item.date).toJSON().slice(0,10).split('-').reverse().join('/');
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
    
    var template = kendo.template($("#tempPost").html());        // defined
    var result = kendo.render(template, json);
    $("#kPost").html(result);
  });
  Service.getInfo(function(json){//kInfo
    console.log(json); 
    var tmp = kendo.template($("#tempInfo").html());        // defined
    var result = kendo.render(tmp, json);
    $("#kInfo").html(result);
  });
});