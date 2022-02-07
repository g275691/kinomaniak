const volumeIndicatorHTML = `Громкость
<div class="volume-scale">
    <div class="volume-scale__item"></div>
    <div class="volume-scale__item"></div>
    <div class="volume-scale__item"></div>
    <div class="volume-scale__item"></div>
    <div class="volume-scale__item"></div>
    <div class="volume-scale__item"></div>
    <div class="volume-scale__item"></div>
    <div class="volume-scale__item"></div>
    <div class="volume-scale__item"></div>
    <div class="volume-scale__item"></div>  
</div>`;

const volumeIndicatorCSS =
`display: flex;
background: #c9c6c6;
align-items: center;
width:30%;
position: fixed;
left: 25%; 
top: 85%;
border-radius: 6px;
font-size: 17px;
padding: 0.6% 2%;
pointer-events: none;
opacity: 0;
transition: all 0.1s ease-in
`

const volumeScaleCSS = 
`display: flex;
align-items: center;
width: 100%;
height: 25px;
background: rgb(108, 108, 192);
margin: 0% 5%;
margin-right: -1%;
border-radius: 6px;`

const volumeScaleItemCSS =
`width: 10%;
height: 90%;
margin: 0% 0.5%;
background: #a8a7a7;
opacity: 0;
transition: all 0.1s ease-in;`

const setVolumeIndicator = () => {
    const volumeIndicator = document.createElement("div");
    volumeIndicator.className = "volume-indicator";
    document.body.appendChild(volumeIndicator);
    volumeIndicator.innerHTML = volumeIndicatorHTML;

    volumeIndicator.style = volumeIndicatorCSS;
    document.querySelector(".volume-scale").style = volumeScaleCSS;
    document.querySelectorAll(".volume-scale__item").forEach(el=>el.style=volumeScaleItemCSS);
}