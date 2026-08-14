const state = {
    view: {
        boxes: document.querySelectorAll(".box"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives-left")
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
                if (box.id === state.values.hitBox){
                    state.values.baseScore++;
                    state.view.score.textContent = state.values.baseScore;
                    state.values.enemypos.classList.remove("enemy");
                    state.values.enemypos.classList.add("enemy-hit");
                    state.values.hitBox = null;
                }
                else{
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
            state.values.timer = 60;
            state.values.baseScore = 0
            state.values.lifeCounter = 3
            state.view.lives.textContent = state.values.lifeCounter;
            state.view.score.textContent = state.values.baseScore;
        }

    }
    function gameOver(){
        }
    function countDown(){
        state.values.countDownId = setInterval(timeLeft, state.values.counter)
    }
function main() {
    movement();
    listenerhitEnemy();
    countDown();
    stopGame();
}

main();
