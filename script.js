window.onscroll = function() {
  var navbar = document.getElementById("navbar-desktop");
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        navbar.className = "w3-bar" + " w3-card" + " w3-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-top w3-white", " w3-text-white");
    }
};
function sendMail(emailAddress, mailContent){
  var mailTo = emailAddress.mailto || 'mailto:dai.daiquang@gmail.com';
  var ccTo = emailAddress.ccto ? '?cc=' + emailAddress.ccto : '';
  var esubject = '&subject=' + escape(mailContent.subject || 'customer from DaiNB website');
  var information = 'Browser information:\n' + navigator.appVersion + '\n' + navigator.platform + '\n';
  var ebody = '&body=' + escape(mailContent.body ? mailContent.body + information  : information);
  window.location.href = mailTo + ccTo + esubject + ebody;
}
function ipLookUp () {
  //var ur='http://www.geoplugin.net/json.gp';
  //var ur1='http://ip-api.com/json';
  var url='https://freegeoip.app/json/';
    $.ajax(url).then(
        function success(response) {
            console.log('User\'s Location Data is ', response);
            console.log('User\'s Country', response.country_name);
        },
        function fail(data, status) {console.log(status);}
    );
  };
//https://www.npmjs.com/package/html-form-send-email-via-google-script-without-server
//https://media.nationalgeographic.org/assets/photos/101/449/4c526f70-30de-4bab-9079-31e3e15c2b14.jpg
//https://media.nationalgeographic.org/assets/photos/317/709/17e6df25-2047-4626-bf59-49395c7d1759.jpg
//https://media.nationalgeographic.org/assets/photos/495/949/254fa3e0-0dbb-42ea-bfb8-1968dfb217b5.jpg


//https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server
(function() {
  function validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up (Robot Detected!)
      return true;
    } // else welcome human
  }

  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0, len = element.length; i < len; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSend = form.dataset.email || ""; // no email by default

    return {data: formData, honeypot};
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }

    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        //console.log(xhr.status, xhr.statusText); console.log(xhr.responseText);
        form.reset();
        var formElements = form.querySelector("p")
        if (formElements) {
          formElements.style.display = "none"; // hide form
        }
        var thankYouMessage = form.querySelector(".thankyou_message");
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
        }
        return;
    };
    
    var data = formData.data;
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }
  
  function loaded() {
    //console.log("Contact form submission handler loaded successfully.");
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0, len = forms.length; i < len; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0,len = buttons.length; i < len; i++) {
      buttons[i].disabled = true;
    }
  }
})();