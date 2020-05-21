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
firebase.initializeApp(firebaseConfig)

//Sætter brugernavn
let userName = prompt("Indtast dit navn");
if(userName == ""){
    prompt("Indtast dit navn");
}


function sendBesked() {
    let Besked = document.getElementById("chat-input").value;
    let gt = new Date();
    firebase.database().ref("NewSchool").push().set({
        "Afsender": userName,
        "ChatBesked": Besked,
        "tidT": gt.getHours(),
        "tidM": gt.getMinutes()

    });
    return false;
}


//fange nye beskeder
firebase.database().ref("NewSchool").on("child_added", function(snapshot){
    let NS = "";
    NS += "<li>";
    if(snapshot.val().tidM < 10) {
        NS += snapshot.val().Afsender + ": " + snapshot.val().ChatBesked + " kl: " + snapshot.val().tidT+":"+"0"+snapshot.val().tidM;
    } else if(snapshot.val().tidT < 10) {
        NS += snapshot.val().Afsender + ": " + snapshot.val().ChatBesked + " kl: " +"0"+ snapshot.val().tidT+":"+snapshot.val().tidM;
    }
    NS += "</li>";

    //Sætter det nye liste object på output listen
    document.getElementById("Output").innerHTML += NS;

});