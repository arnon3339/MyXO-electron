"use strict";
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
let win;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../html/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.on('closed', () => {
        win = null;
    });
}
module.exports = function startAppp() {
    app.on('ready', createWindow);
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    app.on('activate', () => {
        if (win === null) {
            createWindow();
        }
    });
};
//# sourceMappingURL=app.js.map