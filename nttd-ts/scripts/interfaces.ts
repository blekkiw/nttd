 export interface Circle {
    ballRadius: number,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    dx: number,
    dy: number,
    fillStile: string,
    quarantineTime: number,
    move: () => void
}
 export {};