const startBtnLevel1 = document.querySelector('.level1'),
    startBtnLevel2 = document.querySelector('.level2'),
    startBtnLevel3 = document.querySelector('.level3'),
    startBtnAll = document.querySelectorAll('.start'),
    best = document.querySelector('.best'),
    score = document.querySelector('.score'),
    stopBtn = document.querySelector('.stop'),
    gameArea = document.querySelector('.gameArea')
    game = document.querySelector('.game'),
    car = document.createElement('div');

car.classList.add('car');

startBtnLevel1.addEventListener('click', () => startGame(1));
startBtnLevel2.addEventListener('click', () => startGame(2));
startBtnLevel3.addEventListener('click', () => startGame(3));
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
    speed: [3,6,9],
    traffic: 3
}


function showBest() {
    if( localStorage.getItem('bestTotal') ) {
        best.querySelector('.total').textContent = localStorage.getItem('bestTotal');
        best.classList.remove('hide')
    }
}

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement;
}

function drawLine() {
    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }
}

const roadBgY = window.setInterval(function () {
    setting.roadBgY += (5);
    game.style.backgroundPositionY = setting.roadBgY + 'px';
    if (setting.roadBgY > gameArea.clientHeight) {
        setting.roadBgY = 0;
    }
}, 17);

showBest();
drawLine();

function startGame(level) {
    gameArea.innerHTML = '';
    car.style.left = '125px';
    car.style.top = 'auto'; 
    car.style.bottom = '10px';
    let speed = setting.speed[level-1];
 

    startBtnAll.forEach( (item) => item.disabled = true );

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

    drawLine();
    showBest();
    setting.score = 0;
    setting.start = true;

    setting.roadBgY = 0;
    
    roadBgY;

    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(() => playGame(speed));
}

function playGame(speed){
 
    moveRoad(speed);
    moveEnemy(speed);

    if (setting.start) {
        setting.score += speed;
        score.querySelector('.total').textContent = setting.score;

        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= speed;
        }
        if (keys.ArrowRight && (setting.x + (car.offsetWidth)) < gameArea.offsetWidth) {
            setting.x += speed;
        }
        if (keys.ArrowUp && (setting.y - 10) > 0) {
            setting.y -= speed;
        }
        if (keys.ArrowDown && (setting.y + car.offsetHeight + 10) < gameArea.offsetHeight) {
            setting.y += speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

        requestAnimationFrame(() => playGame(speed));
        
    } else {

       clearInterval(roadBgY);

    }
}

function stopGame(event) {
    //startBtn.classList.remove('hide');
    setting.start = false;
    startBtnAll.forEach( (item) => item.disabled = false );
   // stopBtn.classList.add('hide');
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

function moveRoad(speed) {
    let lines = document.querySelectorAll('.line');
    lines.forEach( (item) => { 
        item.y += speed; 
        item.style.top = item.y + 'px';
        if ( item.y > document.documentElement.clientHeight ) {
            item.y = -100;
        }
    } );
}

function moveEnemy(speed) {
    let enemys = document.querySelectorAll('.enemy');
    enemys.forEach( (item) => { 
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
        
        if (carRect.top <= enemyRect.bottom && 
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
    
                if ( Number(localStorage.getItem('bestTotal')) < Number(score.querySelector('.total').textContent)) {
                    localStorage.setItem('bestTotal', score.querySelector('.total').textContent);
                }
                stopGame();
        }

        item.y += speed / 2; 
        item.style.top = item.y + 'px';
        if ( item.y > document.documentElement.clientHeight ) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
            item.style.background = `transparent url(./image/enemy${random(3,0)}.png) center / cover no-repeat`;
        }
    });
}

function random(max, min = 0) {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
}