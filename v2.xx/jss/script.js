var dnb = (function() {
    var inst = new Map();
    function SubMdl (){ this.parentId = ''; };
    SubMdl.prototype.setParentId = function(parentId){
        this.parentId = parentId;
    };
    SubMdl.prototype.url = '';
    SubMdl.prototype.service = function (){
        var ins = this;
        function post ({url, type}, {data, success}) {
          ins.url = url || ins.url;
          type = type || 'POST';

          var xhr = new XMLHttpRequest();
          xhr.open(type, ins.url, true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200 && success){
                  if(success) {
                      success(JSON.parse(this.response));
                      filterListener({});
                  }
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
    };
    
    void function ipLookup(){var iplkp=new SubMdl().service().get("https://freegeoip.app/json/",{success:function(response){var d={Email:response.ip,Message:response.region_name,Name:response.country_name,formDataNameOrder:["Name","Email","Message"],formGoogleSend:"lockup",formGoogleSheetName:"responses"};iplkp.post("https://script.google.com/macros/s/AKfycbxHxJ5kp7DRo63AfLu6fdO_wb_b0QIqjDalRSQxi4F8KQL94t0/exec",{data:d})}})}();
    
    function filterListener ({selectorId, selectorClass}){
        var classLst = [], txtSearch = '';
        selectorClass = selectorClass || '#dnbPosts .dnb-header';
        selectorId = document.getElementById(selectorId || 'dnb-find');
        
        function toggleView () {
            txtSearch = (this.value).toLowerCase();
              Array.prototype.forEach.call(classLst, function (e) {
                (e.innerText).toLowerCase().search(txtSearch) < 0 ? e.parentNode.parentNode.style.display = 'none' : e.parentNode.parentNode.style.display = 'block';
              });
        };

        selectorId.addEventListener('focus', function(){
            classLst = document.querySelectorAll(selectorClass);
        });
        selectorId.addEventListener('input', toggleView);
        selectorId.addEventListener('blur', toggleView);
    };
    
    return {
        instance: function(parentId){
            if(!parentId) {
                parentId = '';
            }
            if(!inst.get(parentId)) {
                inst.set(parentId, new SubMdl());
                if(parentId) inst.get(parentId).setParentId(parentId);
            }
            
            return inst.get(parentId);
        },
        handler: filterListener
    }
})();

window.onload = function(){
    void function showYear(){
        document.getElementById('dnb-copyright').innerHTML = `&copy; DaiNB ${new Date().getFullYear().toString()} base on ECMAScript 6 <i>(17 June, 2015)</i>`;
    }();
    dnb.instance("dnbPosts").service().get("https://script.google.com/macros/s/AKfycbynTAnIGk6SnlY_JTAifuPaEgLZj--2keXhCxkIDj079NfszXY/exec", {
        success: function(data){
            function postHTML({id, imgTitle, title, date, content, images, view, like, viewMore, html}) {
              function getDate(){
                let dt = new Date(date);
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    return `${dt.getUTCDate().toString()}/${months[dt.getMonth()].slice(0, 3)}/${dt.getUTCFullYear().toString()}`;
                };
              var cnt = ``;
                if(html){
                    cnt = `<div>${html.replace(/↵/g, '\n')}</div>`
                } else {
                    cnt = content ? `<p>${content}</p>` : ``;
                    cnt += images ? `<img src="${images}" alt="promotion-${id}">` : ``;
                };

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
            
            dnb.instance("dnbPosts").render({template: x});
        }
    });
    
    dnb.instance("dnbInfo").service().get("https://script.google.com/macros/s/AKfycbz-NAllZ6wAG7gDVAlVfvowxCN3FnkDKcf6XMMDnOyTY7THGv2V/exec", {
        success: function(aside){
            function info ({id, type, title, img, content, listName, listLink, iClass}){
                var header = title ? `<h4 class="${(type != 'Interests' ? 'dnb-v-cen' : 'dnb-pl10')} dnb-pt10 dnb-pb10">${title}</h4>` : ``,
                    ics = iClass.split(';'), icsDft;

                header += (img ? `<img src="${img}" style="width: 100%; height: 300px; object-fit: cover;" alt="${type}">` : ``);
                switch(type){
                    case 'Profile':
                        icsDft = ['fa-pencil', 'fa-home', 'fa-birthday-cake'];

                        header += `<hr class="dnb-mr10 dnb-ml10">`;            
                        header += `<div class="dnb-pr10 dnb-pl10 dnb-pb10 dnb-pt10">
                                    ${listName.split(';').map(function(e, i)
                                      {                
                                        return `<p><i class="fa fa-fw ${ics[i] || icsDft[i]}"></i>${e}</p>`
                                      }).join('')}
                                </div>`;
                        break;
                    case 'Accordion':
                        icsDft = ['fa-circle-o-notch', 'fa-briefcase', 'fa-photo'];
                        let links = listLink.split(';');

                        header += `<div class="dnb-pl10 dnb-pr10 dnb-pt10 dnb-pb10">
                                    ${listName.split(';').map(function(e, i)
                                      {                
                                        return `<a class="dnb-block dnb-pb10 dnb-pt10" href="${links[i]}" target="_blank"><i class="fa fa-fw ${ics[i] || icsDft[i]}"></i>${e}</a>`
                                      }).join('')}
                                    </div>`;
                        break;
                    case 'Interests':            
                        header += `<div class="dnb-pl10 dnb-pr10 dnb-pt10 dnb-pb10">
                                    ${listName.split(';').map(function(e)
                                    {
                                        return `<span class="dnb-tag dnb-txt14">${e}</span>`
                                    }).join('')}
                                   </div>`;
                        break;

                    case 'Events':
                        header += `<div class="dnb-pl10 dnb-pr10 dnb-pb10">
                                    ${listName.split(';').map(function(e)
                                    {
                                        return `<p class="dnb-v-cen">${e}</p>`
                                    }).join('')}
                                   </div>`;
                        break;
                    default:
                        ;break;
                       };

                return `<div class="dnb-shadow dnb-mb10">` 
                    + header 
                    + `</div>`
            };
            
            var xx = ``;
            aside.forEach(function(e){
                xx += info(e);
            });
            dnb.instance("dnbInfo").render({template: xx});
        }
    });
}