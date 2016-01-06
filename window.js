'use strict';

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
    // 37: Left
}

document.onkeydown = keyHandler;
