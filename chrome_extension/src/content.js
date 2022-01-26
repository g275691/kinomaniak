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
            openNewVideo && (getFirstVideo(openNewVideo))
        } 
        const closeBrowserTab = json[0].browserTabClose;
        closeBrowserTab && (window.close())

        const youtubeSubcriptions = json[0].youtubeSubcriptions
        youtubeSubcriptions && (window.open('https://www.youtube.com/feed/subscriptions'))
    })
}, 100);