'use strict';

const fs = require('fs');

var startingFile = "file:///C:/Users/adam/Pictures/Walls/1.jpg"
var activeFiles = []

////////////////////////////////////////
// Filename utilities
function dirname(url) {
    // The 10 here will vary depending on platform :/
    url = url.substring(10);
    return url.substring(0, url.lastIndexOf('/'));
}

function activateDir(directory) {
    activeFiles = []
    var files = fs.readdirSync(directory)
    var len = files.length
    for (var i = 0; i < len; i++) {
	if (files[i].match(/\.(jpg|jpeg|png|gif|webm)$/)) {
	    activeFiles.push("file://" + directory + "/" + files[i])
	}
    }
    console.log(activeFiles)
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


function loadImage(path) {
    document.getElementById("photo").src = path;
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
    // 37: Left
}

function main() {
    console.log("Running Main");
    loadImage(startingFile);
    activateDir(dirname(startingFile));
}

document.onkeydown = keyHandler;
window.onload = main;
