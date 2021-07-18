
class FacebookButton extends HTMLElement {
    constructor() {
        super();
        (function (d, s, id) {                      // Load the SDK asynchronously
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        

    }
    connectedCallback() {
        this.gravitoEndPointUrl=this.getAttribute("gravitoEndPointUrl");
        this.redirectUrl= this.getAttribute("redirectUrl");
        this.buttonText= this.getAttribute("buttonText")?this.getAttribute("buttonText"):"continue with facebook";
        this.appId=this.getAttribute("appId");
        console.log(this.appId)
        window.fbAsyncInit = () => {
            FB.init({
                appId: '2096027424033508',
                cookie: true,                     // Enable cookies to allow the server to access the session.
                xfbml: true,                     // Parse social plugins on this webpage.
                version: 'v5.0'           // Use this Graph API version for this call.
            });
            FB.getLoginStatus((response) => {   // Called after the JS SDK has been initialized.
                this.statusChangeCallback(response);

                // Returns the login status.
            });
            


        };
       
        
        const shadowfb = this.attachShadow({mode:"open"});
        shadowfb.addEventListener("click",this.fbLogin)
        shadowfb.innerHTML=`
        <style>
        .loginBtn {
            box-sizing: border-box;
            position: relative;
            /* width: 13em;  - apply for fixed size */
            margin: 0.2em;
            padding: 0 15px 0 46px;
            border: none;
            text-align: left;
            line-height: 34px;
            white-space: nowrap;
            border-radius: 0.2em;
            font-size: 16px;
            color: #FFF;
          }
          .loginBtn:before {
            content: "";
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 0;
            width: 34px;
            height: 100%;
          }
          .loginBtn:focus {
            outline: none;
          }
          .loginBtn:active {
            box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
          }
          
          
          /* Facebook */
          .loginBtn--facebook {
            background-color: #4C69BA;
            background-image: linear-gradient(#4C69BA, #3B55A0);
            /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
            text-shadow: 0 -1px 0 #354C8C;
          }
          .loginBtn--facebook:before {
            border-right: #364e92 1px solid;
            background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
          }
          .loginBtn--facebook:hover,
          .loginBtn--facebook:focus {
            background-color: #5B7BD5;
            background-image: linear-gradient(#5B7BD5, #4864B1);
          }
        </style>
        <button class="loginBtn loginBtn--facebook">
            ${this.buttonText}
        </button>
        `



    }
    fbLogin=()=>{
        FB.login(function(response) {
            // handle the response
          }, {scope: 'public_profile,email'});
    }
    checkLoginState = () => {               // Called when a person is finished with the Login Button.
        FB.getLoginStatus(function (response) {   // See the onlogin handler
            this.statusChangeCallback(response);
        });
    }
    statusChangeCallback = (response) => {  // Called with the results from FB.getLoginStatus().
        console.log('statusChangeCallback');
        console.log(response);                   // The current login status of the person.
        if (response.status === 'connected') {   // Logged into your webpage and Facebook.
            this.testAPI();
            var model = {
                accessToken: response.authResponse.accessToken,
                provider: "facebook"

            }
              this.socialLogin(model)

        } else {
            console.log("please log")                               // Not logged into your webpage or we are unable to tell.
            
        }
    }
    checkLoginState = () => {               // Called when a person is finished with the Login Button.
        FB.getLoginStatus((response) => {   // See the onlogin handler
            this.statusChangeCallback(response);
        });
    }
    testAPI = () => {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name);
            //   document.getElementById('status').innerHTML =
            //     'Thanks for logging in, ' + response.name + '!';
        });
    }
    socialLogin=(model)=>{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=> {
          if (this.readyState == 4 && this.status == 200) {
            Console.log("result from social login ",this.response);
            window.location=this.redirectUrl
            
          }
        };
        xhttp.open("POST", this.gravitoEndPointUrl, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8",);
        xhttp.setRequestHeader("Fb-AppId",this.appId)
        // xhttp.setRequestHeader("access-control-allow-credentials","true")
        // xhttp.setRequestHeader("Access-Control-Request-Headers:","content-type")
        xhttp.send(JSON.stringify(model));
        
        }

}
customElements.define("gravito-fb-button", FacebookButton);

