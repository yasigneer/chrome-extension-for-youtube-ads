document.querySelector('video')?.addEventListener('playing', playHandler, false);
function playHandler(e) {
    speedUpAndMuteAdVideo();
    skipAd();
}

function speedUpAndMuteAdVideo(){
    var adElement = document.getElementsByClassName('video-ads ytp-ad-module')[0],
        style = window.getComputedStyle(adElement),
        display = style.getPropertyValue('display');
    if(display === 'block'){
        document.querySelector('video').playbackRate = 16.0;
        document.querySelector('video').muted = true;
    }
}


function skipAd(){
    if(isSkipAdButtonExist()){
        document.querySelector(".ytp-ad-skip-button-modern").click();
    }
}

function isSkipAdButtonExist(){
    return document.body.contains(document.querySelector(".ytp-ad-skip-button-modern"));
}