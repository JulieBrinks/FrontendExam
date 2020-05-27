// video data json
var videoData = {'old': 'PLmyAPRLQRJ6lMbAdXYGuyZ627Y9RoX25i', 'new': 'PLNoktxZxujD-MFpRoam4uFX7TvQ1nzAsV'};

// get title and create h2 element for title of video and explanatory text
const header = document.getElementById('title');
const videoTitle = document.createElement('H2');

// loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";  // iframe api
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // add iframe to script

//    This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  
    player = new YT.Player('player', {
        height: '800',
        width: '800',
        playerVars:
            {
                listType: 'playlist',
                list: videoData.old,
                autoplay: 0,                                // enable autoplay
                disablekb: 1,                               // disable keyboard controls
                controls: 0,                                // disable controls
                iv_load_policy: 3,                          // no video annotations
                rel: 0,                                     // show only videos from same channel when end
            },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });

  document.getElementsByTagName('iframe')[0].sandbox = 'allow-scripts allow-same-origin allow-presentation' // THIS ADDS ALL THE THINGS | FUTURE DEV
}


// check if old or new or hidden
const playerElement = document.getElementById('player');
let videoID;

// called from script functions - called on user nav on the site
function togglePlayer(temp){

    if (temp == 'old'){

      player.loadPlaylist({
      list: videoData.old,
      autoplay: 1});

      header.style.display = 'block';
      }
      else if (temp == 'new'){
        
        player.loadPlaylist({
        list: videoData.new,
        autoplay: 1});

        header.style.display = 'block';
        }
        else if (temp == 'none'){
          
          player.stopVideo();

          player.loadPlaylist({
          autoplay: 0});
            
          header.style.display = 'none';
          }
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  
  // create title elements
  header.textContent = 'YOU ARE LISTENING TO';
  header.appendChild(videoTitle);

  // DO NOT REMOVE - makes sure header does not show when landing on the page
  header.style.display = 'none'; 

  // adds playlist to load - player won't work without it
  event.target.loadPlaylist({
    listType: 'playlist',
    list: videoID
    });
    
    event.target.unMute();                                  // unmute playlist
    event.target.setVolume(100);                            // max volume, baby
    event.target.setLoop(1);                                // make sure it loops - there's no stopping the madness
    
    // turn on shuffle - won't work without timeout - why? probably because it waits for something.. anything
    setTimeout(function() {
      event.target.setShuffle({'shufflePlaylist' : true});
      }, 1000);

}

// event listener function
function onPlayerStateChange(event) {
  
  // remove (official video) and set title to video title
  if (event.data === YT.PlayerState.PLAYING){
    var newTitle = event.target.getVideoData().title;
    newTitle = newTitle.split("(");
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

