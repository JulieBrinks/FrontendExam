
// video data json
var videoData = {'old': 'PLmyAPRLQRJ6lMbAdXYGuyZ627Y9RoX25i', 'new': 'PLNoktxZxujD-MFpRoam4uFX7TvQ1nzAsV'}

// loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//    This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {

    player = new YT.Player('player', {
        height: '390',
        width: '640',
        playerVars:
            {
                listType: 'playlist',
                list: videoData.old,
                autoplay: 1,                                // enable autoplay
                disablekb: 1,                               // disable keyboard controls
                controls: 0,                                // disable controls
                iv_load_policy: 3,                          // no video annotations
                rel: 0                                      // show only videos from same channel when end
            },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {

    event.target.cuePlaylist({
        listType: 'playlist',
        list: videoData.old
    });

    event.target.unMute();                                  // unmute playlist
    event.target.setVolume(100);                            // max volume, baby
    event.target.setLoop(1);                                // make sure it loops - there's no stopping the madness

    // turn on shuffle
    setTimeout(function() {
        event.target.setShuffle({'shufflePlaylist' : true});
    }, 1000);
}

// create title elements
const header = document.getElementById('header');
const videoTitle = document.createElement('H2');
header.appendChild(videoTitle);

// event listener function
function onPlayerStateChange(event) {

    // remove (official video) and set title to video title
    if (event.data === YT.PlayerState.PLAYING){
        var newTitle = event.target.getVideoData().title;
        newTitle = newTitle.split("(")
        videoTitle.textContent = newTitle[0];
    }

    // disable pause
    if (event.data === YT.PlayerState.PAUSED){
        event.target.playVideo();
    }
}

// if error play next video
function onPlayerError(event) {
    event.target.nextVideo();
}