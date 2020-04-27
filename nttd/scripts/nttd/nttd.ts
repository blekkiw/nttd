import {Circle} from "./model/Circle.js";


export class Nttd {
    canvas : HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    ballRadius : number = 5;
    circles = [];
    count : number;
    xVector : number = 1;
    yVector : number = -1;
    illColor : string = "#cd3333";
    healColor : string = "#9bcd9b";
    userCircle : Circle;
    engine : number;

    constructor(canvas: HTMLCanvasElement, count: number) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.count = count;
        this.circles = this.fillCircles(this.count);
        this.userCircle = new Circle(this.ballRadius, this.ctx, this.positionGenerator()[0], this.positionGenerator()[1],
            this.xVector, this.yVector, this.illColor);
    }


    public startGame () {
        console.log(this.canvas)
        console.log(this)
       this.engine = setInterval(this.run, 5)
    }

    public run () {
        console.log(this.canvas)
        console.log(this)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.userCircle.draw();
    }


    private mouseMoveHandler(e) {

    }

    private positionGenerator () {
        let startX = (Math.random()*this.canvas.width-this.ballRadius)+this.ballRadius;
        let startY = (Math.random()*this.canvas.height-this.ballRadius)+this.ballRadius;
        return [startX,startY]
    }

    private fillCircles(count: number) {
        let circles: Circle [] = [];
        for (let i = 0; i <count ; i++) {
            circles.push(new Circle(this.ballRadius, this.ctx, this.positionGenerator()[0], this.positionGenerator()[1],
                this.xVector, this.yVector, this.healColor));
        }
        return circles;
    }
}
