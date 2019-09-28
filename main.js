const url = require("url");
const path = require("path");
const electron = require('electron');
const {app, ipcMain, BrowserWindow, session, dialog} = require('electron')
var fs = require('fs');

let win;
app.on ("ready",function(){
  // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 800,
        'use-content-size': true,});
  // and load the index.html of the app.
  win.loadURL(url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true
  }));
});

//app.on('ready', createWindow)