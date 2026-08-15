const state = {
    view: {
        boxes: document.querySelectorAll(".box"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives-left"),
        startDiv: document.querySelector("#position-start"),
        gameOverDiv: document.querySelector("#position-gameover"),
        finalScore: document.querySelector("#final-score"),
        startBtn: document.querySelector("#start-button"),
        restartbtn:document.querySelector("#restart-button"),
    },
    values: {
        timerId: null,
        enemyVel: 1000,
        hitBox: null,
        baseScore: 0,
        enemypos: 0,
        timer: 60,
        counter: 1000,
        countDownId: null,
        lifeCounter: 3,
        gameRunning: false,
    },
    sounds:{
        hitSound: new Audio(`assets/audio/hit-sound.wav`),
        gameCompleted: new Audio(`assets/audio/gameCompleted.wav`),
        missSound: new Audio(`assets/audio/wrongHitSound.wav`),
    },
};
    function randomBox(){
        state.view.boxes.forEach((box) => {
            box.classList.remove("enemy", "enemy-hit")
        });
        
        let randomNumber = Math.floor(Math.random() * 9);
        state.values.enemypos = state.view.boxes[randomNumber];
        state.values.enemypos.classList.add("enemy");
        state.values.hitBox = state.values.enemypos.id;
    }
    function movement(){
        state.values.timerId = setInterval(randomBox, state.values.enemyVel)
    }
    function listenerhitEnemy(){
        state.view.boxes.forEach((box) => {
            box.addEventListener("mousedown", () => {
                if (!state.values.gameRunning) return;
                if (box.id === state.values.hitBox){
                    state.values.baseScore++;
                    state.view.score.textContent = state.values.baseScore;
                    state.values.enemypos.classList.remove("enemy");
                    sfx("hitSound");
                    state.values.enemypos.classList.add("enemy-hit");
                    state.values.hitBox = null;
                }
                else{
                    sfx("missSound")
                    state.values.lifeCounter--;
                    state.view.lives.textContent = state.values.lifeCounter;
                    stopGame()
                }
            }) 
        })
    }
    function timeLeft(){
        state.values.timer --;
        state.view.time.textContent = state.values.timer;
        stopGame()
    }
    function stopGame(){
        if(state.values.timer<=0 || state.values.lifeCounter <=0){
            sfx("gameCompleted");
            state.view.finalScore.textContent = state.values.baseScore;
            showdiv("gameOverDiv");
            reset();
        }
    }
    function sfx(soundName){
        let sound = state.sounds[soundName];
        sound.volume= .3;
        sound.currentTime = 0;
        sound.play();
    }
    function wrongHit(){
        let wrongHitAudio= new Audio("assets/audio/wrongHitSound.wav");
        wrongHitAudio.play();
    }
    function countDown(){
        state.values.countDownId = setInterval(timeLeft, state.values.counter)
    }
    function hiddediv(divhidden){
        state.view[divhidden]?.classList.add("hidden");
    }
    function showdiv(divshown){
        state.view[divshown]?.classList.remove("hidden");
    }

    function reset(){
        state.values.gameRunning = false;
        state.values.timer = 60;
        state.values.baseScore = 0;
        state.values.lifeCounter = 3;
        state.view.lives.textContent = state.values.lifeCounter;
        state.view.score.textContent = state.values.baseScore;
        clearInterval(state.values.timerId);
        clearInterval(state.values.countDownId);
        state.values.enemypos?.classList.remove("enemy", "enemy-hit");
    }
function main() {
    if(state.values.gameRunning == true){
    movement();
    countDown();
    stopGame();
    }
};
Object.values(state.sounds).forEach(audio => {
    audio.preload = "auto";
    audio.load();
});
listenerhitEnemy();
state.view.restartbtn.addEventListener("click", ()=>{
    hiddediv("gameOverDiv");
    state.values.gameRunning = true;
    main();
});
state.view.startBtn.addEventListener("click", ()=>{
    state.values.gameRunning = true;
    hiddediv("startDiv");
    main();
    }
);

