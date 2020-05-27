
// Create and get elements for Chromecast
const castMe = document.getElementById('castme');
castMe.addEventListener('click', castPage);
var castSession;


// calling cast handler
window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
    myFetch();
  }
};

// async function
async function myFetch() {
  let response = await fetch('https://www.youtube.com/iframe_api');
  console.log(response)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.blob();
  }
}

// 
myFetch().then((blob) => {
  initializeCastApi();
}).catch(e => console.log(e));


initializeCastApi = function() {
  cast.framework.CastContext.getInstance().setOptions({
  receiverApplicationId:
    chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
  });
};

function castPage(){
  castSession = cast.framework.CastContext.getInstance().getCurrentSession();
}










