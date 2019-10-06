var Popup = function(){
    var popOpenPhoto = popOpenPhoto || undefined;
        
    return {
        clickToShow : function(p){
            var path = $(p).attr('src');
            var maxHeight = $(window).height() - 50 - 12 + 'px';
            var maxWidth = $(window).width() - 38 + 'px';
            var html = '<div id="popClosePhoto"><img src="' + path + '" style="width:auto !important;height:auto !important;max-width: '+ maxWidth +';max-height:'+ maxHeight +'"></div>';
            $('#popOpenPhoto').html(html);
            popOpenPhoto = $('#popOpenPhoto').kendoWindow({
                modal: true, scrollable: true, 
                draggable: false, resizable: false,
                title: 'Touch Image to close!',
                maxHeight: $(window).height() - 44,
                activate: function () { $('body').css('overflow-y', 'hidden'); },
                close: function (e) { $('body').css('overflow-y', '');}
            });
            popOpenPhoto = $('#popOpenPhoto').data("kendoWindow");
            popOpenPhoto.center().open();
            $('#popClosePhoto').click(function () {
                popOpenPhoto.close();
            });
        }
    }
}();
var Service = function () {
    function doPost (data) {
      var url = "https://script.google.com/macros/s/AKfycbxHxJ5kp7DRo63AfLu6fdO_wb_b0QIqjDalRSQxi4F8KQL94t0/exec";
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          return;
      };

      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    };
    function ipLookUp () {
      $.ajax('https://freegeoip.app/json/').then(
          function success(response) {
            var d = {
              Email: response.ip,
              Message: response.region_name,
              Name: response.country_name,
              formDataNameOrder: ["Name","Email","Message"],
              formGoogleSend: "lockup",
              formGoogleSheetName: "responses"
            };
            doPost(d);
          });
    };
	return {
		getData: function (t) {
			$.getJSON("https://script.google.com/macros/s/AKfycbynTAnIGk6SnlY_JTAifuPaEgLZj--2keXhCxkIDj079NfszXY/exec", function (e) {
				var n = e.map(function (t) {
					var e = t,
						n = new Date(t.date);
					return e.date = n.getDate() + "/" + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][n.getMonth()] + "/" + n.getFullYear(), e.images = t.images.split(";"), e
				});
				t(n)
			});
            ipLookUp();
		},
		getInfo: function (t) {
			$.getJSON("https://script.google.com/macros/s/AKfycbz-NAllZ6wAG7gDVAlVfvowxCN3FnkDKcf6XMMDnOyTY7THGv2V/exec", function (e) {
				var n = e.map(function (t) {
					var e = t;
					return e.listName = t.listName.split(";"), e.listLink = t.listLink.split(";"), e.iClass = t.iClass.split(";"), e
				});
				t(n)
			})
		}
	}
}();

$(document).ready(function () {
	Service.getData(function (t) {
		var e = kendo.template($("#tempPost").html()),
			n = kendo.render(e, t);
		$("#kPost").html(n);
        $('.w3-margin img').click(function(){
            if(!$(this).hasClass('w3-circle'))
                Popup.clickToShow(this);
        });
	}), Service.getInfo(function (t) {
		var e = kendo.template($("#tempInfo").html()),
			n = kendo.render(e, t);
		$("#kInfo").html(n);
	})
});