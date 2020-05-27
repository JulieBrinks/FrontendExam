//merger de forskellige javascript filer sammen så HTML kun skal kalde på en JS fil
document.write('<script type="text/javascript" src="menu.js" ></script>');
document.write('<script type="text/javascript" src="playerscript.js" ></script>');
document.write('<script type="text/javascript" src="chromecast.js" ></script>');

//Logo til forsiden navigerer til oldschool siden
const logo = document.getElementById('logo');
logo.src = 'https://allpunkedup.com/wp-content/uploads/2016/07/mtv-.png';
logo.addEventListener('click', showOld);

//logo i menuen navigerer til forsiden
document.getElementsByClassName('logo')[0].addEventListener('click', showHome);

//oprettelse af tekstelement+variabel og chatvariabel
const text = document.createElement('p');
document.getElementById('wrapper').appendChild(text);
const chat = document.getElementById('chat');

//oprettelse af de forskellige menuvalg-elementer
const frontpage = document.getElementById('frontpage');
const oldschool = document.getElementById('oldschool');
const newschool = document.getElementById('newschool');
const about = document.getElementById('about');

//ved klik på de forskellige menulinks, gør funktionen
frontpage.addEventListener('click', showHome);
oldschool.addEventListener('click', showOld);
newschool.addEventListener('click', showNew);
about.addEventListener('click', showAbout);


function showHome(){
  logo.style.display = "block";
  hidePlayer();
  hideAbout();
};

function showOld(){
  hideLogo();
  togglePlayer('old');
};

function showNew(){
  hideLogo();
  togglePlayer('new');
};

function showAbout(){
  logo.style.display = "none";
  hidePlayer();

  text.textContent = "This site is made for 80's and 90's youngsters who miss the good old music channel, MTV, where music videos were broadcast on the TV.";
  text.style.display = 'block';
}


function hideLogo(){
    // logo adjustments
  logo.style.display = "none";

  // display player
  document.getElementById('player').style.display = 'block';

  // display chat
  chat.style.display = "block";

  hideAbout();
}

//På startsiden og About skal playeren ikke vises
function hidePlayer(){

  // hide player
  document.getElementById('player').style.display = 'none';
  togglePlayer('none');

  // hide chat
  chat.style.display = "none";
}

function hideAbout(){
  text.style.display = 'none';
}

//------------------------------------------------------

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyAxnhgoJD_zMzkZLbZz93k7nlG3cuAAQHQ",
    authDomain: "mtvchat-645cc.firebaseapp.com",
    databaseURL: "https://mtvchat-645cc.firebaseio.com",
    projectId: "mtvchat-645cc",
    storageBucket: "mtvchat-645cc.appspot.com",
    messagingSenderId: "144494006232",
    appId: "1:144494006232:web:115448880a933699796cad"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Sætter brugernavn
let userName = prompt("Indtast dit navn");
if(userName == ""){
    prompt("Indtast dit navn");
}

//opretter et besked object
function sendBesked() {
    let MSGS = document.getElementById("chat-input").value;
    let gt = new Date();
    //opretter objectet under mappe/kategori 
    firebase.database().ref("collection").push().set({
        "sender": userName,
        "ChatMSG": MSGS,
        "hours": gt.getHours(),
        "minutes": gt.getMinutes(),
        "month": gt.getMonth(),
        "day": gt.getDay(),
        "year": gt.getFullYear()
    });
    return false;
}


//Henter besked objectet fra firebase
firebase.database().ref("collection").on("child_added", function(snapshot){
    let msg = "";
    // istedet for at skrive msg = "<li>" + snapshot osv er += blevet brugt til at tilføje data til msg variablen løbende istedet
    msg += "<li>";
    //if sætning tilføjer manglende 0 hvis værdien er under 10
    if(snapshot.val().minutes < 10) {
        msg += snapshot.val().sender + ": " + snapshot.val().ChatMSG + " kl: " + snapshot.val().hours+":"+"0"+snapshot.val().minutes+" "+snapshot.val().day+"-"+snapshot.val().month+"-"+snapshot.val().year;
    } else if(snapshot.val().hours < 10) {
        msg += snapshot.val().sender + ": " + snapshot.val().ChatMSG + " kl: " +"0"+ snapshot.val().hours+":"+snapshot.val().minutes+" "+snapshot.val().day+"-"+snapshot.val().month+"-"+snapshot.val().year;
    }
    msg += "</li>";

    //Sætter besked object på output listen
    document.getElementById("Output").innerHTML += msg;

});


