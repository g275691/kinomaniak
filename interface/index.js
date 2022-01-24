document.querySelector(".find-video__lupa").addEventListener("click", function() {
    let inputValue = document.querySelector(".find-video__input").value;
    console.log(inputValue);
    fetch(`http://192.168.0.103:80/commandbase/command?youtubeOpenVideo=${inputValue}`);
})

const clickToServer = (query, command, value=true) => {
    document.querySelector(query).addEventListener("click", function() {
        console.log(`${command} : ${value}`);
        fetch(`http://192.168.0.103:80/commandbase/command?${command}=${value}`);
    })
}

document.querySelector(".play-control__play").addEventListener("click", function() { 
    this.src = "src/img/player-pause.png"
})

clickToServer(".play-control__play", "youtubePlay");
clickToServer(".volume-control__turn:nth-child(4)", "youtubeVolumeUp");
clickToServer(".volume-control__turn:nth-child(2)", "youtubeVolumeDown");

clickToServer(".play-control__left", "youtubeTimeLeft");
clickToServer(".play-control__right", "youtubeTimeRight");
clickToServer(".volume-control__full-screen", "youtubeFullScreen");
// setInterval(() => {
//     getStatus(".play-control__play")
//     .then(data=>{
//         console.log(data)
//     })
// }, 2000);

