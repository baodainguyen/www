var data = [
    {
        id: 0,
        imgTitle: "https://www.w3schools.com/w3images/avatar5.png",
        title: "Pet project 1",
        date: "2020-01-05T17:00:00.000Z",
        content: "",
        images: "",
        view: 26,
        like: 7,
        viewMore: "https://baodainguyen.github.io/Gg-Coding-Int/",
        html: "<p>Here is small pet project.↵I am so excited to introduce you a piece of algorithm how to find available time from 2 people, they have meeting and working time. </p>↵<ol>↵<li><p>Person 1 has meeting time [['9:00', '10:30'], ['12:00', '13:00'], ['16:00', '18:00']] </p><p>and working time ['9:00', '20:00'].</p></li>↵<li><p>Person 2 has meeting time [['10:00', '11:30'], ['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']] </p><p>and working time ['10:00', '18:30']</p></li>↵</ol>↵<p>With time range is 30 minutes: Let find available time to setup metting time for them together (about 30 minutes from time range).↵</p>↵<p>More info please visit github page in View more.</p>"
    },
    {
        id: 1,
        imgTitle: "https://www.w3schools.com/w3images/avatar2.png",
        title: "Project Demo 3",
        date: "2019-11-05T17:00:00.000Z",
        content: "This is pet project - Demo 3, html page in view more button (include mobile frendly). Thank you for watching!",
        images: "https://live.staticflickr.com/65535/49022127126_1c21669229_b.jpg",
        view: 37,
        like: 7,
        viewMore: "https://baodainguyen.github.io/demo03/",
        html: "",
    },
    {
        id: 2,
        imgTitle: "https://www.w3schools.com/w3images/avatar5.png",
        title: "Project Demo 2",
        date: "2019-10-17T17:00:00.000Z",
        content: "This is pet project - Demo2, html page in view more button. Thank you for watching!",
        images: "https://live.staticflickr.com/65535/49339746757_1730d47f7d_k.jpg",
        view: 40,
        like: 8,
        viewMore: "https://baodainguyen.github.io/demo02/",
        html: ""
    }
],
 aside = [
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

function postHTML({id, imgTitle, title, date, content, images, view, like, viewMore, html}) {
    function getDate(){
        let dt = new Date(date);
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${dt.getUTCDate().toString()}/${months[dt.getMonth()].slice(0, 3)}/${dt.getUTCFullYear().toString()}`;
    }
    var cnt = content? `<p>${content}</p><img src="${images}" alt="promotion-${id}">` : `<div>${html.replace(/↵/g, '\n')}</div>`;
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
//data.forEach(function(e){
//    x += postHTML(e);
//});

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
        }
          xhr.send();
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
        new SubMdl().service().get("https://freegeoip.app/json/", {
        success: function(response){
          var d = {
              Email: response.ip,
              Message: response.region_name,
              Name: response.country_name,
              formDataNameOrder: ["Name","Email","Message"],
              formGoogleSend: "lockup",
              formGoogleSheetName: "responses"
            };
          new SubMdl().service().post("https://script.google.com/macros/s/AKfycbxHxJ5kp7DRo63AfLu6fdO_wb_b0QIqjDalRSQxi4F8KQL94t0/exec",
                                            {data: d});
      }});
    }
    
    return {
        SubModule: SubMdl
    }
})();

window.onload = function(){
    var main = new dnb.SubModule("dnbPosts").service().get("https://script.google.com/macros/s/AKfycbynTAnIGk6SnlY_JTAifuPaEgLZj--2keXhCxkIDj079NfszXY/exec", {success: function(data){
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
        console.log(data);
        var x = ``;
        data.forEach(function(e){
            x += postHTML(e);
        });
        main.render({template: x});
    }})
}