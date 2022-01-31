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
        setVideoByNumber(openVideoByNumber)
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
        setVideoByNumber(openVideoByNumber)
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
        fetch(`http://192.168.0.103:80/commandbase/command?youtubeScrollTiming=${timingValue}`);
    })
})

const videoByNumber = document.querySelector(".video-by-time-container");
const openVideoByNumber = document.querySelector(".close-select-video");
const videoContainer = document.querySelector(".video-container");
const findVideoInput = document.querySelector(".find-video__input")

const setVideoByNumber = (query) => {
    videoByNumber.classList.remove('active');
    query.innerText="ВИДЕО ПО НОМЕРАМ";
    findVideoInput.placeholder = "Искать другое видео";
}

const hideVideoByNumber = (query) => {
    videoByNumber.classList.add('active');
    query.innerText="ЗАКРЫТЬ";
    findVideoInput.placeholder = "Искать по номеру";
}

openVideoByNumber.addEventListener("click", function() {
    videoByNumber.classList.contains('active')
    ? setVideoByNumber(this)
    : hideVideoByNumber(this)
})

const findLupa = document.querySelector(".find-video").querySelector(".find-video__lupa");
findLupa.addEventListener("click", function() { 
    if(/Искать другое видео/i.test(findVideoInput.placeholder)) {
        fetch(`http://192.168.0.103:80/commandbase/command?youtubeOpenVideo=results?search_query=${findVideoInput.value}`);
        openVideoByNumber.click();
        findVideoInput.value = "";
    } else {
        fetch(`http://192.168.0.103:80/commandbase/command?youtubeOpenVideoByNumber=${findVideoInput.value}`);
        setVideoByNumber(openVideoByNumber)

    }
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
        openVideoByNumber.click()
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
    findVideoInput.value = Number(findVideoInput.value) + 1;
    const videoNumber = findVideoInput.value;
    videoRect.forEach((el, i)=>{
        el.classList.remove('active');
        videoRect[videoNumber - 1].classList.add('active')
    })
    fetch(`http://192.168.0.103:80/commandbase/command?youtubeNumberVideo=${videoNumber}`);
})

prevVideoByNumber.addEventListener("click", function() {
    findVideoInput.value = Number(findVideoInput.value) - 1;
    const videoNumber = findVideoInput.value;
    videoRect.forEach((el, i)=>{
        el.classList.remove('active');
        videoRect[videoNumber - 1].classList.add('active')
    })
    fetch(`http://192.168.0.103:80/commandbase/command?youtubeNumberVideo=${videoNumber}`);
})

findVideoInput.addEventListener("focus", function() {
    document.querySelector(".video-by-time-container.active").style.top="40%"
})

findVideoInput.addEventListener("blur", function() {
    document.querySelector(".video-by-time-container.active").style.top="22%"
})

/**Youtube */

clickToServer(".play-control__play", "youtubePlay");
clickToServer(".volume-control__turn:nth-child(4)", "youtubeVolumeUp");
clickToServer(".volume-control__turn:nth-child(2)", "youtubeVolumeDown");
clickToServer(".play-control__left", "youtubeTimeLeft");
clickToServer(".play-control__right", "youtubeTimeRight");
clickToServer(".play-control__right", "youtubeTimeRight");
clickToServer(".subscribe__action", "youtubeSubscribe");
clickToServer(".subscribe__author-video", "youtubeOpenVideoByAuthor");

/**Universal - for Browser */

clickToServer(".scroll-down", "scrollUp");
clickToServer(".scroll-up", "scrollDown");
clickToServer(".tab-control__refresh", "browserReload");

/**Universal - for comp */

clickToServer(".general-control__turn-off", "computerDisable")

// /**python */
clickToServer(".zoom-plus", "browserZoomPlus");
clickToServer(".zoom-minus", "browserZoomMinus");
clickToServer(".tab-control__close", "browserTabClose");
clickToServer(".tab-control__right", "browserTabRight");
clickToServer(".tab-control__left", "browserTabLeft");
clickToServer(".volume-control__full-screen", "youtubeFullScreen");
