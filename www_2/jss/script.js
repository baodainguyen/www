var aside = [
    {
        id: 0,
        type: "Profile",
        title: "DaiNB",
        img: "https://live.staticflickr.com/65535/48574838266_815be182a9_b.jpg",
        content: "",
        listName: "Dev & Designer;Haiduong - VN;1st week of June",
        listLink: "",
        iClass: "fa-pencil;fa-home;fa-birthday-cake"
    },
    {
        id: 1,
        type: "Accordion",
        title: "",
        img: "",
        content: "",
        listName: "Groups;My CV;My Photo",
        listLink: "#;#;#",
        iClass: "fa-circle-o-notch;fa-briefcase;fa-photo"
    },
    {
        id: 2,
        type: "Interests",
        title: "Interests",
        img: "",
        content: "",
        listName: "News;W3School;Design;Photos;Digital painting;Football;Games;Architechture Design;Art;Food;Travel",
        listLink: "",
        iClass: ""
    },
    {
        id: 3,
        type: "Events",
        title: "Passed Events",
        img: "https://image.theleader.vn/thumbs/788x0/upload/ngocson/2017/11/30/Cat%20Ba.jpg",
        content: "",
        listName: "Vacation;Aug 08 - 11 / 2019 ;We have a long time to rest with my colleague in Cat Ba",
        listLink: "",
        iClass: ""
    }
];
function info ({id, type, title, img, content, listName, listLink, iClass}){
    var header = title ? `<h4 class="dnb-v-cen dnb-pt10 dnb-pb10">${title}</h4>` : (img ? `<img src="${img}" style="width: 100%; height: 300px; object-fit: cover;" alt="${type}">` : ``);
    switch(type){
        case 'Profile':
            header += `<hr class="dnb-mr10 dnb-ml10">`;
            break;
            
           };
    
    
    return `<div class="dnb-shadow dnb-mb10">` 
        + header 
        + `<div class="dnb-pr10 dnb-pl10 dnb-pb10">
          <p><i class="fa fa-fw w3-margin-right w3-text-theme fa-pencil"></i>Dev - Design</p>
          <p><i class="fa fa-fw w3-margin-right w3-text-theme fa-home"></i>Haiduong - VN</p>
          <p><i class="fa fa-fw w3-margin-right w3-text-theme fa-birthday-cake"></i>1st week of June</p>
        </div>
      </div>`
}
var dnb = (function() {
    function SubMdl (parentId){ 
        this.parentId = parentId;
    };
    SubMdl.prototype.setParentId = function(parentId){
        this.parentId = parentId;
    };
    SubMdl.prototype.service = function (){
        var ins = this;
        function post ({url, type}, {data, success}) {
          url = url || "https://script.google.com/macros/s/AKfycbxHxJ5kp7DRo63AfLu6fdO_wb_b0QIqjDalRSQxi4F8KQL94t0/exec";
          type = type || 'POST';

          var xhr = new XMLHttpRequest();
          xhr.open(type, url, true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200 && success){
                  if(success) success(JSON.parse(this.response));
              }
          };
            if(data) {
              var encoded = Object.keys(data).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
              }).join('&');
              xhr.send(encoded);
            } else {
                xhr.send();
            }
        };
        
        ins.get = function(url, {success}){ 
            post ({url: url, type: 'GET'}, {success: success}); 
            return ins;
        };
        
        ins.post = function(url, {data, success}){ 
            post ({url: url}, {data: data, success: success}); 
            return ins;
        };
        
        return ins;
    };
    SubMdl.prototype.render = function({parentId, template}){
        var ins = this;
            if(parentId) {
                document.getElementById(parentId).innerHTML = template;
            } else {
                document.getElementById(ins.parentId).innerHTML = template;
            }
        return ins;
    }
    
    void function ipLookup(){
        var iplkp = new SubMdl().service().get("https://freegeoip.app/json/", {
            success: function(response){
              var d = {
                  Email: response.ip,
                  Message: response.region_name,
                  Name: response.country_name,
                  formDataNameOrder: ["Name","Email","Message"],
                  formGoogleSend: "lockup",
                  formGoogleSheetName: "responses"
                };
              iplkp.post("", {data: d});
          }
        });
    }();
    
    return {
        SubModule: SubMdl
    }
})();

window.onload = function(){
    var main = new dnb.SubModule("dnbPosts").service().get("https://script.google.com/macros/s/AKfycbynTAnIGk6SnlY_JTAifuPaEgLZj--2keXhCxkIDj079NfszXY/exec", {
        success: function(data){
            function postHTML({id, imgTitle, title, date, content, images, view, like, viewMore, html}) {
              function getDate(){
                let dt = new Date(date);
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    return `${dt.getUTCDate().toString()}/${months[dt.getMonth()].slice(0, 3)}/${dt.getUTCFullYear().toString()}`;
                }
              var cnt = ``;
                if(html){
                    cnt = `<div>${html.replace(/↵/g, '\n')}</div>`
                } else {
                    cnt = content ? `<p>${content}</p>` : ``;
                    cnt += images ? `<img src="${images}" alt="promotion-${id}">` : ``;
                }

              return `<article class="dnb-post dnb-pt10 dnb-pshadow dnb-pb10 dnb-mb20">
                    <header class="dnb-pheader dnb-pl10 dnb-pr10 ">
                      <img class="dnb-w52 dnb-h52 dnb-round-avt dnb-mr10 dnb-fl" src="${imgTitle}" >
                      <h4 class="dnb-header dnb-ml10">${title}</h4>
                    </header>
                      <hr>
                    <section class="dnb-pbody">
                      <div class="dnb-pcontent">
                        ${cnt}
                      </div>
                      <footer class="dnb-pt10 dnb-pl10 dnb-pr10 dnb-mt10">
                        <span class="dnb-pr10"><i class="fa fa-eye"></i>${view}</span>
                        <span class="dnb-pr10 dnb-pl10"><i class="fa fa-thumbs-up"></i>${like}</span>
                        <span class="dnb-pl10"><i class="fa fa-calendar-check-o"></i>${getDate(date)}</span>
                        <a class="dnb-fr dnb-pr10" href="${viewMore}" target="_blank">View more<span class="fa fa-angle-double-right dnb-pl10"></span></a>
                      </footer>
                    </section>
                  </article>`
            };

            var x = ``;
            data.forEach(function(e){ x += postHTML(e); });
            
            main.render({template: x});
        }
    });
}