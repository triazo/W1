'use strict';

function keyHandler(event) {
    console.log(event.keyCode);


    // Keycodes:
    // 112: F1

    // 122: F11
    // 70:  F

    // 39: Right
    // 37: Left
}

document.onkeydown = keyHandler;
