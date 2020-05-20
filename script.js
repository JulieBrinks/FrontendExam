var session = null;

$( document ).ready(function(){
    var loadCastInterval = setInterval(function(){
        if (chrome.cast.isAvailable) {
            console.log('Cast has loaded.');
            clearInterval(loadCastInterval);
            initializeCastApi();
        } else {
            console.log('Unavailable');
        }
    }, 1000);
});
// Googles API request
function initializeCastApi() {
    var applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
    var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
        sessionListener,
        receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
};
// Holder styr på antal sessions
function sessionListener(e) {
    session = e;
    console.log('New session');
    if (session.media.length != 0) {
        console.log('Found ' + session.media.length + ' sessions.');
    }
}
// Hvis der er en chromecast på det netværk som brugeren benytter eller ej
// Giv besked herefter
function receiverListener(e) {
    if( e === 'available' ) {
        console.log("Chromecast was found on the network.");
    }
    else {
        console.log("There are no Chromecasts available.");
    }
}
// Ja tak
function onInitSuccess() {
    console.log("Initialization succeeded");
}
// Fejlmeddelelse
function onInitError() {
    console.log("Initialization failed");
}
// Knap
$('#castme').click(function(){
    launchApp();
});
// Knappens funktion
function launchApp() {
    console.log("Launching the Chromecast App...");
    chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
}
// Log
function onRequestSessionSuccess(e) {
    console.log("Successfully created session: " + e.sessionId);
    session = e;
}
// Log ved Error
function onLaunchError() {
    console.log("Error connecting to the Chromecast.");
}
// Kald på loadMedia function
function onRequestSessionSuccess(e) {
    console.log("Successfully created session: " + e.sessionId);
    session = e;
    loadMedia();
}
// Hvis loadMedia IKKE er succesfuldt så log
function loadMedia() {
    if (!session) {
        console.log("No session.");
        return;
    }
// Media/Input - Billede format
    var mediaInfo = new
    chrome.cast.media.MediaInfo('https://scontent.faar2-1.fna.fbcdn.net/v/t1.0-9/52184152_10214144558473369_884078134087909376_n.jpg?_nc_cat=104&_nc_sid=110474&_nc_ohc=njYA43_xvpYAX8KK37l&_nc_ht=scontent.faar2-1.fna&oh=b88362c5029b2dffdb038a33d40c4cff&oe=5EEC3D95');
    mediaInfo.contentType = 'image/jpg';

    var request = new chrome.cast.media.LoadRequest(mediaInfo);
    request.autoplay = true;

    session.loadMedia(request, onLoadSuccess, onLoadError);
}
// Log
function onLoadSuccess() {
    console.log('Successfully loaded image.');
}
// Log ved error
function onLoadError() {
    console.log('Failed to load image.');
}
// Knap til at stoppe cast
$('#stop').click(function(){
    stopApp();
});
// Stop session funktion
function stopApp() {
    session.stop(onStopAppSuccess, onStopAppError);
}
// Log hvis yay
function onStopAppSuccess() {
    console.log('Successfully stopped app.');
}
// Log hvis nay
function onStopAppError() {
    console.log('Error stopping app.');
}