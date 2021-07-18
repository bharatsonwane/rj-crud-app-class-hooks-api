// Initial load of gravitoData from localStorage
// document.body.innerHTML=document.body.innerHTML + '<div id="fb-root"></div>' + 
  // '<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=2096027424033508&autoLogAppEvents=1"></script>'

var gravitoData = JSON.parse(localStorage.getItem("gravitoData"));
if(gravitoData == null) { 
	
	gravitoData = new Object(); 
	gravitoData.masterConsent = false;
	gravitoData.consents = new Object;
}

// Bind right click to pop-up consent menu
document.addEventListener('contextmenu', function(ev) {
  // var fbSdk= document.createElement("script",);
  // var att= document.createAttribute("src");
  // att.value="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=2096027424033508&autoLogAppEvents=1"
  // fbSdk.setAttributeNode(att)
  
  // document.body.appendChild(fbSdk)
  // document.body.appendChild(<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=2096027424033508&autoLogAppEvents=1"></script>)
  
  ev.preventDefault();
	elem.style.display = "block";
    return false;
}, false);

// Define dictionary for translations
var dict = {
  "Data preferences": {
    fi: "Datan käytön asetukset",
    sv: "Data inställnigarn"
  },
  "Info": {
    fi: "Tietoa",
    sv: "Informationen"
  },
  "Consents": {
    fi: "Luvat",
    sv: "Loven"
  },
  "Comms": {
    fi: "Viestintä",
    sv: "Komms"
  },
  "Profile": {
    fi: "Profiili",
    sv: "Profilen"
  },
  "Help": {
    fi: "Apua",
    sv: "Hjälp"
  },
  "Your choice": {
    fi: "Sinä päätät",
    sv: "Din val"
  },
  "Seems that we don't know how to treat your data so we ask. We are using revolutionary technology to request and store your preferences aiming to not ask you the same again and again.": {
    fi: "Näyttäisi siltä että emme tiedä miten käsitellä dataasi joten kysymme sinulta. Käytämme uutta teknologiaa, jolla käsittelemme haluamiasi asetuksia ja pyrimme siihen että näitä kysymyksiä ei tarvitsisi kysyä jatkuvast",
    sv: "Samma på svenska"
  },
  "You can choose the settings to be specific to this site/app or you can choose that your settings are valid for other sites that use same technology as well. Whatever you choose, you can change your mind anytime.": {
    fi: "Voit päättää että asetuksesi ovat voimassa vain tälle sivustolle tai sovellukselle tai voit päättää että asetuksesi ovat voimassa myös muissa palveluissa jotka käyttävät samaa teknologiaa. Päätitpä niin tai näin, voit muuttaa mieltäsi milloin haluat.",
    sv: "Samma på svenska 2"
  },
  "I grant Gravito (the system making this possible) to handle my data": {
    fi: "Suostun että Gravito (järjestelmä joka mahdollistaa tämän) käsittelee lupia ja dataani",
    sv: "Samma på svenska 3"
  },
  "My settings can be used on other sites/apps as default": {
    fi: "Asetuksiani voi käyttää myös muissa palveluissa oletusasetuksina",
    sv: "Samma på svenska 4"
  },
  "Ok, understood": {
    fi: "Ok, selvä",
    sv: "Okej, klar"
  },
  "Please indicate how your data should be handled. All analysis, personalization and sharing is done securely and without identifiers that reveal your identity.": {
    fi: "Valitse miten haluat sinusta kertyviä tietoja käytettävän asiakaskokemukseksi parhaaksi. Kaikki analysointi, personointi ja datan jako tapahtuu turvallisesti ja ilman tunnisteita, joilla sinut voitaisiin tunnistaa.",
    sv: "Samma på svenska 5"
  },
  "Website can collect data about visit": {
    fi: "Sivusto tai sovellus saa kerätä käytöstäni tietoja",
    sv: "Samma p�å svenska 6"
  },
  "Collected data can be analyzed": {
    fi: "Kerättyä tietoa saa analysoida",
    sv: "Samma på svenska"
  },
  "Content you see can be personalized": {
    fi: "Sisältöä voidaan personoida",
    sv: "Samma på svenska"
  },
  "Your experience between devices is personalized": {
    fi: "Asiakaskokemuksesi voidaan personoida eri laitteissa",
    sv: "Samma på svenska"
  },
  "Site/app can share data with other sites/apps": {
    fi: "Tietoja voidaan jakaa muiden sivustojen tai sovellusten kanssa",
    sv: "Samma på svenska"
  },
  "Your personalized experience is linked with your real identity (if known)": {
    fi: "Asiakaskokemuksesi optimointi voidaan yhdistää henkilötietoihisi (jos tiedossa)",
    sv: "Samma på svenska"
  },
  "Ok, all set": {
    fi: "Ok, selv�",
    sv: "Ok, klar"
  },
  "Please indicate how you can be contacted. The privacy technology used for communication protects your privacy and personal identifiers and site/app communicates only using specific id associated with you.": {
    fi: "Valitse kuinka haluat että sinua palvellaan ja asiakaskokemustasi optimoidaan eri välineillä. Viestintää käytetään teknologiaa joka suojaa henkilösyytesi ja sivusto tai sovellus kommunikoi kanssasi ilman että he käsittelevät henkilötietojasi.",
    sv: "Samma på svenska"
  },
  "Allow personalized content on site/app": {
    fi: "Salli personoitu sisältö sivustolla tai sovelluksessa",
    sv: "Samma på svenska"
  },
  "Allow personalized content on other devices": {
    fi: "Salli personalisoitu sisältö muissa laitteissa",
    sv: "Samma på svenska"
  },
  "Allow site/app to send you email": {
    fi: "Salli sivuston tai sovelluksen lähettää sinulle emailia",
    sv: "Samma på svenska"
  },
  "Allow site/app to send you SMS": {
    fi: "Salli sivuston tai sovelluksen lähettää SMS viestejä",
    sv: "Samma på svenska"
  },
  "Allow site/app's callcenter to call you": {
    fi: "Salli sivuston tai sovelluksen soittaa sinulle",
    sv: "Samma på svenska"
  },
  "Allow site/app to send you traditional mail or leaflets": {
    fi: "Salli sivuston tai sovelluksen lähettää sinulle suorapostituksia",
    sv: "Samma på svenska"
  },
  "Ok, dismiss": {
    fi: "Ok, sulje",
    sv: "Ok, klar"
  }
}

