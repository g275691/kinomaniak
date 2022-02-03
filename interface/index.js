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

const videoByNumber = document.querySelector(".video-by-time-container");
const videoContainer = document.querySelector(".video-container");
const findVideoInput = document.querySelector(".find-video__input");

const openGeneral = document.querySelector(".navbar__main");
const generalCommand = document.querySelector(".general-container");

const openYoutubeOptions = document.querySelector(".navbar__youtube-main");
const youtubeQuery = document.querySelector(".youtube-options-container");

const changeFindModeNumber = document.querySelector(".change-find-mode__number");
const nextFrameFocusBtn = document.querySelector(".next-frame__btn.next");
const prevFrameFocusBtn = document.querySelector(".next-frame__btn.prev");

/**Youtubeoptions */

/**Mode */

const mode = videoOptions[0].mode;

switch (mode) {
    case "youtube":
        openYoutubeOptions.style.backgroundImage = 'url("src/img/youtube-logo-options.png")';
        youtubeQuery.querySelector(".list-value__youtube").classList.add('active');
        document.querySelector(".next-frame").style.display = "none"
        break;
    case "google":
        openYoutubeOptions.style.backgroundImage = 'url("src/img/google-logo.png")';
        youtubeQuery.querySelector(".list-value__google").classList.add('active');
        videoByNumber.querySelectorAll(".subscribe").forEach(el=>el.style.display = "none");
        break;
}

document.querySelectorAll(".list-value__youtube, .list-value__google").forEach(el=>{
    el.addEventListener("click", function() {
        fetch(`http://192.168.0.103:80/videomode/${el.innerText}`)
    })
})

/**Timing */

const timingValues = document.querySelectorAll(".list-value__time");
const rewindStep = videoOptions[0].rewindStep;
const rewindStepValues = [0.5, 1, 5, 10];

rewindStepValues.map((el, i)=>{
    el == rewindStep 
    ? timingValues[i].classList.add("active")
    : timingValues[i].classList.remove("active")
})


timingValues.forEach((button, index)=>{
    button.addEventListener("click", function() { 
        let timingValue = Number(timingValues) * 60;
        fetch(`http://192.168.0.103:80/commandbase/command?youtubeScrollTiming=${timingValue}`);
    })
})

let inputModeNameVideo = true;

const setVideoByNumber = () => {
    inputModeNameVideo = true;
    findVideoInput.placeholder = "Искать другое видео";
    if(mode == "youtube") {
        findVideoInput.value = "";
    } else {
        findVideoInput.value = "   смотреть онлайн";
    }
}

findVideoInput.addEventListener("focus", function() {
    document.querySelectorAll(".zoom-buttons, .scroll-buttons").forEach(el=>el.classList.remove('active'));
})

findVideoInput.addEventListener("blur", function() {
    document.querySelectorAll(".zoom-buttons, .scroll-buttons").forEach(el=>el.classList.add('active'));
})

setVideoByNumber();

changeFindModeNumber.addEventListener("click", function() {
    console.log(inputModeNameVideo);
    if(this.classList.contains("active")) {
        this.innerText = "Открыть поиск по номеру";
        inputModeNameVideo = true;
        this.classList.remove('active');
        findVideoInput.placeholder = "Искать другое видео";
        
    } else {
        this.innerText = "Закрыть поиск по номеру";
        inputModeNameVideo = false;
        this.classList.add('active');
        findVideoInput.placeholder = "Искать видео по номеру";
    }
})

const findLupa = document.querySelector(".find-video").querySelector(".find-video__lupa");
findLupa.addEventListener("click", function() { 
    console.log(inputModeNameVideo);
    findVideoInput.value = findVideoInput.value.replace(/ {1,}/g, " ").trim();
    const videoUrl = (mode == "youtube"
    ? `https://www.youtube.com/results?search_query=${findVideoInput.value}`
    : `https://www.google.com/search?q=${findVideoInput.value}`)
    if(inputModeNameVideo) {
        fetch(`http://192.168.0.103:80/commandbase/command?youtubeOpenVideo=${videoUrl}`);
        changeFindModeNumber.click();
        
    } else {
        fetch(`http://192.168.0.103:80/commandbase/command?youtubeOpenVideoByNumber=${findVideoInput.value}`);
        changeFindModeNumber.click();
    }
})

document.querySelector(".change-find-mode__reset-text").addEventListener("click", function() {
    findVideoInput.value = ""
})

const volumeItems = document.querySelectorAll(".volume-scale__item");
volumeItems.forEach((el,i)=>i<=3&&(el.style.opacity=1))
 
document.querySelectorAll(".popular-query__item").forEach((el,i)=>{
    popularQuery[i] 
    ? el.innerText = popularQuery[i].title
    : el.innerText = "noname"
    
    el.addEventListener("click", function() {
        const youtubeVideo = `http://192.168.0.103:80/commandbase/command?youtubeOpenVideo=${popularQuery[i].url}`;
        console.log(youtubeVideo)
        fetch(youtubeVideo);
        changeFindModeNumber.click()
    })
})

