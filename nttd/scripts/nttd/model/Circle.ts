export class Circle {
    ballRadius: number;
    ctx: CanvasRenderingContext2D;
    xPosition: number;
    yPosition: number;
    xVector: number;
    yVector: number;
    fillStile: string;
    quarantineTime: number;


    constructor(ballRadius: number, ctx: CanvasRenderingContext2D, xPosition: number, yPosition: number, xVector: number, yVector: number, fillStile: string) {
        this.ballRadius = ballRadius;
        this.ctx = ctx;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.xVector = xVector;
        this.yVector = yVector;
        this.fillStile = fillStile;
        this.quarantineTime = 0;
    }

    draw: () => void = () => {
        this.ctx.beginPath();
        this.ctx.arc(this.xPosition, this.yPosition, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.fillStile;
        this.ctx.fill();
        this.ctx.closePath();
    }
}
