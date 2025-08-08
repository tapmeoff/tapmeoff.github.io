document.getElementById("tapMeOff").addEventListener("click", (event) => tapMeOff());
document.getElementById("playPrev").addEventListener("click", (event) => playPrev());
document.getElementById("setting").addEventListener("click", (event) => openSettings());
document.getElementById("dimmer").addEventListener("click", (event) => closeSettings());

const a = document.getElementById("audio");

const darkmode = document.getElementById("darkmode");
darkmode.addEventListener("change", (event) => setMode());
const SPENCER = document.getElementById("SPENCER");
SPENCER.addEventListener("change", (event) => spence());

const sheet = document.getElementById("sheet");
const disable = document.getElementById("disable");
const beyonce = document.getElementById("beyonce");
const clave = document.getElementById("clave");
const cooper = document.getElementById("cooper");
const crunchtime = document.getElementById("crunchtime");
const eltigre = document.getElementById("eltigre");
const jamaica = document.getElementById("jamaica");
const mouth = document.getElementById("mouth");
const ocp = document.getElementById("ocp");
const speed = document.getElementById("speed");

let tracks = [];
let prev = "";

let debug = true;

setMode();

function pauseUnpause() {
    if (a.paused) a.play();
    else a.pause();
}

function tap(name) {
    a.src = "tracks/" + name + ".mp3";
    a.play();
}

function openSettings() {
    document.getElementById("settings").style.visibility = "visible";
    document.getElementById("dimmer").style.visibility = "visible";
}

function closeSettings() {
    /* and also close music and stop it */
    document.getElementById("settings").style.visibility = "hidden";
    document.getElementById("dimmer").style.visibility = "hidden";
    hideSheet();
    audio.load();
}

function spence() {
    if (SPENCER.checked) {
        document.getElementById("tapMeOff").innerHTML = "TAP ME OFF, SPENCER";
        document.getElementById("playPrev").innerHTML = "PLAY PREVIOUS";
        document.getElementById("setting").innerHTML = "SETTINGS";
        document.getElementById("spencerImg").style.display = "inline";
    } else {
        document.getElementById("tapMeOff").innerHTML = "tap me off";
        document.getElementById("playPrev").innerHTML = "play previous";
        document.getElementById("setting").innerHTML = "settings";
        document.getElementById("spencerImg").style.display = "none";
    }
}

function showSheet(name) {
    document.getElementById("dimmer").style.visibility = "visible";
    if (name == "Beyonce") document.getElementById("beyonceSheet").style.visibility = "visible";
    else if (name == "Clave") document.getElementById("claveSheet").style.visibility = "visible";
    else if (name == "Cooper") document.getElementById("cooperSheet").style.visibility = "visible";
    else if (name == "CrunchTime") document.getElementById("crunchTimeSheet").style.visibility = "visible";
    else if (name == "ElTigre") document.getElementById("elTigreSheet").style.visibility = "visible";
    else if (name == "Jamaica") document.getElementById("jamaicaSheet").style.visibility = "visible";
    else if (name == "Mouth") document.getElementById("mouthSheet").style.visibility = "visible";
    else if (name == "OCP") document.getElementById("ocpSheet").style.visibility = "visible";
    else document.getElementById("speedSheet").style.visibility = "visible";
}

function hideSheet() {
    imgs = document.querySelectorAll("img");
    for (let i = 0; i < imgs.length; i++) imgs[i].style.visibility = "hidden";
    document.getElementById("dimmer").style.visibility = "hidden";
    if (SPENCER.checked) document.getElementById("spencerImg").style.visibility = "visible";
    else document.getElementById("spencerImg").style.visibility = "hidden";
}

function setMode() {
    if (darkmode.checked) {
        backgroundColor = "var(--blue)";
        tapColor = "var(--orange)";
        otherButtonColor = "white";
        otherButtonText = "var(--blue)";
    } else {
        backgroundColor = "white";
        tapColor = "var(--orange)";
        otherButtonColor = "var(--blue)";
        otherButtonText = "white";
    }
    document.querySelector("body").style.backgroundColor = backgroundColor;
    document.querySelector("#tapMeOff").style.backgroundColor = tapColor;
    document.querySelector("#tapMeOff").style.borderColor = tapColor;
    document.querySelector("#playPrev").style.backgroundColor = otherButtonColor;
    document.querySelector("#playPrev").style.borderColor = otherButtonColor;
    document.querySelector("#playPrev").style.color = otherButtonText;
    document.querySelector("#setting").style.backgroundColor = otherButtonColor;
    document.querySelector("#setting").style.borderColor = otherButtonColor;
    document.querySelector("#setting").style.color = otherButtonText;
}

function waitThenCheck() {
    /* if still playing, wait 100 ms then check again */
    if (a.ended == false) window.setTimeout(waitThenCheck, 100);
    /* if ended, then disable */ else {
        if (disable.checked) {
            if (tracks[num] == "Beyonce") beyonce.checked = false;
            else if (tracks[num] == "Clave") clave.checked = false;
            else if (tracks[num] == "Cooper") cooper.checked = false;
            else if (tracks[num] == "CrunchTime") crunchtime.checked = false;
            else if (tracks[num] == "ElTigre") eltigre.checked = false;
            else if (tracks[num] == "Jamaica") jamaica.checked = false;
            else if (tracks[num] == "Mouth") mouth.checked = false;
            else if (tracks[num] == "OCP") ocp.checked = false;
            else speed.checked = false;
        }
        hideSheet();
    }
}

function tapMeOff() {
    /* make list of tracks */
    tracks = [];
    if (beyonce.checked) tracks.push("Beyonce");
    if (clave.checked) tracks.push("Clave");
    if (cooper.checked) tracks.push("Cooper");
    if (crunchtime.checked) tracks.push("CrunchTime");
    if (eltigre.checked) tracks.push("ElTigre");
    if (jamaica.checked) tracks.push("Jamaica");
    if (mouth.checked) tracks.push("Mouth");
    if (ocp.checked) tracks.push("OCP");
    if (speed.checked) tracks.push("Speed");

    if (debug) console.log(tracks);

    /* choose random track from list */
    num = Math.floor(Math.random() * tracks.length);
    if (debug) console.log(num);

    /* show sheet music if requested */
    if (sheet.checked) showSheet(tracks[num]);
    
    /* show dimmer */
    document.getElementById("dimmer").style.visibility = "visible";

    /* play track */
    tap(tracks[num]);
    prev = tracks[num];

    /* disable track if requested and hide sheetMusic if necessary */
    waitThenCheck();
}

function playPrev() {
    tap(prev);
    if (debug) console.log(prev);
    
    /* show dimmer */
    document.getElementById("dimmer").style.visibility = "visible";

    /* show sheet music if requested */
    if (sheet.checked) showSheet(tracks[num]);

    /* disable track if requested and hide sheetMusic if necessary */
    waitThenCheck();
}
