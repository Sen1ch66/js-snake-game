const playAgain = document.querySelector(".playAgain");
const scoreDisplay = document.querySelector(".scoreDisplay");
const scoreSpan = document.querySelector(".score");
const attemptSpan = document.querySelector(".attempt");
const loseword = document.createElement("span")
const startbutton = document.querySelector(".startbtn")
const loseMessage = document.querySelector('.loseMessage')
let intervalTime = 0;
const game = document.body
let currentSnake = [3, 2, 1, 0];
let width = 10;
const grid = document.querySelector(".grid");
let score = 0;
let attempt = 1
const nextAtt = document.createElement("p")
const popup = document.querySelector(".popup");
startbutton.addEventListener('click', function(){
  createBoard();
    startGame();
    timer();
    playAgain.addEventListener("click", ()=> {
        replay();
        newAttempt()
    });
    startbutton.remove()
})
function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 100; i++) {
      let div = document.createElement("div");
      div.classList.add("gameDiv")
      grid.appendChild(div);
    }
}
function startGame() {
    const squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    direction = 1;
    score = 0; 
    scoreSpan.textContent = score;
    intervalTime = 1000;
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
}
function moveSnake(squares) {
    game.addEventListener("keydown", (e) =>{
      e.preventDefault()
        switch(e.key){
          case ('ArrowUp'):{
            direction = -width
            break;
          }
          case ('ArrowDown'):{
            direction = +width
            break;
          }
          case ('ArrowLeft'):{
            direction = -1
            break;
          }
          case ('ArrowRight'):{
            direction = 1
          }
        }
    });
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}
function moveOutcome() {
    const attdiv = document.querySelector(".attemptdiv")
    let popup = document.querySelector(".popup");
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
      loseword.textContent = "Ви програли";
      loseword.classList.add("loseword")
      loseMessage.appendChild(loseword)
      popup.style.display = "flex";
      return clearInterval(interval);
    } else {
      moveSnake(squares);
    }
}
  function eatApple(squares, tail) {
    let speed = 0.8;
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple(squares);
      score++;
      scoreSpan.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcome, intervalTime);
    }
  }
function control(e) {
    if (e.keycode === 39) {
      direction = 1; 
    } else if (e.keycode === 38) {
      direction = -width; 
    } else if (e.keycode === 37) {
      direction = -1; 
    } else if (e.keycode === 40) {
      direction = +width;
    }
}
function randomApple(squares) {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}
function checkForHits(squares) {
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width <= 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
      return true;
    } else {
      return false;
    }
}
function replay() {
    createBoard();
    startGame();
    popup.style.display = "none";
    loseword.style.display = 'none';
}
function newAttempt() {
    attempt++;
    attemptSpan.textContent = attempt;
    nextAtt.textContent = `attempt ${attempt}`;
    attemptSpan.appendChild(nextAtt);
}
function timer() {
  const startTime = new Date().getTime();
  const timerElement = document.querySelector('#timer');

  const updateTimer = () => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;

      const hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000).toString().padStart(2, '0');

      timerElement.textContent = hours + ":"  + minutes + ":" + seconds;
  }
  setInterval(()=> updateTimer(), 1000)
}