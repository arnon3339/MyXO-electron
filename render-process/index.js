"use strict";
const { dialog, app } = require('electron').remote;
const { remote } = require('electron');
const parentWindow = remote.BrowserWindow.getAllWindows()[0];
let winCond = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let count = 0;
let isX;
const body = document.body;
const appRoot = document.getElementsByTagName("APP-ROOT")[0];
const bigBox = document.createElement("div");
const smallBox = document.createElement("div");
bigBox.id = "box1";
smallBox.id = "box2";
smallBox.className = "small-box";
appRoot.appendChild(bigBox);
addBoxEvent();
function addBoxEvent() {
    isX = true;
    if (bigBox.childElementCount === 0) {
        for (let i = 0; i < 9; i++) {
            bigBox.appendChild(smallBox.cloneNode());
            bigBox.children[i].id = `${i}`;
        }
    }
    else {
        for (let i = 0; i < 9; i++) {
            bigBox.children[i].innerHTML = "";
            bigBox.children[i].className = "small-box";
            bigBox.children[i].id = `${i}`;
        }
    }
    for (let i = 0; i < 9; i++) {
        bigBox.children[i].addEventListener("click", flipXO);
    }
}
function flipXO(event) {
    {
        let text;
        let target = event.target;
        if (isX) {
            text = "X";
            target.className = "x-clicked";
            target.innerHTML = text;
            isX = false;
        }
        else {
            text = "O";
            target.className = "o-clicked";
            target.innerHTML = text;
            isX = true;
        }
        checkWinner(bigBox, text, target);
    }
}
let options = {
    buttons: ["Rematch", "Quit", "Cancel"],
    message: ""
};
let noWinOptions = {
    buttons: ["Rematch", "Quit"],
    message: "Noone is winner!!!"
};
const checkWinner = (Object, text, Object2) => {
    let response;
    count++;
    for (let v of winCond) {
        let win = 0;
        for (let w of v) {
            if (Object.children[w].innerHTML === text)
                win++;
            if (win === 3) {
                options.message = `${text} is the winner.`;
                response = dialog.showMessageBox(parentWindow, options, (response) => {
                    switch (response) {
                        case 0: {
                            count = 0;
                            addBoxEvent();
                            break;
                        }
                        case 1: {
                            app.quit();
                        }
                        case 2: {
                            break;
                        }
                    }
                });
                return;
            }
        }
    }
    Object2.removeEventListener("click", flipXO);
    if (count == 9) {
        response = dialog.showMessageBox(parentWindow, noWinOptions, (response) => {
            switch (response) {
                case 0: {
                    count = 0;
                    addBoxEvent();
                    break;
                }
                case 1: {
                    app.quit();
                }
            }
        });
    }
};
//# sourceMappingURL=index.js.map