// Define CSS
var css =  '.modal { display: none; position: fixed; z-index: 99999999999999999999; padding-top: 2%; left: 0; top: 0; width: 100%; max-width:100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4); line-height:1; color: black; }';
    css += '.modal-content { background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width:800px; }';
    css += '.closeModal { color: white; float: right; font-size: 28px; font-weight: bold; }';
    css += '.closeModal:hover,.closeModal:focus { color: black; text-decoration: none; cursor: pointer; }';
    css += '.modal-header { font-weight: bold; padding: 15px; background-color: orange; color: white; font-family: sans-serif; display: block; }'; 
    css += '.modal-body {padding: 2px 0px; font-family: sans-serif; }';
    css += '.modal-footer { padding: 5px 5px; background-color: orange; color: white; font-family: sans-serif; text-align:left; display:block; }';
    css += '.modal-content { position: relative; background-color: #fefefe; margin: auto; padding: 0; border: 1px solid #888; width: 80%; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19); animation-name: animatetop; animation-duration: 0.4s }';
    css += '@keyframes animatetop { from {top: -300px; opacity: 0} to {top: 0; opacity: 1} }';
    css += '.switch { position: relative; display: inline-block; width: 60px; height: 34px; }';
    css += '.switch input { opacity: 0; width: 0; height: 0; }';
    css += '.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; }';
    css += '.slider:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; -webkit-transition: .4s; transition: .4s; }';
    css += 'input:checked + .slider { background-color: #2196F3; }';
    css += 'input:focus + .slider { box-shadow: 0 0 1px #2196F3; }';
    css += 'input:checked + .slider:before { -webkit-transform: translateX(26px); -ms-transform: translateX(26px); transform: translateX(26px); }';
    css += '.slider.round { border-radius: 34px; }';
    css += '.slider.round:before { border-radius: 50%; }';
    css += 'input:disabled + .slider { background-color: orange; }';
    css += '.tab { overflow: hidden; background-color: #f1f1f1; width:100%; margin-top:0px !important; }';
    css += '.tab button { background-color: inherit; float: left; border: 1px solid #aaa; border-right-style: none; border-top-style:none; border-bottom-style:none; cursor: pointer; padding: 7px 7px; transition: 0.3s; }';
    css += '.tab button:hover { background-color: #ddd; }';
    css += '.tab button.active { background-color: #ccc; }';
    css += '.tabcontent { display: none; padding: 22px 12px; border: 0px solid #ccc; border-top: none; }';
    css += '.tabcontent { animation: fadeEffect 1s; }';
    css += '.tabcontent button { background-color: #ccc; border: initial; outline: initial; padding: 15px; }';
    css += '.consentrow { overflow:hidden; padding:10px; margin-bottom:5px; }';
    css += '.consentitem { float:left;width:75%; margin-bottom:10px; border-bottom: 0px dotted #ccc; font-weight: bold; }';
    css += '@keyframes fadeEffect { from {opacity: 0;} to {opacity: 1;}}';
    css += '.modal-body h1,h2,h3 { font-weight: bold; margin: initial; }';
    css += '.modal-body p { margin-top: 1em; }';
    css += '.modal-footer a { text-decoration: none; color: white; font-size:0.9em; }';
    css += '.email-div { display:flex;flex-direction:row}';
    css += '.fb-button { margin-top:10px }'

