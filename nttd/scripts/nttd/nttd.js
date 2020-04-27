import { Circle } from "./model/Circle.js";
export class Nttd {
    constructor(canvas, count) {
        this.ballRadius = 5;
        this.circles = [];
        this.xVector = 1;
        this.yVector = -1;
        this.illColor = "#cd3333";
        this.healColor = "#9bcd9b";
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.count = count;
        this.circles = this.fillCircles(this.count);
        this.userCircle = new Circle(this.ballRadius, this.ctx, this.positionGenerator()[0], this.positionGenerator()[1], this.xVector, this.yVector, this.illColor);
    }
    startGame() {
        console.log(this.canvas);
        console.log(this);
        this.engine = setInterval(this.run, 5);
    }
    run() {
        console.log(this.canvas);
        console.log(this);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.userCircle.draw();
    }
    mouseMoveHandler(e) {
    }
    positionGenerator() {
        let startX = (Math.random() * this.canvas.width - this.ballRadius) + this.ballRadius;
        let startY = (Math.random() * this.canvas.height - this.ballRadius) + this.ballRadius;
        return [startX, startY];
    }
    fillCircles(count) {
        let circles = [];
        for (let i = 0; i < count; i++) {
            circles.push(new Circle(this.ballRadius, this.ctx, this.positionGenerator()[0], this.positionGenerator()[1], this.xVector, this.yVector, this.healColor));
        }
        return circles;
    }
}
