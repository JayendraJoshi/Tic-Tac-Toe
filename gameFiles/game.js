function createBoardCell() {
  let div = document.createElement("div");

  (function styleDiv() {
    div.style.border = "1px solid black";
    div.style.flexGrow = "1";
    div.style.width = "100%";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
  })();

  function getDiv() {
    return div;
  }

  return {
    getDiv,
  };
}
const gameBoard = (function () {
  console.log(sessionStorage.getItem('player1Name'));
  console.log(sessionStorage.getItem('player2Name'));
  (function renderBoard() {
    const divContainer = document.createElement("div");
    divContainer.classList.add("div-container");

    for (let i = 0; i < 3; i++) {
      let divRowContainer = document.createElement("div");
      divRowContainer.classList.add(`row-${i}`);
      for (let j = 0; j < 3; j++) {
        let divChild = createBoardCell().getDiv();
        divChild.classList.add(`row-${i}`);
        divChild.classList.add(`num-${j}`);
        divChild.classList.add("cell");
        divRowContainer.appendChild(divChild);
      }
      divRowContainer.classList.add("row-container");
      divContainer.appendChild(divRowContainer);
    }
    const main = document.querySelector("main");
    main.appendChild(divContainer);
  })();
})();
function createPlayer(name, id, token) {
  return { name, id, token };
}
const handlePlayers = function (player1, player2) {
  const players = [player1, player2];
  const divDisplayer = handleDisplayDiv();
  const handleHomeButton = handleHomeAndResetButton().showHomeButton;
  let activePlayer = players[0];
  function getActivePlayer() {
    return activePlayer;
  }
  function setActivePlayer(player) {
    activePlayer = player;
    divDisplayer.displayDiv.textContent=`${activePlayer.name}'s turn (${activePlayer.token})`;
  }
  function switchPlayerTurn() {
    if (getActivePlayer() === players[0]) {
      setActivePlayer(players[1]);
    } else {
      setActivePlayer(players[0]);
    }
  }
  function displayWinner(number) {
    console.log(`${players[number].name} has won!`);
    divDisplayer.displayDiv.textContent=`${players[number].name} has won!`;
    handleHomeButton();
  }
  return {
    getActivePlayer,
    setActivePlayer,
    switchPlayerTurn,
    displayWinner,
  };
};
const handleGameLogic = function () {
  const cells = document.querySelectorAll(".cell");
  const playersHandler = handlePlayers(player1, player2);
  const divDisplayer = handleDisplayDiv();
  function getArrayFromCells() {
    const cellsArray = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const cell = document.querySelector(`.row-${i}.num-${j}`);
        row.push(cell.textContent);
      }
      cellsArray.push(row);
    }
    return cellsArray;
  }
  function areThereCellsLeft() {
    const boardWithCellValues = getArrayFromCells();
    for (let i = 0; i < boardWithCellValues.length; i++) {
      for (let j = 0; j < boardWithCellValues[i].length; j++) {
        if (boardWithCellValues[i][j] === "") {
          return true;
        }
      }
    }
    divDisplayer.displayDiv.textContent="No empty cells left, it's a tie!";
    console.log("No empty cells left, it's a tie!");
    return false;
  }
  function isTheGameOver() {
    const boardWithCellValues = getArrayFromCells();
    if (
      boardWithCellValues[0][0] === "X" &&
      boardWithCellValues[0][1] === "X" &&
      boardWithCellValues[0][2] === "X"
    ) {
      playersHandler.displayWinner(0);
    } else if (
      boardWithCellValues[0][0] === "O" &&
      boardWithCellValues[0][1] === "O" &&
      boardWithCellValues[0][2] === "O"
    ) {
      playersHandler.displayWinner(1);
    } else if (
      boardWithCellValues[0][0] === "X" &&
      boardWithCellValues[1][0] === "X" &&
      boardWithCellValues[2][0] === "X"
    ) {
      playersHandler.displayWinner(0);
    } else if (
      boardWithCellValues[0][0] === "O" &&
      boardWithCellValues[1][0] === "O" &&
      boardWithCellValues[2][0] === "O"
    ) {
      playersHandler.displayWinner(1);
    } else if (
      boardWithCellValues[0][0] === "X" &&
      boardWithCellValues[1][1] === "X" &&
      boardWithCellValues[2][2] === "X"
    ) {
      playersHandler.displayWinner(0);
    } else if (
      boardWithCellValues[0][0] === "O" &&
      boardWithCellValues[1][1] === "O" &&
      boardWithCellValues[2][2] === "O"
    ) {
      playersHandler.displayWinner(1);
    } else if (
      boardWithCellValues[0][1] === "X" &&
      boardWithCellValues[1][1] === "X" &&
      boardWithCellValues[2][1] === "X"
    ) {
      playersHandler.displayWinner(0);
    } else if (
      boardWithCellValues[0][1] === "O" &&
      boardWithCellValues[1][1] === "O" &&
      boardWithCellValues[2][1] === "O"
    ) {
      playersHandler.displayWinner(1);
    } else if (
      boardWithCellValues[0][2] === "X" &&
      boardWithCellValues[1][1] === "X" &&
      boardWithCellValues[2][0] === "X"
    ) {
      playersHandler.displayWinner(0);
    } else if (
      boardWithCellValues[0][2] === "O" &&
      boardWithCellValues[1][1] === "O" &&
      boardWithCellValues[2][0] === "O"
    ) {
      playersHandler.displayWinner(1);
    } else if (
      boardWithCellValues[0][2] === "X" &&
      boardWithCellValues[1][2] === "X" &&
      boardWithCellValues[2][2] === "X"
    ) {
      playersHandler.displayWinner(0);
    } else if (
      boardWithCellValues[0][2] === "O" &&
      boardWithCellValues[1][2] === "O" &&
      boardWithCellValues[2][2] === "O"
    ) {
      playersHandler.displayWinner(1);
    } else if (
      boardWithCellValues[1][0] === "X" &&
      boardWithCellValues[1][1] === "X" &&
      boardWithCellValues[1][2] === "X"
    ) {
      playersHandler.displayWinner(0);
    } else if (
      boardWithCellValues[1][0] === "O" &&
      boardWithCellValues[1][1] === "O" &&
      boardWithCellValues[1][2] === "O"
    ) {
      playersHandler.displayWinner(1);
    } else if (
      boardWithCellValues[2][0] === "X" &&
      boardWithCellValues[2][1] === "X" &&
      boardWithCellValues[2][2] === "X"
    ) {
      playersHandler.displayWinner(0);
    } else if (
      boardWithCellValues[2][0] === "O" &&
      boardWithCellValues[2][1] === "O" &&
      boardWithCellValues[2][2] === "O"
    ) {
      playersHandler.displayWinner(1);
    } else {
      return false;
    }
    return true;
  }

  return {
    getArrayFromCells,
    areThereCellsLeft,
    isTheGameOver,
    cells,
  };
};
const handleGameControl = function (player1, player2) {
  const playerHandler = handlePlayers(player1, player2);
  const gameLogicHandler = handleGameLogic();

  const handleEventListeners = function () {
    function handleCellClick(event) {
      const div = event.target;
      div.textContent = playerHandler.getActivePlayer().token;
      printNewRound();
    }

    function setClickEventOnCells() {
      gameLogicHandler.cells.forEach((div) => {
        div.addEventListener("click", handleCellClick);
      });
    }

    function removeClickEventOnCells() {
      gameLogicHandler.cells.forEach((div) => {
        div.removeEventListener("click", handleCellClick);
      });
    }

    setClickEventOnCells();
    return {
      handleCellClick,
      setClickEventOnCells,
      removeClickEventOnCells,
    };
  };
  const eventHandler = handleEventListeners();

  const printNewRound = () => {
    playRound();
  };

  const playRound = () => {
    if (gameLogicHandler.isTheGameOver()) {
      eventHandler.removeClickEventOnCells();
      return;
    } else if (!gameLogicHandler.areThereCellsLeft()) {
      eventHandler.removeClickEventOnCells();
      return;
    }
    playerHandler.switchPlayerTurn();
    console.log(
      `${playerHandler.getActivePlayer().name}'s turn.(token = ${
        playerHandler.getActivePlayer().token
      })`
    );
  };
  return {
    printNewRound,
  };
};
const handleDisplayDiv = function(){
  const displayDiv = document.querySelector(".display");
  return{
    displayDiv
  }
}
const handleHomeAndResetButton = function(){
  const main = document.querySelector("main");
  function showHomeButton(){
    const homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.classList.add("homeButton");
    main.appendChild(homeButton);
    addEventListenerToHomeButton(homeButton);
  }
  function addEventListenerToHomeButton(homeButton){
    homeButton.addEventListener("click",function(event){
      window.location.href="index.html";
    })
  }

  return{
    showHomeButton
  }
}
const player1 = createPlayer(sessionStorage.getItem("player1Name"), 1, "X");
const player2 = createPlayer(sessionStorage.getItem("player2Name"), 2, "O");
const game = handleGameControl(player1, player2);
game.printNewRound();
