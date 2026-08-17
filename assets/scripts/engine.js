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
        restartbtn: document.querySelector("#restart-button"),
        radiolevel: document.querySelectorAll('input[name="level"]'),
        maxScore: document.querySelector("#max-score"),
    },
    values: {
        timerId: null,
        enemyVel: null,
        hitBox: null,
        baseScore: 0,
        enemypos: 0,
        timer: 60,
        counter: 1000,
        countDownId: null,
        lifeCounter: 3,
        gameRunning: false,
        selectedvel: null,

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
    };
    function movement(){
        state.values.enemyVel = setDifficulty();
        state.values.timerId = setInterval(randomBox, state.values.enemyVel)
    };
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
    };
    function timeLeft(){
        state.values.timer --;
        state.view.time.textContent = state.values.timer;
        stopGame()
    };
    function stopGame(){
        if(state.values.timer<=0 || state.values.lifeCounter <= 0){
            sfx("gameCompleted");
            state.view.finalScore.textContent = state.values.baseScore;
            showdiv("gameOverDiv");
            checkRecord();
            reset();
        }
    };
    function sfx(soundName){
        let sound = state.sounds[soundName];
        sound.volume= .3;
        sound.currentTime = 0;
        sound.play();
    };
    function wrongHit(){
        let wrongHitAudio= new Audio("assets/audio/wrongHitSound.wav");
        wrongHitAudio.play();
    };
    function countDown(){
        state.values.countDownId = setInterval(timeLeft, state.values.counter)
    };
    function hiddediv(divhidden){
        state.view[divhidden]?.classList.add("hidden");
    };
    function showdiv(divshown){
        state.view[divshown]?.classList.remove("hidden");
    };

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
        disableInput(false);
    };
    function setDifficulty(){
        state.values.selectedvel = document.querySelector('input[name="level"]:checked').value;
        let speed = null;
        if (state.values.selectedvel == "easy"){
            speed = 1000;
        }
        else if(state.values.selectedvel == "medium"){
            speed = 800;
        }
        else{
            speed = 500;
        }
        return speed;
    };
    function disableInput(disable){
        state.view.radiolevel.forEach((input) => {
            input.disabled = disable;
        });
    };
    function checkRecord(){
        let recordeAtual = Number(localStorage.getItem("highScore")) || 0;
        
        if (state.values.baseScore > recordeAtual){
            localStorage.setItem("highScore", state.values.baseScore);
        }
        
        displayRecord();
    };

    function displayRecord(){
        let recorde = Number(localStorage.getItem("highScore")) || 0;
        state.view.maxScore.textContent = recorde;
    };
function main() {
    if(state.values.gameRunning == true){
        setDifficulty()
        movement();
        countDown();
        stopGame();
        disableInput(true);
    }
};
Object.values(state.sounds).forEach(audio => {
    audio.preload = "auto";
    audio.load();
});
listenerhitEnemy();
displayRecord();
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

