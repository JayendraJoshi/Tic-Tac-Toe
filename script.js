function clearMainElement() {
  const main = document.querySelector("main");
  main.innerHTML = "";
}
const startPageModule = function () {
  clearMainElement();
  (function renderStartPage() {
    const form = document.createElement("form");
    const main = document.querySelector("main");
    const label1 = document.createElement("label");
    label1.setAttribute("for", "player1Input");
    label1.textContent = "Player1 (X)";

    const input1 = document.createElement("input");
    input1.setAttribute("id", "player1Input");
    input1.setAttribute("value", "Player 1");
    input1.required = true;
    label1.appendChild(input1);

    const label2 = document.createElement("label");
    label2.setAttribute("for", "player2Input");
    label2.textContent = "Player2 (O)";

    const input2 = document.createElement("input");
    input2.setAttribute("id", "player2Input");
    input2.setAttribute("value", "Player 2");
    input2.required = true;
    label2.appendChild(input2);
    
    const button = document.createElement("button");
    button.classList.add("startGameButton");
    button.type = "submit";
    button.textContent = "Start game";

    form.appendChild(label1);
    form.appendChild(label2);
    form.appendChild(button);

    main.appendChild(form);
    main.classList.remove("gamePageMain");
    main.classList.add("startPageMain");
  })();
  const handleFormEvent = (function () {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const player1 = document.getElementById("player1Input");
        const player2 = document.getElementById("player2Input");
        sessionStorage.setItem("player1Name", player1.value);
        sessionStorage.setItem("player2Name", player2.value);
        gamePageModule();
      });
    }
  })();
};
const gamePageModule = function () {
  clearMainElement();
  const renderGamePage = (function () {
    const player1Name = sessionStorage.getItem("player1Name");
    const player2Name = sessionStorage.getItem("player2Name");
    const main = document.querySelector("main");

    (function renderBoard() {
      const divContainer = document.createElement("div");
      divContainer.classList.add("rowsContainer");

      for (let i = 0; i < 3; i++) {
        let divRowContainer = document.createElement("div");
        for (let j = 0; j < 3; j++) {
          let divChild = document.createElement("div");
          divChild.classList.add("cell");
          divRowContainer.appendChild(divChild);
        }
        divRowContainer.classList.add("cellsContainer");
        divContainer.appendChild(divRowContainer);
      }
      main.appendChild(divContainer);
    })();
    (function renderGameDisplay() {
      const displayContainer = document.createElement("div");
      displayContainer.classList.add("gameStatusDisplay");
      main.appendChild(displayContainer);
    })();
    (function renderPlayerScoreElements() {
      const playersContainer = document.createElement("div");
      playersContainer.classList.add("scoreElementsContainer");
      (function renderPlayer1ScoreContainer() {
        const player1Container = document.createElement("div");
        player1Container.classList.add("player1ScoreContainer");
        const player1H2 = document.createElement("h2");
        player1H2.textContent = player1Name;
        player1H2.classList.add("playerName");

        const score = document.createElement("div");
        score.classList.add("scoreCounter");
        score.textContent = "0";

        player1Container.appendChild(player1H2);
        player1Container.appendChild(score);
        playersContainer.appendChild(player1Container);
      })();
      (function renderPlayer2ScoreContainer() {
        const player2Container = document.createElement("div");
        player2Container.classList.add("player2ScoreContainer");
        const player2H2 = document.createElement("h2");
        player2H2.textContent = player2Name;
        player2H2.classList.add("playerName");

        const score = document.createElement("div");
        score.classList.add("scoreCounter");
        score.textContent = "0";

        player2Container.appendChild(player2H2);
        player2Container.appendChild(score);
        playersContainer.appendChild(player2Container);
      })();
      (function renderScoreBoardTitle() {
        const scoreBoard = document.createElement("div");
        scoreBoard.classList.add("scoreElementsTitle");
        scoreBoard.textContent = "Score Board";
        main.appendChild(scoreBoard);
      })();
      main.appendChild(playersContainer);
    })();
    (function renderControlElements() {
      (function renderControlElementsTtile() {
        const controlBoard = document.createElement("div");
        controlBoard.classList.add("controlElementsTitle");
        controlBoard.textContent = "Control Elements";
        main.appendChild(controlBoard);
      })();
      (function renderControlElementsContainer() {
        const controlElementsContainer = document.createElement("div");
        controlElementsContainer.classList.add("controlElementsContainer");
        main.appendChild(controlElementsContainer);
      })();
      (function renderControlElementsButtonsContainer() {
        const controlElementsButtonsContainer = document.createElement("div");
        controlElementsButtonsContainer.classList.add(
          "controlElementsButtonsContainer"
        );
        const controlElementsContainer = document.querySelector(
          ".controlElementsContainer"
        );
        controlElementsContainer.appendChild(controlElementsButtonsContainer);
      })();
      (function renderstartPageButton() {
        const controlElementsButtonsContainer = document.querySelector(
          ".controlElementsButtonsContainer"
        );
        const returnButton = document.createElement("button");
        returnButton.classList.add("startPageButton");
        returnButton.textContent = "Start Page";
        controlElementsButtonsContainer.appendChild(returnButton);
      })();
      (function resetScoreButton() {
        const controlElementsButtonsContainer = document.querySelector(
          ".controlElementsButtonsContainer"
        );
        const resetButton = document.createElement("button");
        resetButton.classList.add("resetScoreButton");
        resetButton.textContent = "Reset Score";
        controlElementsButtonsContainer.appendChild(resetButton);
      })();
      (function renderNewRoundButton() {
        const newRoundButton = document.createElement("button");
        const controlElementsButtonsContainer = document.querySelector(
          ".controlElementsButtonsContainer"
        );
        newRoundButton.textContent = "New Round";
        newRoundButton.classList.add("newRoundButton");
        newRoundButton.classList.add("invisible");
        controlElementsButtonsContainer.appendChild(newRoundButton);
      })();
    })();
    main.classList.remove("startPageMain");
    main.classList.add("gamePageMain");
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
    function displayTie() {
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
    function get2DArrayOfTheTextContentOfCells() {
      const flatArrayOfTextContent = Array.from(cells).map(
        (cell) => cell.textContent
      );
      const result = [];
      for (let i = 0; i < flatArrayOfTextContent.length; i += 3) {
        const row = flatArrayOfTextContent.slice(i, i + 3);
        result.push(row);
      }
      return result;
    }
    function areThereCellsLeft() {
      const boardWithCellValues = get2DArrayOfTheTextContentOfCells();
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
      const boardWithCellValues = get2DArrayOfTheTextContentOfCells();
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
      get2DArrayOfTheTextContentOfCells,
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
      function setClickEventOnStartPageButton() {
        const returnButton = document.querySelector(".startPageButton");
        returnButton.addEventListener("click", function () {
          startPageModule();
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
      function setClickOnResetScoreButton() {
        const resetButton = document.querySelector(".resetScoreButton");
        resetButton.addEventListener("click", () => {
          resetCounter();
        });
      }
      setClickEventOnStartPageButton();
      setClickEventOnCells();
      setClickEventOnNewRoundButton();
      setClickOnResetScoreButton();
      return {
        handleCellClick,
        setClickEventOnCells,
        removeClickEventOnCells,
      };
    };
    const eventHandler = handleEventListeners();
    function resetCounter() {
      const scoreCounter1 = document.querySelector(
        ".player1ScoreContainer > .scoreCounter"
      );
      const scoreCounter2 = document.querySelector(
        ".player2ScoreContainer> .scoreCounter"
      );
      scoreCounter1.textContent = "0";
      scoreCounter2.textContent = "0";
    }
    function increaseCounter() {
      const winner = playerHandler.getActivePlayer();
      if (
        winner.name ===
        document.querySelector(".player1ScoreContainer > .playerName")
          .textContent
      ) {
        const scoreCounter = document.querySelector(
          ".player1ScoreContainer > .scoreCounter"
        );
        scoreCounter.textContent = parseInt(scoreCounter.textContent) + 1;
      } else {
        const scoreCounter = document.querySelector(
          ".player2ScoreContainer > .scoreCounter"
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
        return;
      }
      playerHandler.switchPlayerTurn();
    };
    const startDialog = () => {
      divDisplay.textContent = `${
        playerHandler.getFirstPlayer().name
      }'s turn (${playerHandler.getFirstPlayer().token})`;
    };
    return {
      startDialog,
    };
  };
  function getDisplayDiv() {
    return document.querySelector(".gameStatusDisplay");
  }
  const player1 = createPlayer(sessionStorage.getItem("player1Name"), "X");
  const player2 = createPlayer(sessionStorage.getItem("player2Name"), "O");
  const game = handleGameControl(player1, player2);
  game.startDialog();
};
startPageModule();