class GoogleButton extends HTMLElement {

      
    constructor(){
        super();
      
       var sr= document.createElement("script");
       sr.setAttribute('src',"https://apis.google.com/js/platform.js");
      
       sr.setAttribute("defer",true)

       document.body.append(sr);
       sr.addEventListener("load",this.renderButton)
       var meta=document.createElement("meta");
       meta.setAttribute("name","google-signin-client_id");
       meta.setAttribute("content","471539080874-1edm5i7rgkq1mj1nofqenab5b2kn5hd1.apps.googleusercontent.com");
       document.body.append(meta);
      
       
    }
    renderButton=()=>{
        
        gapi.load('auth2', ()=> {
            this.auth2 = gapi.auth2.init({
              client_id: this.appId,
              fetch_basic_profile: false,
              scope: 'profile'
            });
          
            
            
          });
      }
       LocalThis=this
    connectedCallback(){


        this.gravitoEndPointUrl=this.getAttribute("gravitoEndPointUrl");
        this.redirectUrl= this.getAttribute("redirectUrl");
        this.buttonText= this.getAttribute("buttonText")?this.getAttribute("buttonText"):"continue with facebook";
        this.appId=this.getAttribute("appId");

        const shadow=this.attachShadow({mode:"open"})
         
        
        this.addEventListener("click",this.LocalThis.onclickSign);
        
        shadow.innerHTML=
        `<style>
        .loginBtn {
            box-sizing: border-box;
            position: relative;
            /* width: 13em;  - apply for fixed size */
            margin: 0.2em;
            padding: 0 15px 0 46px;
            border: none;
            text-align: left;
            line-height: 34px;
            white-space: nowrap;
            border-radius: 0.2em;
            font-size: 16px;
            color: #FFF;
          }
          .loginBtn:before {
            content: "";
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 0;
            width: 34px;
            height: 100%;
          }
          .loginBtn:focus {
            outline: none;
          }
          .loginBtn:active {
            box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
          }
          .loginBtn--google {
            /*font-family: "Roboto", Roboto, arial, sans-serif;*/
            background: #DD4B39;
          }
          .loginBtn--google:before {
            border-right: #BB3F30 1px solid;
            background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
          }
          .loginBtn--google:hover,
          .loginBtn--google:focus {
            background: #E74B37;
          }
        </style>
        <button class="loginBtn loginBtn--google">
             ${this.buttonText}
        </button>
        
        `

    }
    onclickSign=()=>{
        this.auth2.signIn().then(()=> {
            // console.log(this.auth2.currentUser.get().getAuthResponse().access_token);
            var signInModel={
                accessToken:this.auth2.currentUser.get().getAuthResponse().access_token,
                provider: "google"
            }
            console.log("model",signInModel);
            this.socialLogin(signInModel)
          });
    }
    socialLogin=(model)=>{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=> {
          if (this.readyState == 4 && this.status == 200) {
            Console.log("result from social login ",this.response);
            window.location=this.redirectUrl
            
          }
        };
        xhttp.open("POST", this.gravitoEndPointUrl, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8",);
        xhttp.setRequestHeader("google-appid",this.appId)
        // xhttp.setRequestHeader("access-control-allow-credentials","true")
        // xhttp.setRequestHeader("Access-Control-Request-Headers:","content-type")
        xhttp.send(JSON.stringify(model));
        
        }

   
}
customElements.define("gravito-google-button", GoogleButton);

class GravitoButton extends HTMLElement {
    constructor(){
        super();
        
    }
    connectedCallback(){
        const shadow = this.attachShadow({mode:"open"});
        this.shadowr=shadow
        shadow.innerHTML=`
        <style>
        .loginBtn {
            box-sizing: border-box;
            position: relative;
            /* width: 13em;  - apply for fixed size */
            margin: 0.2em;
            padding: 0 15px 0 46px;
            border: none;
            text-align: left;
            line-height: 34px;
            white-space: nowrap;
            border-radius: 0.2em;
            font-size: 16px;
            color: #FFF;
          }
          .loginBtn:before {
            content: "";
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 0;
            width: 34px;
            height: 100%;
          }
          .loginBtn:focus {
            outline: none;
          }
          .loginBtn:active {
            box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
          }
          .loginBtn--google {
            /*font-family: "Roboto", Roboto, arial, sans-serif;*/
            background: orange;
          }
          .loginBtn--google:before {
            border-right: orange 1px solid;
            background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
          }
          .loginBtn--google:hover,
          .loginBtn--google:focus {
            background: orange;
          }
          .btn-close {
            color: #aaaaaa;
            font-size: 20px;
            text-decoration: none;
            padding:10px;
            position: absolute;
            right: 7px;
            top: 0;
          }
          .btn-close:hover {
            color: #919191;
          }
          .modale:before {
            content: "";
            display: none;
            background: rgba(0, 0, 0, 0.6);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
          }
          .opened:before {
            display: block;
          }
          .opened .modal-dialog {
            -webkit-transform: translate(0, 0);
            -ms-transform: translate(0, 0);
            transform: translate(0, 0);
            top: 20%;
          }
          .modal-dialog {
            background: #fefefe;
            border: #333333 solid 0px;
            border-radius: 5px;
            margin-left: -200px;
            text-align:center;
            position: fixed;
            left: 50%;
            top: -100%;
            z-index: 11;
            width: 360px;
            box-shadow:0 5px 10px rgba(0,0,0,0.3);
            -webkit-transform: translate(0, -500%);
            -ms-transform: translate(0, -500%);
            transform: translate(0, -500%);
            -webkit-transition: -webkit-transform 0.3s ease-out;
            -moz-transition: -moz-transform 0.3s ease-out;
            -o-transition: -o-transform 0.3s ease-out;
            transition: transform 0.3s ease-out;
          }
          .modal-body {
            padding: 20px;
          }
          .modal-body input{
            width:200px;
            padding:8px;
            border:1px solid #ddd;
            color:#888;
            outline:0;
            font-size:14px;
            font-weight:bold
          }
          .modal-header,
          .modal-footer {
            padding: 10px 20px;
          }
          .modal-header {
            border-bottom: #eeeeee solid 1px;
          }
          .modal-header h2 {
            font-size: 20px;
          }
          .btn {
            background: orange;
            border: #357ebd solid 0px;
            border-radius: 3px;
            color: #fff;
            display: inline-block;
            font-size: 14px;
            padding: 8px 15px;
            text-decoration: none;
            text-align: center;
            min-width: 60px;
            position: relative;
            transition: color .1s ease;
          }
          .btn:hover {
            background: #357ebd;
          }
          .btn.btn-big {
            font-size: 18px;
            padding: 15px 20px;
            min-width: 100px;
          }
          .btn-close {
            color: orange;
            font-size: 20px;
            text-decoration: none;
            padding:10px;
            position: absolute;
            right: 7px;
            top: 0;
          }
          .btn-close:hover {
            color: orange;
          }
          .loading {
            
            width: 50px;
            height: 50px;
            border-radius: 150px;
            border: 5px solid #FF9800;
            border-top-color: rgba(0,0,0,0.3);
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -30px;
            margin-left: -29px;
            animation: loading 1.2s linear infinite;
            -webkit-animation: loading 1.2s linear infinite;
        }
          @keyframes loading{
            0%{transform:rotate(0deg)}
            100%{transform:rotate(360deg)}
          }
          @-webkit-keyframes loading{
            0%{-webkit-transform:rotate(0deg)}
            100%{-webkit-transform:rotate(360deg)}
          }
        </style>

        <button id="getpin" class="loginBtn loginBtn--google">
             Get Pin
        </button>
        
        <div id="modale" class="modale" aria-hidden="true">
  <div class="modal-dialog">
    <div id='modal-header' class="modal-header">  
    <div style="display:none" id="loading" class="loading">
    </div>
  <h2>Get Pin</h2>
  <a href="#" id="closemodale" class="btn-close closemodale" aria-hidden="true">&times;</a>
    
    </div>
    <div id="form" class="modal-body">
    <div id="input-div">
     <input id="email" type="text" name="u" placeholder="email" size="20" /><br>
    </div>
 
    <div class="modal-footer">
  

      <a href="#" class="btn" id="btn_ingresar">Get pin</a>
    </div>
  </div>
</div>

        `
    
    this.gravitoEndPointUrl=this.getAttribute("gravitoEndPointUrl");
    shadow.getElementById("getpin").addEventListener("click",()=>{
        shadow.getElementById("modale").setAttribute("class",'opened')
    })
    shadow.getElementById("closemodale").addEventListener("click",()=>{
        shadow.getElementById("modale").classList.remove("opened")
    })

    shadow.getElementById("btn_ingresar").addEventListener("click",()=>{
      debugger
        shadow.getElementById("loading").style.display="block"
        var email=shadow.getElementById("email").value
        if(this.checkValidEmail(email)){
            var model = {
                email:email,
                token:""
            }
            
            this.sendMagicLink(model,shadow.getElementById("input-div"))
        }
        else{
          shadow.getElementById("loading").style.display="none"

            shadow.getElementById("form").innerHTML=`
            <input id="email" type="text" name="u" placeholder="incorrect email" size="20" /><br>
            <div class="modal-footer">
      <a href="#" class="btn" id="btn_ingresar">Get pin</a>
    </div>
            `
        }
        
        
    })
    }
     checkValidEmail(email){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        }
    sendMagicLink=(model,element)=>{
        var local=this
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=function () {
            debugger
          if (this.readyState == 4 && this.status == 200) {
            console.log("result from magiclink ",this.response);
            local.shadowRoot.getElementById("loading").style.display="none"
            element.innerHTML=`
        <input type="text" name="pin" placeholder="enter pin" size="20" /><br>
        
        `
            
            
          }
        };
        xhttp.open("POST", this.gravitoEndPointUrl, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8",);
        
        xhttp.send(JSON.stringify(model));
        
        }

    afterEmailSend=(element)=>{
        element.innerHTML=`
        <input type="text" name="pin" placeholder="enter pin" size="20" /><br>
        
        `
    }
    
    
}
customElements.define("gravito-magiclink-button",GravitoButton)