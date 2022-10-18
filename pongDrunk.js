document.addEventListener('DOMContentLoaded', () => {
    let canvas;
    let canvasContext;
    let ballX = 150;
    let ballY = 550/2;
    let bVX = 1.15;
    let bVY = 1.15;

    const pSize = 88;
    let paddleL = 0;
    let paddleR = 0;
    let paddleUp = 0;
    let paddleDown = 0;
    var lowScore = 0;
    var hiScore = 0;

    function mouseMove(evt) {
        let rect = canvas.getBoundingClientRect();
        let root = document.documentElement;
        let mouseX = evt.clientX - rect.left - root.scrollLeft;
        let mouseY = evt.clientY - rect.top - root.scrollTop;
        return {
            x:mouseX,
            y:mouseY
        };
    }

    window.onload = function() {
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        setInterval(function() {
            drawGame();
            moveGame();
        }, 1000/60);

        canvas.addEventListener('mousemove', 
            function(evt) {
                let mousePos = mouseMove(evt);
                paddleL = mousePos.x-44;
                paddleR = -mousePos.x+596;
                paddleUp = mousePos.y-44;
                paddleDown = -mousePos.y+596;
            })
    }

    function scoreReset() {
        lowScore -= lowScore;
    }

    function scoreCount() {
        setInterval(() => {
            Math.round(lowScore += 1);
        }, 100);
    } 

    function ballReset() {
        ballX = canvas.width/2;
        ballY = 150;
        if (bVX > 6 || bVX < -6) {
            bVX = 1.5;
        } else if (bVX > 3 || bVX < -3) {
            bVX = 1.75;
        } else {
            bVX = 1.15;
        }
        bVY = 1.15;
        if (lowScore > hiScore) {
            hiScore = lowScore;
        }
        scoreReset();
    }

    function moveGame() {
        // rPaddleMove();
        ballX += bVX;
        ballY += bVY;
        // if ball hits LEFT SIDE
        if (ballX < 22) {
            if (ballY > paddleL &&
                ballY < paddleL+88) {
                    if (lowScore == 0) {
                        scoreCount();
                    }
                    bVX = -bVX;
                    let deltaL = ballY - ((paddleL+pSize/2)-2);
                    bVY = deltaL *.11;
                    bVX *=1.05;
                    lowScore += 25;
                } 
            } if (ballX < -1) {
            ballReset();
            bVX = -bVX;;
        }
        // if ball hits RIGHT SIDE
        if (ballX > canvas.width-22) {
            if (ballY > paddleR &&
                ballY < paddleR+pSize) {
                    if (lowScore == 0) {
                        scoreCount();
                    }
                    bVX = -bVX;
                    let deltaR = ballY - ((paddleR+pSize/2)-2);
                    bVY = deltaR *.11;
                    bVX *=1.05;
                    lowScore += 25;
                }
            } if (ballX > canvas.width) {
                ballReset();
                bVX = -bVX;;
        }
        // if ball hits TOP SIDE
        if (ballY < 22) {
            if (ballX > paddleUp &&
                ballX < paddleUp+pSize) {
                    if (lowScore == 0) {
                        scoreCount();
                    }
                    bVY = -bVY;
                    let deltaU = ballX - ((paddleUp+pSize/2)-2);
                    bVX = deltaU *.11;
                    bVY *= 1.05;
                    lowScore += 25;
                } 
            } if (ballY < 0) {
            ballReset();
            bVX = -bVX;
            }
        // if ball hits BOTTOM SIDE
        if (ballY > canvas.height - 22) {
            if (ballX > paddleDown &&
                ballX < paddleDown+88) {
                    if (lowScore == 0) {
                        scoreCount();
                    }
                bVY = -bVY;
                let deltaD = ballX - ((paddleDown+pSize/2)-2);
                bVX = deltaD *.11;
                bVY *= 1.05;
                lowScore += 25;
                } 
            } if (ballY > canvas.height) {
            ballReset();
            bVX = -bVX;
        }
        // bVX += .5;
    }

    function drawGame() {
        colorRect(0, 0, canvas.width, canvas.height, 'black');
        // ball
        colorRect(ballX, ballY, 8, 8, 'white');
        // Left Paddle
        colorRect(10, paddleL, 12, 88, 'white');
        // Right Paddle (+220+canvas.height/2 for mirrored movement with mouse)
        colorRect(canvas.width-22, paddleR, 12, 88, 'white');
        // Top Paddle
        colorRect(paddleUp, 10, 88, 12, 'white');
        // Bottom Paddle
        colorRect(paddleDown, canvas.height-22, 88, 12, 'white');
        // Score Text
        canvasContext.fillText(`High Score: ${(hiScore)}`, 285, 150);
        canvasContext.fillText(`Current Score: ${(lowScore)}`, 280, 175);


    }
    // function to create canvas and game assets
    function colorRect(leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    }

})