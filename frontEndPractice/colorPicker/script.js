//VARIABLES
let currentHex = "";
let ansSquare = 0;

//GETTERS
const hexColor = document.getElementById("hexColor");
const square1 = document.getElementById("color1");
const square2 = document.getElementById("color2");
const square3 = document.getElementById("color3");
const resultText = document.getElementById("resultText");
const playBtn = document.getElementById("playBtn");

//SETTERS
square1.addEventListener("click", handleClick);
square2.addEventListener("click", handleClick);
square3.addEventListener("click", handleClick);

playBtn.addEventListener("click", resetGame);

//FUNCTIONS

function randomHex() {
  //Function takes nothing, returns a hexadecimal value.
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
}

function handleLoss() {
  //Handles the click of wrong square. Takes no input, changes resultText. No return.
  resultText.innerText = "Sorry, wrong square. Try again :)";
  resultText.style.display = "block";
  playBtn.style.display = "none";
}

function handleWin() {
  //Handles win. No input, no returns. Changes text and reveals button.

  resultText.innerText = "Congratulations, You Win!!";
  resultText.style.display = "block";
  playBtn.style.display = "block";
}

function handleClick(e) {
  //Handles the click of a square in the game
  let target = e.target.id.replace("color", "");

  if (target == ansSquare) {
    handleWin();
  } else {
    handleLoss();
  }
}

function resetGame() {
  resultText.style.display = "none";
  playBtn.style.display = "none";
  startGame();
}

function startGame() {
  currentHex = randomHex();
  //Gets a random number between 1 and 3

  ansSquare = Math.floor(Math.random() * 3 + 1);

  hexColor.innerText = currentHex;

  switch (ansSquare) {
    case (ansSquare = 1):
      square1.style.backgroundColor = currentHex;
      square2.style.backgroundColor = randomHex();
      square3.style.backgroundColor = randomHex();
      break;
    case (ansSquare = 2):
      square2.style.backgroundColor = currentHex;
      square1.style.backgroundColor = randomHex();
      square3.style.backgroundColor = randomHex();
      break;
    case (ansSquare = 3):
      square1.style.backgroundColor = randomHex();
      square2.style.backgroundColor = randomHex();
      square3.style.backgroundColor = currentHex;
  }
}

//FUNCTION CALLS

startGame();
