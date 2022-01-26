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

const getBase = async () => {
    const json = await fetch(`http://192.168.0.103:80/getbase`).then(data=>data.json());
    return json;
}

const playController = document.querySelector(".play-control__play");
playController.addEventListener("click", async function() { 
    const json = await getBase();
    const isYouTubePlayed = json[0].youtubeStatusPaused;
    isYouTubePlayed == "true" 
    ? this.src = "src/img/player-pause.png" 
    : this.src = "src/img/player-play.png"
})

const timingThreshold = document.querySelector(".timing-threshold");
const timingHint = document.querySelector(".list-value__hint");
timingHint.addEventListener("click", function() { 
    if(timingThreshold.classList.contains('active')) {
        timingThreshold.classList.remove('active');
        timingThreshold.querySelectorAll(".list-value__time, .list-value__item").forEach(el => {
            el.classList.remove('active');
        });
        this.innerText="тайминг"
    } else {
        timingThreshold.classList.add("active")
        timingThreshold.querySelectorAll(".list-value__time, .list-value__item").forEach(el => {
            el.classList.add('active');
        });
        this.innerText="×"
    }
})

const openGeneral = document.querySelector(".navbar__main");
const generalCommand = document.querySelector(".general-container");
openGeneral.addEventListener("click", function() { 
    console.log("test")
    if(generalCommand.classList.contains('active')) {
        generalCommand.classList.remove('active');
    } else {
        generalCommand.classList.add('active');
    }
})

clickToServer(".play-control__play", "youtubePlay");
clickToServer(".volume-control__turn:nth-child(4)", "youtubeVolumeUp");
clickToServer(".volume-control__turn:nth-child(2)", "youtubeVolumeDown");

clickToServer(".play-control__left", "youtubeTimeLeft");
clickToServer(".play-control__right", "youtubeTimeRight");
clickToServer(".volume-control__full-screen", "youtubeFullScreen");