const videoRect = document.querySelectorAll(".video-container__item");
videoRect.forEach(rect=>{
    rect.addEventListener("click", function() { 
        const videoNumber = this.innerText;
        findVideoInput.value = videoNumber;
        fetch(`http://192.168.0.103:80/commandbase/command?youtubeNumberVideo=${videoNumber}`);
        videoRect.forEach(el=>el.classList.remove('active'));
        rect.classList.add('active');
    })
});

const nextVideoByNumber = document.querySelector(".video-nav__right");
const prevVideoByNumber = document.querySelector(".video-nav__left");

nextVideoByNumber.addEventListener("click", function() {
    findVideoInput.value = isNaN(findVideoInput.value) ? 0 : Number(findVideoInput.value) + 1;
    const videoNumber = findVideoInput.value;
    videoRect.forEach((el, i)=>{
        el.classList.remove('active');
        videoRect[videoNumber - 1] && videoRect[videoNumber - 1].classList.add('active')
    })
    fetch(`http://192.168.0.103:80/commandbase/command?youtubeNumberVideo=${videoNumber}`);
})

prevVideoByNumber.addEventListener("click", function() {
    findVideoInput.value = Number(findVideoInput.value) - 1;
    const videoNumber = findVideoInput.value;
    videoRect.forEach((el, i)=>{
        el.classList.remove('active');
        videoRect[videoNumber - 1] && videoRect[videoNumber - 1].classList.add('active')
    })
    fetch(`http://192.168.0.103:80/commandbase/command?youtubeNumberVideo=${videoNumber}`);
})

const containers = [
    ".youtube-options-container", 
    ".youtube-player-container", 
    ".general-container", 
    ".video-by-time-container",
    ".popular-edit-container"
]

const hideAllContainers = () => {
    containers.forEach((el,i) => {
        document.querySelectorAll(".activate-button")[i].addEventListener("click", function() {
            if(document.querySelector(el).classList.contains('active')) {
                containers.map(el=>document.querySelector(el).classList.remove('active'));
                
                document.querySelector(el).classList.remove('active');
                document.querySelector(".youtube-player-container").classList.add("active");
            } else {
                containers.map(el=>document.querySelector(el).classList.remove('active'));
                
                document.querySelector(el).classList.add('active');
            }
        })
    })
}

document.querySelectorAll(".activate-button").forEach((el,i)=>{
    if(i!=3) {
        el.addEventListener("click", function() {
            document.querySelector(".change-find-mode__number").classList.remove('active');
            document.querySelector(".change-find-mode__number").innerText = "Открыть поиск по номеру";
            inputModeNameVideo = true;
            findVideoInput.placeholder = "Искать другое видео"
        })
    }
})

hideAllContainers()

const popularAddresses = document.querySelectorAll(".popular-address");

popularAddresses.forEach((el,i)=>{
    const inputValue = (popularQuery[i+2] ? popularQuery[i+2].title : "")
    el.querySelector("input").value = inputValue;
    
    const getUrl = el.querySelector("button");
    getUrl.addEventListener("click", function() {
        const currentInput = document.querySelectorAll(".popular-address")[i].querySelector("input").value
        console.log(currentInput)
        fetch(`http://192.168.0.103:80/commandbase/command?getUrl=${i}${currentInput}`)
        

    })
    
})

let nextFrameFocus = -1;
nextFrameFocusBtn.addEventListener("click", function() {
    nextFrameFocus+=1;
    fetch(`http://192.168.0.103:80/commandbase/command?nextFrameFocus=${nextFrameFocus}`)
})

prevFrameFocusBtn.addEventListener("click", function() {
    nextFrameFocus-=1;
    fetch(`http://192.168.0.103:80/commandbase/command?nextFrameFocus=${nextFrameFocus}`)
})

/**Youtube */

clickToServer(".play-control__play", "youtubePlay");
clickToServer(".volume-control__turn:nth-child(4)", "youtubeVolumeUp");
clickToServer(".volume-control__turn:nth-child(2)", "youtubeVolumeDown");
clickToServer(".play-control__left", "youtubeTimeLeft");
clickToServer(".play-control__right", "youtubeTimeRight");
clickToServer(".subscribe__action", "youtubeSubscribe");
clickToServer(".subscribe__author-video", "youtubeOpenVideoByAuthor");

/**Universal - for Browser */

clickToServer(".next-frame__focus-video", "focusVideo");
clickToServer(".scroll-down", "scrollUp");
clickToServer(".scroll-up", "scrollDown");
clickToServer(".tab-control__refresh", "browserReload");
clickToServer(".subscribe__author-video", "youtubeOpenVideoByAuthor");

/**Universal - for comp */

clickToServer(".general-control__turn-off", "computerDisable")
clickToServer(".open-browser", "openBrowser")

// /**python */
clickToServer(".zoom-plus", "browserZoomPlus");
clickToServer(".zoom-minus", "browserZoomMinus");
clickToServer(".tab-control__close", "browserTabClose");
clickToServer(".tab-control__right", "browserTabRight");
clickToServer(".tab-control__left", "browserTabLeft");
clickToServer(".volume-control__full-screen", "youtubeFullScreen");
