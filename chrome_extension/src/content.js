const PORT = 'https://192.168.0.103:3000'

const getCommandBase = async () => {
    const data = await fetch(`${PORT}/commandbase`)
    .catch(err=>console.log(err));
    if(!data) return;
    const json = await data.json();
    return json;
}

setInterval(() => {
    getCommandBase()
    .then(json=>{
        if(!json) return;
        if(json[0].isYoutubeOpen) {
            window.open("https://www.youtube.com/")
        }
        if(json[0].youtubeVolumeUp) {
            document.querySelectorAll("video").forEach(video=>video.volume+=0.2);
            console.log("volume + 0.2")
        }
        if(json[0].youtubeVolumeDown) {
            document.querySelectorAll("video").forEach(video=>video.volume-=0.2);
            console.log("volume - 0.2")
        }
    })
}, 100);