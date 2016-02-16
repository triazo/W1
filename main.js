'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Declare mainWindow globally
var mainWindow = null;

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 1600,
				    height: 900,
				    icon: "logo.png"});
    // so __dirname is just known to be a glabal constant? Nice going
    // js
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();
    mainWindow.myargs = process.argv
    mainWindow.setMenu(null);
    mainWindow.on('closed', function() {
	// somehow you're deleting something without executing
	// code. Nice going js
	mainWindow = null;
    });

    console.log("Main window initilized\n");
});
