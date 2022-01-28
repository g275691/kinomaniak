// const clickToServer = (query, command, value=true) => {
//     document.querySelector(query).addEventListener("click", function() {
//         console.log(`${command} : ${value}`);
//         fetch(`http://192.168.0.103:80/commandbase/command?${command}=${value}`);
//     })
// }

const updateCommandAPI = (command) => {
    return fetch(`http://192.168.0.103:80/commandbase/command/`, {
        method: "PUT",  
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },  
        body: JSON.stringify(command) 
    });
}

const clickToServer = (query, command, value=true) => {
    document.querySelector(query).addEventListener("click", function() {
        console.log(`${command} : ${value}`);
        updateCommandAPI({[command]: value})
    })
}

const getBase = async () => {
    const json = await fetch(`http://192.168.0.103:80/getbase`).then(data=>data.json());
    return json;
}

// const playController = document.querySelector(".play-control__play");
// playController.addEventListener("click", async function() { 
//     const json = await getBase();
//     const isYouTubePlayed = json[0].youtubeStatusPaused;
//     isYouTubePlayed == "true" 
//     ? this.src = "src/img/player-pause.png" 
//     : this.src = "src/img/player-play.png"
// })

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

const openYoutubeOptions = document.querySelector(".navbar__youtube-main");
const youtubeQuery = document.querySelector(".youtube-options-container");

openYoutubeOptions.addEventListener("click", function() { 
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
        updateCommandAPI({youtubeScrollTiming: timingValue})
    })
})

const videoByNumber = document.querySelector(".video-by-time-container");
const openVideoByNumber = document.querySelector(".video-by-time-container").querySelector(".close");
const videoContainer = document.querySelector(".video-container");
const findVideoInput = document.querySelector(".find-video__input")

openVideoByNumber.addEventListener("click", function() {
    if(videoByNumber.classList.contains('active')) {
        videoByNumber.classList.remove('active');
        videoContainer.classList.remove('active');
        this.classList.remove('active');
        this.innerText="ВИДЕО ПО НОМЕРАМ";
        findVideoInput.placeholder = "Искать другое видео";
    } else {
        videoByNumber.classList.add('active');
        videoContainer.classList.add('active');
        this.classList.add('active');
        this.innerText="ЗАКРЫТЬ";
        findVideoInput.placeholder = "Искать по номеру";
    }
})

const findLupa = document.querySelector(".find-video").querySelector(".find-video__lupa");
findLupa.addEventListener("click", function() { 
    if(/Искать другое видео/i.test(findVideoInput.placeholder)) {
        updateCommandAPI({youtubeOpenVideo: `results?search_query=${findVideoInput.value}`})
        openVideoByNumber.click();
        findVideoInput.value = "";
    } else {
        updateCommandAPI({youtubeOpenVideoByNumber: findVideoInput.value})
    }
})

const videoRect = document.querySelectorAll(".video-container__item");
videoRect.forEach(rect=>{
    rect.addEventListener("click", function() { 
        const videoNumber = this.innerText;
        findVideoInput.value = videoNumber;
        updateCommandAPI({youtubeNumberVideo: videoNumber})
    })
});

clickToServer(".play-control__play", "youtubePlay");
clickToServer(".volume-control__turn:nth-child(4)", "youtubeVolumeUp");
clickToServer(".volume-control__turn:nth-child(2)", "youtubeVolumeDown");

clickToServer(".play-control__left", "youtubeTimeLeft");
clickToServer(".play-control__right", "youtubeTimeRight");

clickToServer(".scroll-down", "scrollUp");
clickToServer(".scroll-up", "scrollDown");

// /**python */
clickToServer(".zoom-plus", "browserZoomPlus");
clickToServer(".zoom-minus", "browserZoomMinus");
clickToServer(".tab-control__close", "browserTabClose");
clickToServer(".tab-control__right", "browserTabRight");
clickToServer(".tab-control__left", "browserTabLeft");
clickToServer(".volume-control__full-screen", "youtubeFullScreen");
clickToServer(".general-control__turn-off", "computerDisable");

document.querySelectorAll(".popular-query__item").forEach(el=>{
    el.addEventListener("click", function() {
        updateCommandAPI({youtubeOpenVideo: el.dataset.url})
        openVideoByNumber.click()
    })

})