let score = 0;
let box = document.getElementById('box');
let scoreDisplay = document.getElementById('score');
let gameArea = document.getElementById('gameArea');

function getRandomPosition() {
    let x = Math.floor(Math.random() * (gameArea.clientWidth - 50));
    let y = Math.floor(Math.random() * (gameArea.clientHeight - 50));
    return { x: x, y: y };
}

function moveBox() {
    let newPosition = getRandomPosition();
    box.style.left = newPosition.x + 'px';
    box.style.top = newPosition.y + 'px';
}

box.addEventListener('click', function() {
    score++;
    scoreDisplay.textContent = score;
    moveBox();
    box.style.transition = 'all 0.5s ease';
    box.style.transform = `scale(${1 + score / 10})`;
    box.style.transitionDuration = `${Math.max(0.1, 0.5 - score / 20)}s`;
});

moveBox();