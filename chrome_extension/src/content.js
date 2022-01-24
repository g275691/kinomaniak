const PORT = 'https://192.168.0.103:3000'

const getCommandBase = async () => {
    const data = await fetch(`${PORT}/commandbase`)
    .catch(err=>console.log(err));
    console.log(data)
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
        if(/^https:..www.youtube.com/.test(window.location.href) 
            && document.querySelector("#movie_player") 
            && json[0].youtubePlay) {
                //fetch(`${PORT}/status?youtubePaused=${isVideoPaused}`);
                if(document.querySelector("#movie_player").querySelector("video").paused) {
                    document.querySelector("#movie_player").querySelector("video").play()
                } else {
                    document.querySelector("#movie_player").querySelector("video").pause()
                } 
            }
        if(json[0].youtubeOpenVideo) {
            getFirstVideo(json[0].youtubeOpenVideo)
        }
        if(json[0].youtubeVolumeUp) {
            document.querySelector("#movie_player").querySelector("video").volume+=0.2;
            console.log("volume + 0.2")
        }
        if(json[0].youtubeVolumeDown) {
            document.querySelector("#movie_player").querySelector("video").volume-=0.2;
            console.log("volume - 0.2")
        }
        if(json[0].youtubeTimeLeft) {
            document.querySelector("#movie_player").querySelector("video").currentTime-=50;
        }
        if(json[0].youtubeTimeRight) {
            document.querySelector("#movie_player").querySelector("video").currentTime+=50;
        }
        if(json[0].youtubeFullScreen) {
            let clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('dblclick', true, true)
            document.querySelector("#movie_player").querySelector("video").dispatchEvent(clickEvent);
        }
    })
}, 100);

// setInterval(() => {
//     getStatusVideoYoutube();
// }, 3000);