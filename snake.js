const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    {x: 10, y: 10}
];
let food = {x: 15, y: 15};
let dx = 1;
let dy = 0;
let score = 0;

function drawGame() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize-2, gridSize-2);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize-2, gridSize-2);
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    if (
        snake[0].x < 0 || snake[0].x >= tileCount ||
        snake[0].y < 0 || snake[0].y >= tileCount ||
        snake.slice(1).some(segment => 
            segment.x === snake[0].x && segment.y === snake[0].y)
    ) {
        alert(`Game Over! Score: ${score}`);
        snake = [{x: 10, y: 10}];
        score = 0;
        dx = 1;
        dy = 0;
    }
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp': if (dy === 0) { dx = 0; dy = -1; } break;
        case 'ArrowDown': if (dy === 0) { dx = 0; dy = 1; } break;
        case 'ArrowLeft': if (dx === 0) { dx = -1; dy = 0; } break;
        case 'ArrowRight': if (dx === 0) { dx = 1; dy = 0; } break;
    }
});

setInterval(drawGame, 100);