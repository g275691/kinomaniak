const PORT = 'https://192.168.0.103:3000'

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
    getCommandBase()
    .then(json=>{
        if(!json) return;
        /**Youtube commands */
        const isYouTube = /^https:..www.youtube.com/.test(window.location.href);
        if(isYouTube) {
            /**Commands with open player */
            if(document.querySelector("#movie_player")) {
                const video = document.querySelector("#movie_player").querySelector("video");
                
                /**Youtube-play-video */
                const playYoutubeVideo = json[0].youtubePlay;
                fetch(`${PORT}/commandbase/command?youtubeStatusPaused=${video.paused}`)
                playYoutubeVideo && (video.paused ? video.play() : video.pause());

                /**Youtube-volume-video */
                const videoVolumeUp = json[0].youtubeVolumeUp;
                videoVolumeUp && (video.volume+=0.1);
                const videoVolumeDown = json[0].youtubeVolumeDown;
                videoVolumeDown && (video.volume-=0.1);

                /**Youtube-video-timing */
                const youtubeScrollTiming = Number(json[0].youtubeScrollTiming);

                const videoSkipRight = json[0].youtubeTimeRight;
                videoSkipRight && (video.currentTime+=youtubeScrollTiming);
                const videoSkipLeft = json[0].youtubeTimeLeft;
                videoSkipLeft && (video.currentTime-=youtubeScrollTiming);

            }
            /** Universal Commands on youtube*/
            const openNewVideo = json[0].youtubeOpenVideo;
            openNewVideo && (window.open(`https://www.youtube.com/results?search_query=${openNewVideo}`))
            /**Open video by number */
            const isSubscription = document.querySelector(".style-scope ytd-grid-renderer");
            const isSearchPage = /https:..www.youtube.com.result/i.test(window.location.href);
            let youtubeNumberVideo = Number(json[0].youtubeNumberVideo);
            let youtubeOpenVideoByNumber = Number(json[0].youtubeOpenVideoByNumber);
            if(isSubscription) {
                if(youtubeNumberVideo) {
                    isSubscription.querySelectorAll("img").forEach(el=>el.style.filter="brightness(1)");
                    isSubscription.querySelectorAll("img")[youtubeNumberVideo - 1].style.filter="brightness(1.9)";
                }
                if(youtubeOpenVideoByNumber) {
                    isSubscription.querySelectorAll("img")[youtubeOpenVideoByNumber - 1].click();
                }
            } 
            if(isSearchPage) {
                const findQuery = document.querySelector(".style-scope ytd-section-list-renderer").querySelectorAll(".style-scope ytd-thumbnail");
                if(youtubeNumberVideo) {
                    findQuery.forEach(el=>el.style.filter="brightness(1)");
                    findQuery[youtubeNumberVideo - 1].style.filter="brightness(1.9)";
                }
                if(youtubeOpenVideoByNumber) {
                    findQuery[youtubeOpenVideoByNumber - 1].querySelector("a").click();
                }
            }
        } 
        /**Commands for entire browser */
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
        const closeBrowserTab = json[0].browserTabClose;
        closeBrowserTab && (window.close())

        const youtubeSubcriptions = json[0].youtubeSubcriptions
        youtubeSubcriptions && (window.open('https://www.youtube.com/feed/subscriptions'))
    })
}, 100);