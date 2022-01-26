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

const closeThreshold = () => {
    timingThreshold.classList.remove('active');
    timingThreshold.querySelectorAll(".list-value__time, .list-value__item").forEach(el => {
        el.classList.remove('active');
    });
    timingHint.innerText="тайминг"
}

const timingThreshold = document.querySelector(".timing-threshold");
const timingHint = document.querySelector(".list-value__hint");
timingHint.addEventListener("click", function() { 
    if(timingThreshold.classList.contains('active')) {
        closeThreshold();
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
    if(generalCommand.classList.contains('active')) {
        generalCommand.classList.remove('active');
    } else {
        generalCommand.classList.add('active');
        youtubeQuery.classList.remove('active');
    }
})

const openYoutubeQuery = document.querySelector(".navbar__youtube-main");
const youtubeQuery = document.querySelector(".youtube-query-container");

openYoutubeQuery.addEventListener("click", function() { 
    if(youtubeQuery.classList.contains('active')) {
        youtubeQuery.classList.remove('active');
    } else {
        youtubeQuery.classList.add('active');
        generalCommand.classList.remove('active');
    }
})

const timingButtons = document.querySelectorAll(".list-value__item");
const timingValues = document.querySelectorAll(".list-value__time");
timingButtons.forEach((button, index)=>{
    button.addEventListener("click", function() { 
        let timingValue = Number(timingValues[index].innerText.replace(/[см]/, "")) * 60;
        closeThreshold();
        fetch(`http://192.168.0.103:80/commandbase/command?youtubeScrollTiming=${timingValue}`);
    })
})

const inputNumberVideo = document.querySelector(".youtube-query-control").querySelector("input");
const videoRect = document.querySelectorAll(".video-container__item");
videoRect.forEach(rect=>{
    rect.addEventListener("click", function() { 
        const videoNumber = this.innerText;
        fetch(`http://192.168.0.103:80/commandbase/command?youtubeNumberVideo=${videoNumber}`);
        console.log(videoNumber);
        inputNumberVideo.value = videoNumber;
    })
});
const findLupa = document.querySelector(".youtube-query-control").querySelector(".find-video__lupa");
findLupa.addEventListener("click", function() { 
    const videoNumber = inputNumberVideo.value;
    fetch(`http://192.168.0.103:80/commandbase/command?youtubeOpenVideoByNumber=${videoNumber}`);
})

clickToServer(".play-control__play", "youtubePlay");
clickToServer(".volume-control__turn:nth-child(4)", "youtubeVolumeUp");
clickToServer(".volume-control__turn:nth-child(2)", "youtubeVolumeDown");

clickToServer(".play-control__left", "youtubeTimeLeft");
clickToServer(".play-control__right", "youtubeTimeRight");

clickToServer(".zoom-plus", "browserZoomPlus");
clickToServer(".zoom-minus", "browserZoomMinus");

clickToServer(".tab-control__close", "browserTabClose");
clickToServer(".subscriptions", "youtubeSubcriptions");

clickToServer(".tab-control__scroll-down", "scrollUp");
clickToServer(".tab-control__scroll-up", "scrollDown");

/**python */
clickToServer(".tab-control__right", "browserTabRight");
clickToServer(".tab-control__left", "browserTabLeft");
clickToServer(".volume-control__full-screen", "youtubeFullScreen");