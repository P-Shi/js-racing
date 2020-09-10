const startBtn = document.querySelector('.start'),
    score = document.querySelector('.score'),
    stopBtn = document.querySelector('.stop'),
    gameArea = document.querySelector('.gameArea')
    game = document.querySelector('.game'),
    car = document.createElement('div');

car.classList.add('car');

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrorRight: false,
    ArrowLeft: false
}

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
}

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement;
}

function startGame(event) {
    console.dir(gameArea.style);
    startBtn.classList.add('hide');

    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

   // stopBtn.classList.remove('hide');
    car.classList.remove('hide');

    for ( let i = 0; i <= getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.top = enemy.y + 'px';
        enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
        enemy.style.background = `transparent url(./image/enemy${random(3,0)}.png) center / cover no-repeat`;
        gameArea.appendChild(enemy);
    }

    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;


    setting.roadBgY = 0;

    window.setInterval(function () {
        console.log(setting.roadBgY, game.style.backgroundPositionY);
        setting.roadBgY += (setting.speed);
        game.style.backgroundPositionY = setting.roadBgY + 'px';
        if (setting.roadBgY > gameArea.clientHeight) {
            setting.roadBgY = 0;
        }
    }, 17);

    requestAnimationFrame(playGame);
}

function playGame(){
    moveRoad();
    moveEnemy();

    if (setting.start === true) {

        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && (setting.x + (car.offsetWidth)) < gameArea.offsetWidth) {
            setting.x += setting.speed;
        }
        if (keys.ArrowUp && (setting.y - 10) > 0) {
            setting.y -= setting.speed;
        }
        if (keys.ArrowDown && (setting.y + car.offsetHeight + 10) < gameArea.offsetHeight) {
            setting.y += setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y+ 'px';

        requestAnimationFrame(playGame);
    }
}

function stopGame(event) {
    startBtn.classList.remove('hide');
   // stopBtn.classList.add('hide');
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

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach( (item) => { 
        item.y += setting.speed; item.style.top = item.y + 'px';
        if ( item.y > document.documentElement.clientHeight ) {
            item.y = -100;
        }
    } );
    
    
}

function moveEnemy() {
    let enemys = document.querySelectorAll('.enemy');
    enemys.forEach( (item) => { 
        item.y += setting.speed / 2; item.style.top = item.y + 'px';
        if ( item.y > document.documentElement.clientHeight ) {
            item.y = -75 * setting.traffic;
            item.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
            item.style.background = `transparent url(./image/enemy${random(3,0)}.png) center / cover no-repeat`;
        }
    } );
}

function random(max, min = 0) {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
}