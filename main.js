'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Declare mainWindow globally
var mainWindow = null;

app.on('window-all-closed', function() {
    app.quit();
});

function keyHandler(event) {
    // Copied from stackOverflow, WHAT DOES THIS LINE DO???
    event = event || window.event;

    console.log(event.keyCode);
}

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    // so __dirname is just known to be a glabal constant? Nice going
    // js
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
	// somehow you're deleting something without executing
	// code. Nice going js
	mainWindow = null;
    });

    console.log("Main window initilized\n");
});
