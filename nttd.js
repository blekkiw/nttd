document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener("mousemove", mouseMoveHandler, false)
    let canvas = document.getElementById("nttd");
    let ctx = canvas.getContext("2d");
    let ballRadius = 5;
    let x = canvas.width / 2;
    let y = canvas.height /2 ;
    let circles =[];
    let count = 100;
    let dx = 1;
    let dy = -1;
    let quarantine = false;
    let userCircle = getCircle();

    function fillcircles() {
        for (let i = 0; i < count; i++) {
            circles[i]=getCircle();
            console.log(circles[i]);
        }

    }

    function mouseMoveHandler(e) {
        let rect = e.target.getBoundingClientRect();
        userCircle.x = e.clientX-rect.left;
        userCircle.y = e.clientY-rect.top;
    }

    function getCircle() {
        return {
            ballRadius: ballRadius,
            ctx: ctx,
            x: Math.random()*x+ballRadius,
            y: Math.random()*y+ballRadius,
            dx: dx,
            dy: dy,
            quarantine: quarantine,
            move: function () {
                ctx.beginPath();
                ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }

    function drawBall(circle) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function separate(circle) {
        let filterdCircles = circles.filter(filteredCircle => filteredCircle!==circle)
        filterdCircles.forEach(item => {
            if (circle.x > item.x-50 && circle.x < item.x+ballRadius+50 &&
                circle.y > item.y-50 && circle.y < item.y+ballRadius+50) {
                item.dx = -item.dx;
                item.dy = - item.dy;
                circle.dx = -circle.dx;
                circle.dy = -circle.dy;
            }

        })
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall(userCircle);
        for (let i = 0; i <circles.length ; i++) {

            if (circles[i].x + circles[i].dx > canvas.width - ballRadius ||
                circles[i].x + circles[i].dx < ballRadius) {
                circles[i].dx = -circles[i].dx;
                if (Math.random()>0.5) circles[i].dy = -circles[i].dy;
            }
            if (circles[i].y + circles[i].dy > canvas.height - ballRadius ||
                circles[i].y + circles[i].dy < ballRadius ) {
                circles[i].dy = -circles[i].dy;
                if (Math.random()>0.5) circles[i].dx = -circles[i].dx;
            }
            let inCuar = (circles[i].x > userCircle.x-50 && circles[i].x < userCircle.x+ballRadius+50 &&
                circles[i].y > userCircle.y-50 && circles[i].y < userCircle.y+ballRadius+50) ;
            if(inCuar && circles[i].quarantine) {
                circles[i].dx = -circles[i].dx;
                circles[i].dy = -circles[i].dy;
                while (circles[i].quarantine) {
                    circles[i].x += circles[i].dx;
                    circles[i].y += circles[i].dy;
                    if (inCuar) circles[i].quarantine = false;
                }
            } else circles[i].quarantine = true;
            circles[i].x += circles[i].dx;
            circles[i].y += circles[i].dy;
            circles[i].move();
        }
    }

    fillcircles();
        setInterval(draw, 5);
});

