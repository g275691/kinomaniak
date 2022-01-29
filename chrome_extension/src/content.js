const PORT = 'https://192.168.0.103:3000'

const clearIntervals = () => {
    let intervalsId = sessionStorage.getItem("intervalId");
    intervalsId.split(",")
    .map(el=>clearTimeout(Number(el)));
    sessionStorage.setItem("intervalId", "0");
  }

const getCommandBase = async () => {
    const data = await fetch(`${PORT}/commandbase`)
    .catch(err=>console.log(err));
    if(!data) return;
    const json = await data.json();
    return json;
}

const getIdVideo = (text) => {
    return text.match(/{"videoId":"(.{1,15})",/)[1]
}

const getFirstVideo = async (req) => {
    console.log(req)
    const data = await fetch(`https://www.youtube.com/results?search_query=${req}`);
    const text = await data.text();
    const videoID = await getIdVideo(text);
    await window.open(`https://www.youtube.com/watch?v=${videoID}`)
}

setInterval(async () => { 
    !document.querySelector(".volume-indicator") && (await setVolumeIndicator());
    !document.hidden && getCommandBase()
    
    .then(json=>{
        
        if(!json) return;
        /**Youtube commands */
        const isYouTube = /^https:..www.youtube.com/.test(window.location.href);
        if(isYouTube) {
            /**Commands with open player */
            if(document.querySelector("#movie_player")) {
                const video = document.querySelector("#movie_player").querySelector("video");
                
                /**Youtube-play-video */
                // const playYoutubeVideo = json[0].youtubePlay;
                // fetch(`${PORT}/commandbase/command?youtubeStatusPaused=${video.paused}`)
                // playYoutubeVideo && (video.paused ? video.play() : video.pause());

                /**Youtube-volume-video */

                const volumeIndicator = document.querySelector(".volume-indicator");
                const volumeItems = document.querySelectorAll(".volume-scale__item");
                const videoVolumeUp = json[0].youtubeVolumeUp;
                
                if(videoVolumeUp) {
                    clearIntervals();
                    try {
                        video.volume+=0.1;
                    } catch {

                    }
                    
                    let videoVolume = (document.querySelector("#movie_player").querySelector("video").volume*10).toFixed(1);
                    volumeItems.forEach((el,i)=>i <= videoVolume ? el.style.opacity = 1 : el.style.opacity = 0)

                    volumeIndicator.style.opacity = 1;
                    let timeout = setTimeout(() => {
                        volumeIndicator.style.opacity = 0;
                    }, 3000);
                    let intervalsId = sessionStorage.getItem("intervalId");
                    intervalsId += `,${timeout}`;
                    sessionStorage.setItem("intervalId", intervalsId);
                    
                } 
                const videoVolumeDown = json[0].youtubeVolumeDown;

                if(videoVolumeDown) {
                    clearIntervals();
                    try {
                        video.volume-=0.1;
                    } catch (err) {}
                    
                    let videoVolume = (document.querySelector("#movie_player").querySelector("video").volume*10).toFixed(1);
                    volumeItems.forEach((el,i)=>i <= videoVolume ? el.style.opacity = 1 : el.style.opacity = 0)
                    volumeIndicator.style.opacity = 1;
                    let timeout = setTimeout(() => {
                        volumeIndicator.style.opacity = 0;
                    }, 3000);
                    
                    let intervalsId = sessionStorage.getItem("intervalId");
                    intervalsId += `,${timeout}`;
                    sessionStorage.setItem("intervalId", intervalsId);
                    
                }

                /**Youtube-video-timing */
                const youtubeScrollTiming = Number(json[0].youtubeScrollTiming);

                const videoSkipRight = json[0].youtubeTimeRight;
                videoSkipRight && (video.currentTime+=youtubeScrollTiming);
                const videoSkipLeft = json[0].youtubeTimeLeft;
                videoSkipLeft && (video.currentTime-=youtubeScrollTiming);

            }
            /** Universal Commands on youtube*/

            /**Open video by number */
            const isSubscription = document.querySelector(".style-scope ytd-grid-renderer");
            const isSearchPage = /https:..www.youtube.com.result/i.test(window.location.href);
            let youtubeNumberVideo = Number(json[0].youtubeNumberVideo);
            let youtubeOpenVideoByNumber = Number(json[0].youtubeOpenVideoByNumber);
            if(isSubscription) {
                if(youtubeNumberVideo) {
                    isSubscription.querySelectorAll("img").forEach(el=>{el.style.marginTop="0px"; el.style.filter=""});
                    isSubscription.querySelectorAll("img")[youtubeNumberVideo - 1].style.marginTop="30px";
                    isSubscription.querySelectorAll("img")[youtubeNumberVideo - 1].style.filter="saturate(160)";
                }
                if(youtubeOpenVideoByNumber) {
                    isSubscription.querySelectorAll("img")[youtubeOpenVideoByNumber - 1].click();
                }
            } 
            if(isSearchPage) {
                const findQuery = document.querySelector(".style-scope ytd-section-list-renderer").querySelectorAll(".style-scope ytd-thumbnail");
                if(youtubeNumberVideo) {
                    findQuery.forEach(el=>{el.style.marginTop="0px"; el.style.filter=""});
                    findQuery[youtubeNumberVideo - 1].style.marginTop="30px";
                    findQuery[youtubeNumberVideo - 1].style.filter="saturate(160)";
                }
                if(youtubeOpenVideoByNumber) {
                    findQuery[youtubeOpenVideoByNumber - 1].querySelector("a").click();
                }
            }
        } 
        /**Commands for entire browser */
        const openNewVideo = json[0].youtubeOpenVideo;
        if(openNewVideo) {
            window.open(`https://www.youtube.com/${openNewVideo}`); 
        }  

        const scrollUp = json[0].scrollUp;
        const scrollDown = json[0].scrollDown;
        if(scrollUp) {
            const newY = window.pageYOffset + 200;
            window.scrollTo(0, newY);
        }
        if(scrollDown) {
            const newY = window.pageYOffset - 200;
            window.scrollTo(0, newY);
        }

        const youtubeSubcriptions = json[0].youtubeSubcriptions
        youtubeSubcriptions && (window.open('https://www.youtube.com/feed/subscriptions'))
    })
}, 100);

setInterval(() => {
    
}, 1000);