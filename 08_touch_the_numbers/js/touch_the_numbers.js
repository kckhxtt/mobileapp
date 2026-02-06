// 課題05-06 tic_tac_toeのjsをbaseに使用してください。
// 98_Time guessing quiz のjs からもコードをコピーすると早く出来上がりますよ！
"use strict";

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let startTime;
let timeoutid;
let stopTiime = 0;
setButtonStateInitial();

let counter = 0;
const squares = document.getElementsByClassName("square");
const squaresArray = Array.from("squares");

//squaresの要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const a_4 = document.getElementById("a_4");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const b_4 = document.getElementById("b_4");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");
const c_4 = document.getElementById("c_4");
const d_1 = document.getElementById("d_1");
const d_2 = document.getElementById("d_2");
const d_3 = document.getElementById("d_3");
const d_4 = document.getElementById("d_4");


//message
const msgtxt1 = '<p class= "text animate__animated animate__rubberBand">Push Start!!</p>';
const msgtxt2 = '<p class="text animate__bounceIn">Hurry Up!!</p>';
const msgtxt3 = '<p class="text animate__animated animate__heartBeat">Hurry Up!!!!!!!</p>';
const msgtxt4 = '<p class="text animate__animated animate__rollIn">Clear!!</p>';

//sound
let gameSound = [
    "sound/start.mp3",
    "sound/stop.mp3",
    "sound/reset.mp3",
    "sound/ok.mp3",
    "sound/ng.mp3"
];


window.addEventListener("DOMContentLoaded",
    function () {
        setMessage("start");
        let squaresBox = document.getElementById("squaresBox")
        squaresBox.classList.add("js-unclickable");
        squaresBox.style.backgroundColor = "grey";
    }, false
);

squaresArray.forEach(function (square) {
    square.addEventListener("click", () => {
        isSelect(square);
    });
});

function isSelect(selectSquare) {
    if (counter == 7) {
        setMessage("hurryup1");
    }
    if (counter == 12) {
        setMessage("hurryup2");
    }

    let w_id = selectSquare.getAttribute("id");
    let w_num = document.getElementById(w_id).innerHTML

    if (w_num == counter + 1) {
        let music = new Audio(gameSound[3]);
        music.currentTime = 0;
        music.play();
        selectSquare.style.color = "grey";
        counter++;
    }
    else {
        let music = new Audio(gameSound[4]);
        music.currentTime = 0;
        music.play();
    }

    if (counter === 16) {
        gameOver();
    }
}

function setMessage(id) {
    switch (id) {
        case "start":
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;
        case "hurryup1":
            document.getElementById("msgtext").innerHTML = msgtxt2;
            break;
        case "hurryup2":
            document.getElementById("msgtext").innerHTML = msgtxt3;
            break;
        case "game_over":
            document.getElementById("msgtext").innerHTML = msgtxt4;
            break;
        default:
            document.getElementById("msgtext").innerHTML = msgtxt1;
    }
}
function gameOver() {
    setMessage("game_over");

    let squaresBox = document.getElementById("squaresBox")
    squaresBox.classList.add("js-unclickable");
    squaresBox.style.backgroundColor = "rgba(128,128,128,0.5)";

    let music = new Audio(gameSound[1]);
    music.currentTime = 0;
    music.play();

    $(document).snowfall({
        flakeColor: "rgb(255,240,245)",
        maxSpeed: 3,
        minSpeed: 1,
        maxSize: 20,
        minSize: 10,
        image: "img/star.png"
    });

    setButtonStateStopped();
    clearTimeout(timeoutid);
    stopTiime = Date.now() - startTime;
}

let arrNum;
let arrId;
let numArr;
let numSquareId;

function randominzing() {
    arrNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    numArr = [];
    numSquareId = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

    for (let i = 0, arrLen = arrNum.length; i < 16; i++, arrLen--) {
        let rndNum = Math.floor(Math.random() * arrLen);
        numArr.push(arrNum[rndNum]);
        arrNum[rndNum] = arrNum[arrLen - 1];
    }

    for (let i = 0; i < 16; i++) {
        let resultId = numArr.indexOf(i + 1)
        numSquareId[resultId] = arrId[resultId]
        document.getElementById(arrId[i]).innerHTML = numArr[i];
    }
}

start.addEventListener("click",
    function () {
        setMessage("hurryup1");
        let squaresBox = document.getElementById("squaresBox")
        squaresBox.classList.remove("js-unclickable");
        squaresBox.style.backgroundColor = "";

        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

        randominzing();

        startTime = Date.now();
        setButtonStateRunning();
        countUp();
    }, false
);

stop.addEventListener("click",
    function () {
        let squaresBox = document.getElementById("squaresBox")
        squaresBox.classList.add("js-unclickable");

        setButtonStateStopped();
        clearTimeout(timeoutid);
        stopTiime = Date.now() - startTime;

        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

    }, false
);

reset.addEventListener("click",
    function () {
        setMessage("start");
        let squaresBox = document.getElementById("squaresBox")
        squaresBox.classList.add("js-unclickable");
        squaresBox.style.backgroundColor = "grey";

        $(document).snowfall("clear");

        counter = o;
        let music = new Audio(gameSound[2]);
        music.currentTime = 0;
        music.play();

        setButtonStateInitial()
        timer.textContent = "00:00.000";
        stopTiime = 0;

        squaresArray.forEach(function (square) {
            square.style.color = "black";
            let w_id = square.getAttribute(id);
            document.getElementById(w_id).innerHTML = "";
            square.style.color = "#4a488e";
        });
    }
);

function countUp() {
    const d = new Date(Date.now() - startTime + stopTiime);
    const m = String(d.getMinutes()).padStart(2,"0");
    const s = String(d.getSeconds()).padStart(2,"0");
    const ms = String(d.getMilliseconds()).padStart(3,"0");
    timer.textContent = '${m}:${s}.${ms}';

    timeoutid = setTimeout(() => {
        countUp();
    },10);
}

function setButtonStateInitial() {
    start.classList.remove("js-inactive");
    stop.classList.add("js-inactive");
    reset.classList.add("js-inactive");
    start.classList.remove("js-unclickable");
    stop.classList.add("js-unclickable");
    reset.classList.add("js-unclickable");
}

function setButtonStateRunning() {
    start.classList.add("js-inactive");
    stop.classList.remove("js-inactive");
    reset.classList.add("js-inactive");
    start.classList.add("js-unclickable");
    stop.classList.remove("js-unclickable");
    reset.classList.add("js-unclickable");
}

function setButtonStateStopped() {
    start.classList.add("js-inactive");
    stop.classList.add("js-inactive");
    reset.classList.remove("js-inactive");
    start.classList.add("js-unclickable");
    stop.classList.add("js-unclickable");
    reset.classList.remove("js-unclickable");

}