// Define HTML content
var html =  '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<span class="closeModal">&times;</span>';
    html += '<h2 style="font-size:1.3em" class="trn">Data preferences</h2>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<div class="tab">';
    html += '<button class="tablinks trn" onclick="openTab(event, \'consent1\')" id="info">Info</button>';
    html += '<button class="tablinks trn" onclick="openTab(event, \'consent2\')" id="consents">Consents</button>';
    html += '<button class="tablinks trn" onclick="openTab(event, \'consent3\')" id="comms">Comms</button>';
    html += '<button class="tablinks trn" onclick="openTab(event, \'consent4\')" id="help">Profile</button>';
    html += '<button class="tablinks trn" onclick="openTab(event, \'consent5\')" id="help">Help</button>';
    html += '</div>';
    html += '<div id="consent1" class="tabcontent">';
    html += '<h3 class="trn">Your choice</h3>';
    html += '<p class="trn">Seems that we don\'t know how to treat your data so we ask. We are using revolutionary technology to request and store your preferences aiming to not ask you the same again and again.</p>'; 
    html += '<p class="trn">You can choose the settings to be specific to this site/app or you can choose that your settings are valid for other sites that use same technology as well. Whatever you choose, you can change your mind anytime.</p>'; 
    html += '<div class="consentrow" style="padding:40px 10px 10px 10px;">';
    html += '<div class="consentitem trn">I grant Gravito (the system making this possible) to handle my data</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked disabled>';
    html += '<span class="slider round disabled"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">My settings can be used on other sites/apps as default</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked id="crossDomainConsent" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<button onclick="document.getElementById(\'consents\').click(); setConsent(\'masterConsent\',true);" class="trn">Ok, understood</button>';
    html += '</div>';
    html += '<div id="consent2" class="tabcontent">';
    html += '<p class="trn">Please indicate how your data should be handled. All analysis, personalization and sharing is done securely and without identifiers that reveal your identity.</p><br>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Website can collect data about visit</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked id="dataCollectionConsent" data-consent="1" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Collected data can be analyzed</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked id="dataAnalyticsConsent" data-consent="1" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Content you see can be personalized</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked id="dataPersonalizationConsent" data-consent="1" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Your experience between devices is personalized</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked id="dataCrossDeviceConsent" data-consent="1" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Site/app can share data with other sites/apps</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked id="dataSharingConsent" data-consent="1" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Your personalized experience is linked with your real identity (if known)</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked>';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<button onclick="document.getElementById(\'comms\').click(); setConsent(\'consentMatrix\',true);" class="trn">Ok, all set</button>';
    html += '</div>';
    html += '<div id="consent3" class="tabcontent">';
    html += '<p class="trn">Please indicate how you can be contacted. The privacy technology used for communication protects your privacy and personal identifiers and site/app communicates only using specific id associated with you.</p><br>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Allow personalized content on site/app</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked  id="commsTargetingConsent" data-comms="1" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Allow personalized content on other devices</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked  id="commsPushConsent" data-comms="1" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Allow site/app to send you email</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked  id="commsEmailConsent" data-comms="1" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Allow site/app to send you SMS</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked  id="commsSMSConsent" data-comms="1" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Allow site/app\'s callcenter to call you</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked id="commsCallcenterConsent" data-consent="1" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<div class="consentrow">';
    html += '<div class="consentitem trn">Allow site/app to send you traditional mail or leaflets</div><div style="float:right;">';
    html += '<label class="switch">';
    html += '<input type="checkbox" checked  id="commsDirectMailConsent" data-consent="1" onchange="toggleConsent(this.id)">';
    html += '<span class="slider round"></span>';
    html += '</label></div>';
    html += '</div>';
    html += '<button onclick="document.getElementById(\'grvModal\').style.display=\'none\';  setConsent(\'commsMatrix\',true);" class="trn">Ok, dismiss</button>';
    html += '</div>';
    html += '<div id="consent4" class="tabcontent">';
    html += '<h3 class="trn">Profile</h3>';
    html += '<p class="trn">To save your settings for future use and across device you can register or log in to Gravito consent management. Simply enter your email and we\'ll send you email to log in.</p>'; 
    html += '<br><div class="email-div"><input id="email" style="padding:5px" type="text" placeholder="your email" class="trn">'; 
    html += '<button style="padding:5px" type="button" onclick="sendMagicLink()">Get Email</button></div>'
    // html += '<div  class="center-div"><p class="trn"> or</p></div>'
    html += '<div class="fb-button"><fb:login-button scope="public_profile,email" onlogin="checkLoginState();">login with facebook</fb:login-button></div>'
    html += '</div>';
    html += '<div id="consent5" class="tabcontent">';
    html += '<h3 class="trn">Consent 5</h3>';
    html += '<p class="trn">Lorem ipsum.</p>'; 
    html += '</div>';
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '<a href="https://www.gravito.net/">Powered by Gravito CXP</a>';
    html += '</div>';
    html += '</div>';
    html += '<div style="height:150px;"></div>';
    html += '<div id="status" ></div>'


