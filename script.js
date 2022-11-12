let playerHeader = document.getElementById("playerHeader");
let resetBtn = document.getElementById("resetBtn");

let player1 = "X";
let player2 = "O";
let currentPlayer = player1;
//X will start the game when the page is first loaded
let turnCount = 0;
//A variable keeps track of turn count to determine when a tie should occur

const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];
//Each cell on the 3x3 playing field has an imaginary number associated with it
//This array of arrays holds the possible combinations of filled cells to reach a 'win'
//Meaning there are 3 cells containing the same value in either a horizontal, vertical, or diagonal line

let tableCells = document.querySelectorAll("tr>td");
console.log(tableCells);

for (var i = 0; i < tableCells.length; i++) {
  tableCells[i].addEventListener("click", cellClicked, { once: true });
  //An event listener is added to each table cell
  //The once:true property will only let the event trigger once per cell
}

function cellClicked() {
  if (currentPlayer == player1) {
    this.innerText = currentPlayer;
    turnCount++;
    if (checkWinner(currentPlayer)) {
      console.log(`${currentPlayer} wins!`);
      declareWinner(currentPlayer);
    }

    console.log(turnCount);
    currentPlayer = player2;
    //The loser goes first next game
    playerHeader.innerText = currentPlayer + "'s turn";
  } else {
    currentPlayer = player2;
    this.innerText = currentPlayer;
    turnCount++;
    if (checkWinner(currentPlayer)) {
      console.log(`${currentPlayer} wins!`);
      declareWinner(currentPlayer);
    }

    console.log(turnCount);
    currentPlayer = player1;
    //Even though a winner is declared, the loser will go first next game
    playerHeader.innerText = currentPlayer + "'s turn";
  }

  /*   if (checkWinner(currentPlayer)) {
    console.log(`${currentPlayer} wins!`);
    console.log(playerHeader);
    playerHeader.innerText = "Winner!";
  } */
}

function checkWinner(player) {
  let isWinner = false;
  //Create a variable to easily tell if there's a winner
  //By default nobody is a winner

  isWinner = winStates.some((w) =>
    w.every((s) => tableCells[s].innerText == player)
  );
  //First check if a player has reached a win state

  if (turnCount == 9 && isWinner == false) {
    //Then if there is no player in a win state
    //AND the turn count is 9
    //A tie is declared, as a 3x3 grid will permit 9 turns
    //Before all cells are occupied
    playerHeader.innerText = "Tie Game!";

    let alert = document.createElement("div");
    let alertText = document.createTextNode("Tie Game! Reset to play again.");
    alert.classList.add("alert", "alert-danger");
    alert.appendChild(alertText);

    // let parent = document.getElementById("container");
    let child = document.getElementById("playerHeader");
    container.insertBefore(alert, child);

    currentPlayer = player2;
    //In the event of a tie, player 2 goes first next game.
    //I could randomize this but it's simpler to hard code who starts
  }
  return isWinner;
  //This function compares the board state to the list of 'win states'
  //That are defined in an array within this document
  //If the current board state is the same as any of the win states
  //Then this function will return true
  //Meaning the player parameter passed in wins the current game

  //After 9 turns the game will either be a draw or a win.
  //A winner is checked before a draw is, to prevent edge cases
  //Where a player wins by filling the last cell
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  for (let i = 0; i < tableCells.length; i++) {
    tableCells[i].innerText = "-";
    tableCells[i].addEventListener("click", cellClicked, { once: true });
    var j = tableCells[i];
  }

  $(".alert").alert("close");

  //This closes the bootstrap alert displaying who won
  turnCount = 0;
}

function declareWinner(player) {
  let alert = document.createElement("div");
  let alertText = document.createTextNode(
    `${player} wins! Reset to play again.`
  );
  alert.classList.add("alert", "alert-success");
  alert.appendChild(alertText);

  // let parent = document.getElementById("container");
  let child = document.getElementById("playerHeader");
  container.insertBefore(alert, child);

  for (var i = 0; i < tableCells.length; i++) {
    tableCells[i].removeEventListener("click", cellClicked, { once: true });
  }
}
