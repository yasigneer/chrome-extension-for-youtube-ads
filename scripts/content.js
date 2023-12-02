console.log("activated ad skipper");

observer = new MutationObserver(observeCallbak);

getVideoEementAndAddEventListeners();


function getVideoEementAndAddEventListeners(){
    var video = document.querySelector('video');
    if(video == null) {
        console.log("no video on current page. observing...")
        observer.observe(document.querySelector("ytd-app"),{
            childList: true,
            subtree: true,
        });
        return;
    }
    addEventListenersToVideo(video);
}

function addEventListenersToVideo(video){
    video.addEventListener("playing", playingEventHandler);
    video.addEventListener("play", playEventHandler);
    playVideoToTriggerEvent(video);
}

function playVideoToTriggerEvent(video){
    video.pause();
    video.play();
}

function observeCallbak(mutations) {
    for (let mutation of mutations) {
        if (mutation.target?.className?.toString().includes("html5-video-container")) {
            var video = document.querySelector('video');
            console.log(video);
            addEventListenersToVideo(video);
            observer.disconnect();
            break;
        }
    }
  }

function playingEventHandler(){
    console.log("checking for 'playing' event");
    speedUpAndSkipVideo();
}
function playEventHandler() {
    console.log("checking for 'play' event");
    speedUpAndSkipVideo();
}

function speedUpAndSkipVideo(){
    speedUpAndMuteAdVideo();
    skipAd();
}

function speedUpAndMuteAdVideo(){
    if(!isElementExists(".video-ads.ytp-ad-module")){
        console.log("ad video does not exist")
        return;
    }
    console.log("found ad element")
    var adElement = document.getElementsByClassName('video-ads ytp-ad-module')[0];
    var style = adElement && window.getComputedStyle(adElement);
    var display = style ? style.getPropertyValue('display') : null
    if(display === 'none' || display == null){
        return;
    }
    console.log("speeding up ad video");
    document.querySelector('video').muted = true;
    document.querySelector('video').playbackRate = 16.0;
}

function skipAd(){
    if(!isElementExists(".ytp-ad-skip-button-modern")){
        return;
    }
    console.log("skipping ad video");
    document.querySelector(".ytp-ad-skip-button-modern").click();
}

function isElementExists(selector){
    return document.body.contains(document.querySelector(selector));
}

