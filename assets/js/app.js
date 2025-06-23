const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Set canvas dimensions to maximum 430 x 932
const screenWidth = Math.min(window.innerWidth, 430);
const screenHeight = Math.min(window.innerHeight, 932);
canvas.width = screenWidth;
canvas.height = screenHeight;

// Load images
const gameBG = new Image();
gameBG.src = './assets/img/game-bg.png';

const player = new Image();
player.src = './assets/img/flappy-leclerc.png';

const playerSize = 100;
let bgX = 0;
let speed = 2;
let playerX = (screenWidth / 2) - playerSize / 2;
let playerY = (screenHeight / 2) - playerSize / 2;
let velocityY = 0;
const gravity = 0.5;

// Wait for both images to load
let assetsLoaded = 0;
function tryStartGame() {
    assetsLoaded++;
    if (assetsLoaded === 2) {
        startGameLoop();
    }
}

// Store the animation loop's ID
let animationID;

gameBG.onload = tryStartGame;
player.onload = tryStartGame;

function startGameLoop() {
    function draw() {
        // Update positions
        bgX -= speed;
        if (bgX <= -screenWidth) bgX = 0;

        velocityY += gravity;
        playerY += velocityY;

        // Prevent falling through the floor
        if (playerY + playerSize >= screenHeight) {
            playerY = screenHeight - playerSize;
            velocityY = 0;
        }
        // Prevent player from going above screen
        if (playerY < 0) {
            playerY = 0;
            velocityY = 0;
        }

        // Clear entire canvas
        context.clearRect(0, 0, screenWidth, screenHeight);

        // Draw background
        context.drawImage(gameBG, bgX, 0, screenWidth, screenHeight);
        context.drawImage(gameBG, bgX + screenWidth, 0, screenWidth, screenHeight);

        // Draw player
        context.drawImage(player, playerX, playerY, playerSize, playerSize);

        animationID = requestAnimationFrame(draw);
    }

    draw();
}

function stopGameLoop() {
    cancelAnimationFrame(animationID);
}

window.addEventListener('keydown', (event) => {
    console.log(event.code);
    switch(event.code) {
        case 'Space':
            velocityY = -8; // Apply upward force
            break;
        case 'Escape':
            stopGameLoop();
            break;
        case 'Enter':
            stopGameLoop();
            startGameLoop();
            break;
    }
});
window.addEventListener('touchstart', () => {
    velocityY = -8; // Apply upward force
});  
