document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener("mousemove", mouseMoveHandler, false)
    let canvas = document.getElementById("nttd");
    let ctx = canvas.getContext("2d");
    let ballRadius = 5;
    let x = canvas.width - ballRadius;
    let y = canvas.height - ballRadius;
    let circles = [];
    let count = 10;
    let dx = 1;
    let dy = -1;
    let illColor = "#cd3333";
    let healColor = "#9bcd9b";
    let userCircle = getCircle();
    let form = document.getElementById("counter");
    form.onchange = countBalls;

    function countBalls() {
        count = form.value;
        circles = [];
        fillcircles();
    }

    function fillcircles() {
        for (let i = 0; i < count; i++) {
            circles[i] = getCircle();
            console.log(circles[i]);
        }

    }

    function mouseMoveHandler(e) {
        let rect = e.target.getBoundingClientRect();
        userCircle.x = e.clientX - rect.left;
        userCircle.y = e.clientY - rect.top;
    }

    function getCircle() {
        return {
            ballRadius: ballRadius,
            ctx: ctx,
            x: Math.random() * x + ballRadius,
            y: Math.random() * y + ballRadius,
            dx: dx,
            dy: dy,
            fillStile: healColor,
            move: function () {
                ctx.beginPath();
                ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2);
                ctx.fillStyle = this.fillStile;
                ctx.fill();
                ctx.closePath();
            },
            changeVector: function () {
                this.dx = -this.dx;
                this.dy = -this.dy;
            }
        }
    }

    function drawBall(circle) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = circle.fillStile;
        ctx.fill();
        ctx.closePath();
    }

    function separate(circle) {
        let separatedCircles = circles.filter(circle1 => circle1 !== circle)
        for (let i = 0; i < separatedCircles.length; i++) {
            if (circle.x > separatedCircles[i].x - 50 && circle.x < separatedCircles[i].x + ballRadius + 50 &&
                circle.y > separatedCircles[i].y - 50 && circle.y < separatedCircles[i].y + ballRadius + 50) {
                if (circle.fillStile === illColor || separatedCircles[i].fillStile === illColor) {
                    circle.fillStile = illColor;
                    separatedCircles[i].fillStile = illColor;
                }
                circle.x += circle.dx;
                circle.y += circle.dy;
            }
        }
        if (circle.x > userCircle.x - 50 && circle.x < userCircle.x + ballRadius + 50 &&
            circle.y > userCircle.y - 50 && circle.y < userCircle.y + ballRadius + 50) {
            circle.x += circle.dx;
            circle.fillStile = userCircle.fillStile;
            if (Math.random() > 0.5) circle.y += circle.dy;
        }
    }


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall(userCircle);
        for (let i = 0; i < circles.length; i++) {
            separate(circles[i]);
            if (circles[i].x + circles[i].dx > canvas.width - ballRadius ||
                circles[i].x + circles[i].dx < ballRadius) {
                circles[i].dx = -circles[i].dx;
                if (Math.random() > 0.5) circles[i].dy = -circles[i].dy;
            }
            if (circles[i].y + circles[i].dy > canvas.height - ballRadius ||
                circles[i].y + circles[i].dy < ballRadius) {
                circles[i].dy = -circles[i].dy;
                if (Math.random() > 0.5) circles[i].dx = -circles[i].dx;
            }
            circles[i].move();
        }
    }

    fillcircles();
    userCircle.fillStile = illColor;
    setInterval(draw, 5);
});

