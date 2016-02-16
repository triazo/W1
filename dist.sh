#!/bin/bash

mkdir -p dist/resources/app
cp node_modules/electron-prebuilt/dist/electron.exe dist/w1.exe
cp -r index.html logo.png logo.svg main.js window.js package.json style.css dist/resources/app
