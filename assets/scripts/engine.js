const state = {
    view: {
        boxes: document.querySelectorAll(".box"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives-left"),
        startDiv: document.querySelector("#position-start"),
        startBtn: document.querySelector("#start-button"),
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
    }
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
                    sfx("hit-sound.wav");
                    state.values.enemypos.classList.add("enemy-hit");
                    state.values.hitBox = null;
                }
                else{
                    sfx("wrongHitSound.wav")
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
            alert("Game over! Your score: " +state.values.baseScore);
            sfx("gameCompleted.wav");
            reset();
        }
    }
    function sfx(soundName){
        let audioHit= new Audio(`assets/audio/${soundName}`);
        audioHit.volume= .3;
        audioHit.play();
    }
    function wrongHit(){
        let wrongHitAudio= new Audio("assets/audio/wrongHitSound.wav");
        wrongHitAudio.play();
    }
    function countDown(){
        state.values.countDownId = setInterval(timeLeft, state.values.counter)
    }
    function hiddeStartDiv(){
        state.view.startDiv.classList.add("hidden")
    }
    function showStartDiv(){
        state.view.startDiv.classList.remove("hidden")
    }
    function reset(){
        state.values.timer = 60;
        state.values.baseScore = 0;
        state.values.lifeCounter = 3;
        state.view.lives.textContent = state.values.lifeCounter;
        state.view.score.textContent = state.values.baseScore;
        state.values.gameRunning = false;
        showStartDiv();
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
listenerhitEnemy();
state.view.startBtn.addEventListener("click", ()=>{
    state.values.gameRunning = true;
    hiddeStartDiv();
    main();
    }
);

