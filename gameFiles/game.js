function createBoardCell() {
  let div = document.createElement("div");

  (function styleDiv() {
    div.style.border = "1px solid #F5CB5C";
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
const renderElements = (function () {
  const player1Name = sessionStorage.getItem("player1Name");
  const player2Name = sessionStorage.getItem("player2Name");
  const main = document.querySelector("main");
  const playersContainer = document.querySelector(".playersScoresContainer"); 
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
    main.appendChild(divContainer);
  })();
  (function renderPlayer1ScoreContainer() {
    const player1Container = document.createElement("div");
    player1Container.classList.add("player1Container")
    const player1H2 = document.createElement("h2");
    player1H2.textContent = player1Name;
    player1H2.classList.add("player1Name");

    const score = document.createElement("div");
    score.classList.add("scoreCounter");
    score.textContent = "0";

    player1Container.appendChild(player1H2);
    player1Container.appendChild(score);
    playersContainer.appendChild(player1Container);
  })();
  (function renderPlayer2ScoreContainer() {
    const player2Container = document.createElement("div");
    player2Container.classList.add("player2Container")
    const player2H2 = document.createElement("h2");
    player2H2.textContent = player2Name;
    player2H2.classList.add("player2Name");

    const score = document.createElement("div");
    score.classList.add("scoreCounter");
    score.textContent = "0";

    player2Container.appendChild(player2H2);
    player2Container.appendChild(score);
    playersContainer.appendChild(player2Container);
  })();
  (function renderGameDisplay() {
    const displayContainer = document.createElement("div");
    displayContainer.classList.add("display");
    main.appendChild(displayContainer);
  })();
  (function renderReturnButton() {
    const controlElementsButtonsContainer =document.querySelector(".controlElementsButtonsContainer");
    const returnButton = document.createElement("button");
    returnButton.classList.add("returnButton");
    returnButton.textContent = "Homescreen";
    controlElementsButtonsContainer.appendChild(returnButton);
  })();
  (function resetScoreButton(){
    const controlElementsButtonsContainer =document.querySelector(".controlElementsButtonsContainer");
    const resetButton = document.createElement("button");
    resetButton.classList.add("resetButton");
    resetButton.textContent="Reset Score";
    controlElementsButtonsContainer.appendChild(resetButton);
  })();
  (function renderNewRoundButton() {
    const newRoundButton = document.createElement("button");
    const controlElementsButtonsContainer =document.querySelector(".controlElementsButtonsContainer");
    newRoundButton.textContent = "New Round";
    newRoundButton.classList.add("newRoundButton");
    newRoundButton.classList.add("invisible");
   controlElementsButtonsContainer.appendChild(newRoundButton);
  })();
})();
function createPlayer(name, token) {
  return { name, token };
}
const handlePlayers = function (player1, player2) {
  const players = [player1, player2];
  const divDisplay = getDisplayDiv();
  let activePlayer = players[0];
  function getFirstPlayer() {
    return players[0];
  }
  function getActivePlayer() {
    return activePlayer;
  }
  function setActivePlayer(player) {
    activePlayer = player;
    divDisplay.textContent = `${activePlayer.name}'s turn (${activePlayer.token})`;
  }
  function switchPlayerTurn() {
    if (getActivePlayer() === players[0]) {
      setActivePlayer(players[1]);
    } else {
      setActivePlayer(players[0]);
    }
  }
  function displayWinner() {
    divDisplay.textContent = `${getActivePlayer().name} has won!`;
  }
  function displayTie(){
    divDisplay.textContent = "No empty cells left, it's a tie!";
  }
  return {
    getActivePlayer,
    setActivePlayer,
    switchPlayerTurn,
    displayWinner,
    getFirstPlayer,
    displayTie,
  };
};
const handleGameLogic = function () {
  const cells = document.querySelectorAll(".cell");
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
    return false;
  }
  function isTheCellAlreadyMarked(div) {
    if (div.textContent != "") {
      return true;
    }
  }
  function hasSomeoneWon() {
    const boardWithCellValues = getArrayFromCells();
    if (
      (boardWithCellValues[0][0] === "X" &&
        boardWithCellValues[0][1] === "X" &&
        boardWithCellValues[0][2] === "X") ||
      (boardWithCellValues[0][0] === "O" &&
        boardWithCellValues[0][1] === "O" &&
        boardWithCellValues[0][2] === "O") ||
      (boardWithCellValues[0][0] === "X" &&
        boardWithCellValues[1][0] === "X" &&
        boardWithCellValues[2][0] === "X") ||
      (boardWithCellValues[0][0] === "O" &&
        boardWithCellValues[1][0] === "O" &&
        boardWithCellValues[2][0] === "O") ||
      (boardWithCellValues[0][0] === "X" &&
        boardWithCellValues[1][1] === "X" &&
        boardWithCellValues[2][2] === "X") ||
      (boardWithCellValues[0][0] === "O" &&
        boardWithCellValues[1][1] === "O" &&
        boardWithCellValues[2][2] === "O") ||
      (boardWithCellValues[0][1] === "X" &&
        boardWithCellValues[1][1] === "X" &&
        boardWithCellValues[2][1] === "X") ||
      (boardWithCellValues[0][1] === "O" &&
        boardWithCellValues[1][1] === "O" &&
        boardWithCellValues[2][1] === "O") ||
      (boardWithCellValues[0][2] === "X" &&
        boardWithCellValues[1][1] === "X" &&
        boardWithCellValues[2][0] === "X") ||
      (boardWithCellValues[0][2] === "O" &&
        boardWithCellValues[1][1] === "O" &&
        boardWithCellValues[2][0] === "O") ||
      (boardWithCellValues[0][2] === "X" &&
        boardWithCellValues[1][2] === "X" &&
        boardWithCellValues[2][2] === "X") ||
      (boardWithCellValues[0][2] === "O" &&
        boardWithCellValues[1][2] === "O" &&
        boardWithCellValues[2][2] === "O") ||
      (boardWithCellValues[1][0] === "X" &&
        boardWithCellValues[1][1] === "X" &&
        boardWithCellValues[1][2] === "X") ||
      (boardWithCellValues[1][0] === "O" &&
        boardWithCellValues[1][1] === "O" &&
        boardWithCellValues[1][2] === "O") ||
      (boardWithCellValues[2][0] === "X" &&
        boardWithCellValues[2][1] === "X" &&
        boardWithCellValues[2][2] === "X") ||
      (boardWithCellValues[2][0] === "O" &&
        boardWithCellValues[2][1] === "O" &&
        boardWithCellValues[2][2] === "O")
    ) {
      return true;
    } else {
      return false;
    }
  }
  return {
    getArrayFromCells,
    areThereCellsLeft,
    hasSomeoneWon,
    isTheCellAlreadyMarked,
    cells,
  };
};
const handleGameControl = function (player1, player2) {
  const playerHandler = handlePlayers(player1, player2);
  const gameLogicHandler = handleGameLogic();
  const divDisplay = getDisplayDiv();
  const newRoundButton = document.querySelector(".newRoundButton");

  const handleEventListeners = function () {
    function handleCellClick(event) {
      const div = event.target;
      if (gameLogicHandler.isTheCellAlreadyMarked(div)) {
        return;
      }
      playRound(div);
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

    function setClickEventOnReturnButton() {
      const returnButton = document.querySelector(".returnButton");
      returnButton.addEventListener("click", function () {
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 300);
      });
    }

    function setClickEventOnNewRoundButton() {
      newRoundButton.addEventListener("click", function () {
        gameLogicHandler.cells.forEach((div) => {
          div.textContent = "";
          div.addEventListener("click", handleCellClick);
        });
        newRoundButton.classList.add("invisible");
        startDialog();
      });
    }
    function setClickOnResetButton(){
      const resetButton = document.querySelector(".resetButton");
      resetButton.addEventListener("click",()=>{
        resetCounter();
      })
    }
    
    setClickEventOnReturnButton();
    setClickEventOnCells();
    setClickEventOnNewRoundButton();
    setClickOnResetButton();
    return {
      handleCellClick,
      setClickEventOnCells,
      removeClickEventOnCells,
    };
  };
  const eventHandler = handleEventListeners();
  function resetCounter(){
    const scoreCounter1 = document.querySelector(
      ".player1Container > .scoreCounter"
    );
    const scoreCounter2 = document.querySelector(
      ".player2Container> .scoreCounter"
    );
    scoreCounter1.textContent="0";
    scoreCounter2.textContent="0";
  }
  function increaseCounter() {
    const winner = playerHandler.getActivePlayer();
    if (winner.name === document.querySelector(".player1Name").textContent) {
      const scoreCounter = document.querySelector(
        ".player1Container > .scoreCounter"
      );
      scoreCounter.textContent = parseInt(scoreCounter.textContent) + 1;
    } else {
      const scoreCounter = document.querySelector(
        ".player2Container > .scoreCounter"
      );
      scoreCounter.textContent = parseInt(scoreCounter.textContent) + 1;
    }
  }

  function checkIfGameCanContinue() {
    if (gameLogicHandler.hasSomeoneWon()) {
      playerHandler.displayWinner();
      increaseCounter();
      eventHandler.removeClickEventOnCells();
      newRoundButton.classList.remove("invisible");
      return false;
    } else if (!gameLogicHandler.areThereCellsLeft()) {
      playerHandler.displayTie();
      eventHandler.removeClickEventOnCells();
      newRoundButton.classList.remove("invisible");
      return false;
    }
    return true;
  }

  const playRound = function (div) {
    div.textContent = playerHandler.getActivePlayer().token;
    if (!checkIfGameCanContinue()) {
      /*handleHomeButton();*/
      return;
    }
    playerHandler.switchPlayerTurn();
  };
  const startDialog = () => {
    divDisplay.textContent = `${playerHandler.getFirstPlayer().name}'s turn (${
      playerHandler.getFirstPlayer().token
    })`;
  };

  return {
    startDialog,
  };
};
function getDisplayDiv() {
  return document.querySelector(".display");
}

const player1 = createPlayer(sessionStorage.getItem("player1Name"), "X");
const player2 = createPlayer(sessionStorage.getItem("player2Name"), "O");
const game = handleGameControl(player1, player2);
game.startDialog();
