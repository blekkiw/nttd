export class Circle {
    constructor(ballRadius, ctx, xPosition, yPosition, xVector, yVector, fillStile) {
        this.draw = () => {
            this.ctx.beginPath();
            this.ctx.arc(this.xPosition, this.yPosition, this.ballRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.fillStile;
            this.ctx.fill();
            this.ctx.closePath();
        };
        this.ballRadius = ballRadius;
        this.ctx = ctx;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.xVector = xVector;
        this.yVector = yVector;
        this.fillStile = fillStile;
        this.quarantineTime = 0;
    }
}
