const PORT = 'https://192.168.0.103:3000'

const getCommandBase = async () => {
    const data = await fetch(`${PORT}/commandbase`)
    .catch(err=>console.log(err));
    if(!data) return;
    const json = await data.json();
    return json;
}

const getStatusVideoYoutube = async () => {
    // if(!/^https:..www.youtube.com/.test(window.location.href)
    // || !document.querySelector("video")) return;

    let isVideoPaused = document.querySelector("video").paused;
    fetch(`https://192.168.0.103:3000/status?youtubePaused=${isVideoPaused}`);
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
                playYoutubeVideo && (video.paused ? video.play() : video.pause());

                /**Youtube-volume-video */
                const videoVolumeUp = json[0].youtubeVolumeUp;
                videoVolumeUp && (video.volume+=0.2);
                const videoVolumeDown = json[0].youtubeVolumeDown;
                videoVolumeDown && (video.volume-=0.2);

                /**Youtube-video-timing */
                const videoSkipRight = json[0].youtubeTimeRight;
                videoSkipRight && (video.currentTime+=50);
                const videoSkipLeft = json[0].youtubeTimeLeft;
                videoSkipLeft && (video.currentTime-=50);
            }
            /** Universl Commands on youtube*/
            const openNewVideo = json[0].youtubeOpenVideo;
            openNewVideo && (getFirstVideo(openNewVideo))
        } 

    })
}, 100);