var js  = 'function openTab(evt, tabName) {';
    js += 'var i, tabcontent, tablinks;';
    js += 'tabcontent = document.getElementsByClassName("tabcontent");';
    js += 'for (i = 0; i < tabcontent.length; i++) {';
    js += 'tabcontent[i].style.display = "none";';
    js += '}';
    js += 'tablinks = document.getElementsByClassName("tablinks");';
    js += 'for (i = 0; i < tablinks.length; i++) {';
    js += 'tablinks[i].className = tablinks[i].className.replace(" active", "");';
    js += '}';
    js += 'document.getElementById(tabName).style.display = "block";';
    js += 'evt.currentTarget.className += " active";';
    js += 'document.getElementById("grvModal").scrollTo(0,0);';
    js += '}';

// Inject CSS
var modalStyle = document.createElement('style');
modalStyle.innerHTML = css;
document.body.appendChild(modalStyle);

// Inject JS
var modalJs = document.createElement('script');
modalJs.innerHTML = js;
document.body.appendChild(modalJs);

// Create div with "modal" class and append to site
var elem = document.createElement('div');
elem.setAttribute('id','grvModal');
elem.classList.add('modal');
elem.innerHTML = html;
document.body.appendChild(elem);

// Add closing button
var closingButton = document.getElementsByClassName("closeModal")[0];
closingButton.onclick = function() { elem.style.display = "none"; }

