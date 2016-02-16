'use strict';

// Imports
const fs = require('fs');
const remote = require('electron').remote;
const process = require('process');


// Global variables
var startingFile = "file:///C:/Users/adam/Pictures/Walls/Wallpapers/Akame_ga_kill/05bd40ff23e384abdf20135b7133a8cb.png";
var activeFiles = [];
var currentIndex = 0;
var mainWindow = null;

////////////////////////////////////////
// Filename utilities
function dirname(url) {
    // The 7 here will vary depending on platform :/
    url = url.substring(7);
    return url.substring(0, url.lastIndexOf('/'));
}

function basename(url) {
    return url.substring(url.lastIndexOf('/')+1);
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

function deleteImage() {
    // Should probably cache this but oh well
    var f = activeFiles[currentIndex].replace(/\\/g,'/')
    console.log(f)
    console.log(dirname(activeFiles[currentIndex]).substring(1))
    if (!fs.existsSync(dirname(activeFiles[currentIndex]).substring(1) + '/bad')) {
	fs.mkdirSync(dirname(activeFiles[currentIndex]).substring(1) + '/bad');
    }
    fs.renameSync(f.substring(8), dirname(f).substring(1) + '/bad/' + basename(f))

    // Reload the page
    activateDir(dirname(f))
    loadImage(activeFiles[mod(currentIndex, activeFiles.length)+1])
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

function toggleFullscreen() {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
}

function keyHandler(event) {
    console.log(event.keyCode);

    // Keycodes:
    // 112: F1
    if (event.keyCode == 112) {
	toggleHelp();
    }

    // 122: F11
    // 70:  F
    if (event.keyCode == 70 || event.keyCode == 122) {
	toggleFullscreen();
    }

    // 39: Right
    if (event.keyCode == 39) {
	nextImage();
    }
    // 37: Left
    if (event.keyCode == 37) {
	previousImage();
    }

    // 46: Delete
    if (event.keyCode == 46) {
	deleteImage();
    }
}

function main() {
    console.log("Running Main");
    mainWindow = remote.getCurrentWindow()
    console.log(mainWindow.myargs)
    if (mainWindow.myargs[1].match(/\.(jpg|jpeg|png|gif|webm)$/)) {
	startingFile = "file:///" + mainWindow.myargs[1].replace(/\\/g, '/')
    }
    loadImage(startingFile);
    activateDir(dirname(startingFile));
    // This may be janky. Requires full url and all that jazz
    currentIndex = activeFiles.indexOf(startingFile)
}

document.onkeydown = keyHandler;
window.onload = main;
