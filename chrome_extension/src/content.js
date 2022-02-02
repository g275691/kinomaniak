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
        // if(isYouTube) {
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
                    volumeItems.forEach((el,i)=>i <= videoVolume ? el.style.opacity = 1 : el.style.opacity = 0);

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
                    volumeItems.forEach((el,i)=>i <= videoVolume ? el.style.opacity = 1 : el.style.opacity = 0);
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

                /**Subscribe */
                try {
                    const subscribeButton = document.querySelector("#subscribe-button.ytd-video-secondary-info-renderer").querySelector("tp-yt-paper-button");
                    const subscribeAuthor = json[0].youtubeSubscribe;
                    subscribeAuthor && !subscribeButton.hasAttribute("subscribed") ? (subscribeButton.click()) : "";
                } catch (err) {}


                /**Subscribe author video */
                
                try {
                    const youtubeOpenVideoByAuthor = json[0].youtubeOpenVideoByAuthor;
                    const authorVideos = `${document.querySelector("#movie_player").closest("#primary").querySelector(".ytd-channel-name").querySelector("a").href}/videos`;
                    youtubeOpenVideoByAuthor && (window.open(authorVideos))
                } catch (err) {}

            }
            /** Universal Commands on youtube*/

            /**Open video by number */
            const isSearchPage = /^https:..www.youtube.com.result/i.test(window.location.href);
            const isMainPage = /^https:..www.youtube.com.$/i.test(window.location.href);
            const isWatchPage = /https:..www.youtube.com.watch\?v/i.test(window.location.href)
            let youtubeNumberVideo = Number(json[0].youtubeNumberVideo);
            let youtubeOpenVideoByNumber = Number(json[0].youtubeOpenVideoByNumber);
            let prevVideoByNumber = json[0].prevVideoByNumber;
            let nextVideoByNumber = json[0].nextVideoByNumber;

            if(isSearchPage) {
                const findQuery = document.querySelector("#primary.ytd-two-column-search-results-renderer").querySelectorAll("#thumbnail");
                if(youtubeNumberVideo || prevVideoByNumber || nextVideoByNumber) {
                    findQuery.forEach(el=>{el.style.marginTop="0px"; el.style.filter=""});
                    findQuery[youtubeNumberVideo - 1].style.marginTop="30px";
                    findQuery[youtubeNumberVideo - 1].style.filter="saturate(160)";
                    findQuery[youtubeNumberVideo - 1].scrollIntoView({block: "center", behavior: "smooth"});
                }
                if(youtubeOpenVideoByNumber) {
                    findQuery[youtubeOpenVideoByNumber - 1].querySelector("a").click();
                }

            } else if (isMainPage) {
                let mainContent = document.querySelectorAll("#content.style-scope ytd-rich-item-renderer");
                    if(mainContent[youtubeNumberVideo - 1]) {
                        if(youtubeNumberVideo || prevVideoByNumber || nextVideoByNumber) {
                            mainContent.forEach(el=>{el.style.marginTop="0px"; el.style.filter=""});
                            mainContent[youtubeNumberVideo - 1].style.marginTop="30px";
                            mainContent[youtubeNumberVideo - 1].style.filter="saturate(160)";
                            mainContent[youtubeNumberVideo - 1].scrollIntoView({block: "center", behavior: "smooth"})
                        }
                    }
                if(youtubeOpenVideoByNumber) {
                    mainContent[youtubeOpenVideoByNumber - 1].querySelector("a").click();
                    
                }
                
            } else if(isWatchPage) {
                let mainContent = document.querySelector("#secondary.style-scope.ytd-watch-flexy").querySelectorAll("a#thumbnail");
                if(youtubeNumberVideo) {
                    mainContent.forEach(el=>{el.style.marginTop="0px"; el.style.filter=""});
                    mainContent[youtubeNumberVideo - 1].style.marginTop="30px";
                    mainContent[youtubeNumberVideo - 1].style.filter="saturate(160)";
                    mainContent[youtubeNumberVideo - 1].scrollIntoView({block: "center", behavior: "smooth"})
                }
                if(youtubeOpenVideoByNumber) {
                    mainContent[youtubeOpenVideoByNumber - 1].click();
                    
                }
            } else {
                const contentId = document.querySelector("#contents.ytd-section-list-renderer");

                if(youtubeNumberVideo || prevVideoByNumber || nextVideoByNumber) {
                    contentId.querySelectorAll("img").forEach(el=>{el.style.marginTop="0px"; el.style.filter=""});
                    contentId.querySelectorAll("img")[youtubeNumberVideo - 1].style.marginTop="30px";
                    contentId.querySelectorAll("img")[youtubeNumberVideo - 1].style.filter="saturate(160)";
                    contentId[youtubeOpenVideoByNumber - 1].scrollIntoView({block: "center", behavior: "smooth"});
                }
                if(youtubeOpenVideoByNumber) {
                    contentId.querySelectorAll("img")[youtubeOpenVideoByNumber - 1].click();
                }
            }

            const getUrl = json[0].getUrl;


            if(getUrl) {
                const favouriteNumber = Number(json[0].getUrl[0]);
                const favouriteTitle = json[0].getUrl.slice(1);
                const favouriteUrl = window.location.href;
                fetch(`${PORT}/popular-query`, {
                    method: "POST",  
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },  
                    body: JSON.stringify({
                        favouriteNumber,
                        favouriteTitle,
                        favouriteUrl
                    }) 
                })
            }
        // } 
        /**Commands for entire browser */

        const browserReload = json[0].browserReload;
        browserReload && (document.location.reload());

        const openNewVideo = json[0].youtubeOpenVideo;
        if(openNewVideo) {
            window.open(openNewVideo); 
        }  

        const scrollUp = json[0].scrollUp;
        const scrollDown = json[0].scrollDown;
        if(scrollUp) {
            const newY = window.pageYOffset + 200;
            window.scrollTo({top: newY, behavior: "smooth"});
        }
        if(scrollDown) {
            const newY = window.pageYOffset - 200;
            window.scrollTo({top: newY, behavior: "smooth"});
        }

        const youtubeSubcriptions = json[0].youtubeSubcriptions
        youtubeSubcriptions && (window.open('https://www.youtube.com/feed/subscriptions'))
    })
}, 100);

setInterval(() => {
    
}, 1000);