// Translate if locale is different than en and language is found from dictionary
var browserLanguage = navigator.language.substring(0,2);
if(browserLanguage != "en" && (browserLanguage=="fi" || browserLanguage=="sw")) {

	grvTranslate(browserLanguage);

}

if(gravitoData.masterConsent == false) {

	// Display modal for testing purposes
	elem.style.display = "block";

}

// Display tab based on earlier settings
document.getElementById("info").click();

function grvTranslate(language) {

	var translationElements = document.getElementsByClassName("trn");
	for(i=0;i<translationElements.length;i++) {

		var term = translationElements[i].textContent; 

		if(term in dict) {
		var translation = dict[term][language];
		translationElements[i].textContent = translation;
		}
	}

}

function loadGravitoData() {

	gravitoData = JSON.parse(localStorage.getItem("gravitoData"));

}

function saveGravitoData() {

	localStorage.setItem("gravitoData", JSON.stringify(gravitoData));

}

function setConsent(consentName, value) {

	if(consentName=="masterConsent") { toggleConsent('crossDomainConsent'); }
	if(consentName=="consentMatrix") { 

		var consentElements = document.querySelectorAll('[data-consent]');

		for(i=0;i<consentElements.length;i++) {
		
			toggleConsent(consentElements[i].id); 

		}

	}

	if(consentName=="commsMatrix") { 

		var consentElements = document.querySelectorAll('[data-comms]');

		for(i=0;i<consentElements.length;i++) {
		
			toggleConsent(consentElements[i].id); 

		}

	}

	gravitoData[consentName] = value;
	saveGravitoData();

}

function toggleConsent(elementId) {

	var value = document.getElementById(elementId).checked;
	gravitoData.consents[elementId] = value;
	saveGravitoData();

}

function checkValidEmail(email){
return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}


function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
  console.log('statusChangeCallback');
  console.log(response);                   // The current login status of the person.
  if (response.status === 'connected') {   // Logged into your webpage and Facebook.
    testAPI(); 
    var model={
      accessToken:response.authResponse.accessToken,
      provider: "facebook"

    } 
    socialLogin(model)
  } else {  
    console.log("please log")                               // Not logged into your webpage or we are unable to tell.
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into this webpage.';
  }
}


function checkLoginState() {               // Called when a person is finished with the Login Button.
  FB.getLoginStatus(function(response) {   // See the onlogin handler
    statusChangeCallback(response);
  });
}


window.fbAsyncInit = function() {
  FB.init({
    appId      : '2096027424033508',
    cookie     : true,                     // Enable cookies to allow the server to access the session.
    xfbml      : true,                     // Parse social plugins on this webpage.
    version    : 'v5.0'           // Use this Graph API version for this call.
  });


  FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
    statusChangeCallback(response);        // Returns the login status.
  });
};


(function(d, s, id) {                      // Load the SDK asynchronously
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

function socialLogin(model){
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    Console.log("result from social login ",this.response)
    
  }
};
xhttp.open("POST", "https://dev-api.gravito.net/api/account/sociallogin", true);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8",);
// xhttp.setRequestHeader("access-control-allow-credentials","true")
// xhttp.setRequestHeader("Access-Control-Request-Headers:","content-type")
xhttp.send(JSON.stringify(model));

}

function sendMagicLink(){
  
  var obj={
    email:document.getElementById("email").value
  }
  if(checkValidEmail(document.getElementById("email").value)){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        window.alert("please check your email")
        document.getElementById("email").value="";
        
      }
    };
    xhttp.open("POST", "https://dev-api.gravito.net/api/account/magiclink", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8",);
    // xhttp.setRequestHeader("access-control-allow-credentials","true")
    // xhttp.setRequestHeader("Access-Control-Request-Headers:","content-type")
    xhttp.send(JSON.stringify(obj));
  }else{
    document.getElementById("email").value="Please enter valid email"
    
    document.getElementById("email").style.color="red"
  }
  
}

class myelement extends customElements{
  
}