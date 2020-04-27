import { Nttd } from "./nttd/nttd.js";
document.addEventListener('DOMContentLoaded', function () {
    let canvas = document.getElementById("nttd");
    let countBalls = 10;
    let nttd;
    let count = document.getElementById("count");
    document.getElementById("startButton").addEventListener("click", runGame);
    count.onchange = changeCountBalls;
    let infoElement = document.getElementById("info");
    let canvasWrapper = document.getElementById("canvas-wrap");
    function changeCountBalls() {
        countBalls = parseInt(count.value);
    }
    function mouseMoveHandler(e) {
        let rect = e.target.getBoundingClientRect();
        nttd.userCircle.xPosition = e.clientX - rect.left;
        nttd.userCircle.yPosition = e.clientY - rect.top;
    }
    function stopGame() {
        setTimeout(closeCanvas, 5000);
    }
    function closeCanvas() {
        infoElement.style.display = "flex";
        canvasWrapper.style.visibility = "hidden";
        canvasWrapper.style.opacity = "0";
        infoElement.style.opacity = "1";
        infoElement.style.visibility = "visible";
    }
    function openCanvas() {
        infoElement.style.visibility = "hidden";
        infoElement.style.opacity = "0";
        canvasWrapper.style.opacity = "1";
        canvasWrapper.style.visibility = "visible";
    }
    function runGame() {
        openCanvas();
        setTimeout(function () {
            infoElement.style.display = "none";
        }, 1000);
        document.addEventListener("mousemove", mouseMoveHandler, false);
        nttd = new Nttd(canvas, countBalls);
        let engine;
        engine = setInterval(() => {
            if (!nttd.run(nttd)) {
                clearInterval(engine);
                stopGame();
            }
        }, 5);
    }
    function canvasNormalize() {
        let mainContent = document.getElementsByClassName("canvas-wrap")[0];
        infoElement.style.width = mainContent.offsetWidth - 50 + 'px';
        infoElement.style.height = mainContent.offsetHeight - 50 + 'px';
        canvas.width = mainContent.offsetWidth - 50;
        canvas.height = mainContent.offsetHeight - 50;
        infoElement.style.top = '-' + infoElement.style.height;
    }
    canvasNormalize();
});
