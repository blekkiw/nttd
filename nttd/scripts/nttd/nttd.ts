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

    constructor(canvas: HTMLCanvasElement, count: number) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.count = count;
        this.circles = this.fillCircles(this.count);
        this.userCircle = new Circle(this.ballRadius, this.ctx, this.positionGenerator()[0], this.positionGenerator()[1],
            this.xVector, this.yVector, this.illColor);
    }




    public run (nttd : Nttd) {
        nttd.ctx.clearRect(0, 0, nttd.canvas.width, nttd.canvas.height);
        nttd.userCircle.draw();
        for (let circle of nttd.circles) {
            let tempX = circle.xPosition;
            let tempY = circle.yPosition;
            nttd.separate(circle);
            if (circle.xPosition + circle.xVector > nttd.canvas.width - nttd.ballRadius ||
                circle.xPosition + circle.xVector < nttd.ballRadius) {
                circle.xVector = -circle.xVector;
                if (Math.random() > 0.5) circle.yVector = -circle.yVector;
            }
            if (circle.yPosition + circle.yVector > nttd.canvas.height - nttd.ballRadius ||
                circle.yPosition + circle.yVector < nttd.ballRadius) {
                circle.yVector = -circle.yVector;
                if (Math.random() > 0.5) circle.xVector = -circle.xVector;
            }
            if (tempX === circle.xPosition && tempY === circle.yPosition) circle.quarantineTime++;
            if (circle.quarantineTime > 1000) {
                circle.quarantineTime = 0;
                circle.fillStile = nttd.healColor;
            }

            circle.draw();
        }
        return nttd.circles.filter(circle => circle.fillStile === nttd.illColor).length !== nttd.circles.length;

    }

    private separate(circle : Circle) {
        let separatedCircles = this.circles.filter(circle1 => circle1 !== circle)
        for (let separatedCircle of separatedCircles) {
            if (circle.xPosition > separatedCircle.xPosition - 50 && circle.xPosition < separatedCircle.xPosition + this.ballRadius + 50 &&
                circle.yPosition > separatedCircle.yPosition - 50 && circle.yPosition < separatedCircle.yPosition + this.ballRadius + 50) {
                if (circle.fillStile === this.illColor || separatedCircle.fillStile === this.illColor) {
                    circle.fillStile = this.illColor;
                    separatedCircle.fillStile = this.illColor;
                }
                circle.xPosition += circle.xVector;
                circle.yPosition += circle.yVector;
            }
        }
        if (circle.xPosition > this.userCircle.xPosition - 50 && circle.xPosition < this.userCircle.xPosition + this.ballRadius + 50 &&
            circle.yPosition > this.userCircle.yPosition - 50 && circle.yPosition < this.userCircle.yPosition + this.ballRadius + 50) {
            circle.xPosition += circle.xVector;
            circle.fillStile = this.userCircle.fillStile;
            circle.yPosition += circle.yVector;
        }
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
