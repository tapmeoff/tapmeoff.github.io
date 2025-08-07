document.getElementById("generate").addEventListener("click", (event) => generate());
document.getElementById("playPrev").addEventListener("click", (event) => playPrev());

const a = document.getElementById("audio");

const sheet = document.getElementById("sheet");
const sheetMusic = document.getElementById("sheetMusic");
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

/* addEventListener("keypress", (event) => pauseUnpause()); */

function pauseUnpause() {
    if (a.paused) a.play();
    else a.pause();
}

function tap(name) {
    a.src = "tracks/" + name + ".mp3";
    a.play();
}

function waitThenDisable() {
    /* if still playing, wait 100 ms then check again */
    if (a.ended == false) window.setTimeout(waitThenDisable, 100);
    /* if ended, then disable */
    else {
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
}

function generate() {
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

    /* show or hide sheet music */
    if (sheet.checked) {
        sheetMusic.style.display = "block";
    } else sheetMusic.style.display = "none";

    /* play track */
    tap(tracks[num]);
    prev = tracks[num];

    /* disable track if requested */
    if (disable.checked) waitThenDisable();
}

function playPrev() {
    tap(prev);
    if (debug) console.log(prev);
}