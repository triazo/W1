'use strict';

const fs = require('fs');

var startingFile = "file:///C:/Users/adam/Pictures/Walls/Wallpapers/Akame_ga_kill/05bd40ff23e384abdf20135b7133a8cb.png"
var activeFiles = []
var currentIndex = 0;

////////////////////////////////////////
// Filename utilities
function dirname(url) {
    // The 10 here will vary depending on platform :/
    url = url.substring(7);
    return url.substring(0, url.lastIndexOf('/'));
}

function activateDir(directory) {
    activeFiles = []
    // Stupid 'substring' required by windows
    var files = fs.readdirSync(directory.substring(3))
    var len = files.length
    for (var i = 0; i < len; i++) {
	if (files[i].match(/\.(jpg|jpeg|png|gif|webm)$/)) {
	    activeFiles.push("file://" + directory + "/" + files[i])
	}
    }
    console.log(activeFiles)
}

function loadImage(path) {
    document.getElementById("photo").src = path;
}

////////////////////////////////////////
// JS WHY IS THIS NECESSARY
function mod(n, m) {
    return ((n % m) + m) % m;
}

function nextImage() {
    currentIndex += 1;
    loadImage(activeFiles[mod(currentIndex,activeFiles.length)]);
}

function previousImage() {
    currentIndex -= 1;
    loadImage(activeFiles[mod(currentIndex,activeFiles.length)]);
    }

function toggleHelp() {
    var hDiv = document.getElementById("help");
    if (hDiv.style.display == "block") {
	hDiv.style.display = "none";
    }
    else {
	hDiv.style.display = "block";
    }
}

function keyHandler(event) {
    console.log(event.keyCode);

    // Keycodes:
    // 112: F1
    if (event.keyCode == 112) {
	toggleHelp()
    }

    // 122: F11
    // 70:  F

    // 39: Right
    if (event.keyCode == 39) {
	nextImage();
    }
    // 37: Left
    if (event.keyCode == 37) {
	previousImage();
    }
}

function main() {
    console.log("Running Main");
    loadImage(startingFile);
    activateDir(dirname(startingFile));
    // This may be janky. Requires full url and all that jazz
    currentIndex = activeFiles.indexOf(startingFile)
}

document.onkeydown = keyHandler;
window.onload = main;
