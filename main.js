const startBtn = document.querySelector('.start'),
    score = document.querySelector('.score'),
    stopBtn = document.querySelector('.stop'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDonw: false,
    ArrorRight: false,
    ArrowLeft: false
}

const setting = {
    start: false,
    score: 0,
    speed: 0
}

function startGame(event) {
    startBtn.classList.add('hide');
    stopBtn.classList.remove('hide');
    car.classList.remove('hide');
    setting.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
}

function playGame(){
    console.log('Play');
    if (setting.start === true) {
        requestAnimationFrame(playGame);
    }
}

function stopGame(event) {
    startBtn.classList.remove('hide');
    stopBtn.classList.add('hide');
    car.classList.add('hide');
    setting.start = false;
    requestAnimationFrame(playGame);
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}