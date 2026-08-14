const state = {
    view: {
        boxes: document.querySelectorAll(".box"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        enemyVel: 1000,
        hitBox: 0,
        baseScore: 0,
        enemypos: 0,
        timer: 60,
        counter: 1000,
        countDownId: null,
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
                    state.values.hitBox = null;
                    state.values.enemypos.classList.remove("enemy");
                    state.values.enemypos.classList.add("enemy-hit");
                }
            }) 
        })
    }
    function timeLeft(){
        state.values.timer --;
        if(state.values.timer<=0){
            alert("Game over! Your score: " +state.values.baseScore);
            state.values.timer = 60;
        }
        state.view.time.textContent = state.values.timer;
    }
    function countDown(){
        state.values.countDownId = setInterval(timeLeft, state.values.counter)
    }
function main() {
    movement();
    listenerhitEnemy();
    countDown();
}

main();
