import {Nttd} from "./nttd/nttd.js";



document.addEventListener('DOMContentLoaded', function () {

    let canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("nttd");
    let nttd = new Nttd(canvas, 10);
    document.addEventListener("mousemove", mouseMoveHandler, false)
    nttd.startGame();
  nttd.run()
    function mouseMoveHandler(e) {
        let rect = e.target.getBoundingClientRect();
        nttd.userCircle.xPosition = e.clientX - rect.left;
        nttd.userCircle.yPosition = e.clientY - rect.top;
    }

});
