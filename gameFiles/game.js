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
const renderElements = (function () {
  const player1Name = sessionStorage.getItem("player1Name");
  const player2Name = sessionStorage.getItem("player2Name");
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
  (function renderPlayer1ScoreContainer(){
    const player1ScoreDiv = document.querySelector(".player1ScoreContainer");
    const player1H2 = document.createElement("h2");
    player1H2.textContent = player1Name;
    player1H2.classList.add("player1Name");

    const scoreDiv = document.createElement("div");
    scoreDiv.classList.add("scoreCounterContainer1");

    const title = document.createElement("h2");
    title.classList.add("scoreTitle");
    title.textContent="Score";

    const score = document.createElement("div");
    score.classList.add("scoreCounter");
    score.textContent="0";

    scoreDiv.appendChild(title);
    scoreDiv.appendChild(score);

    player1ScoreDiv.appendChild(player1H2);
    player1ScoreDiv.appendChild(scoreDiv); 
  })();
  (function renderPlayer2ScoreContainer(){
    const player2ScoreDiv = document.querySelector(".player2ScoreContainer");
    const player2H2 = document.createElement("h2");
    player2H2.textContent = player2Name;
    player2H2.classList.add("playe2Name");

    const scoreDiv = document.createElement("div");
    scoreDiv.classList.add("scoreCounterContainer2")

    const title = document.createElement("h2");
    title.classList.add("scoreTitle");
    title.textContent="Score";

    const score = document.createElement("div");
    score.classList.add("scoreCounter");
    score.textContent="0";

    scoreDiv.appendChild(title);
    scoreDiv.appendChild(score);

    player2ScoreDiv.appendChild(player2H2);
    player2ScoreDiv.appendChild(scoreDiv);
  })();
})();


function createPlayer(name, token) {
  return { name, token };
}
const handlePlayers = function (player1, player2) {
  const players = [player1, player2];
  const divDisplayer = handleDisplayDiv();
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
  function displayWinner() {
    console.log(`${getActivePlayer().name} has won!`);
    divDisplayer.displayDiv.textContent=`${getActivePlayer().name} has won!`;
  }
  return {
    getActivePlayer,
    setActivePlayer,
    switchPlayerTurn,
    displayWinner
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
  function isTheCellAlreadyMarked(div){
    if(div.textContent!=""){
      return true;
    }

  }
  function hasSomeoneWon() {
    const boardWithCellValues = getArrayFromCells();
    if (
      boardWithCellValues[0][0] === "X" &&
      boardWithCellValues[0][1] === "X" &&
      boardWithCellValues[0][2] === "X"
     ||
    (
      boardWithCellValues[0][0] === "O" &&
      boardWithCellValues[0][1] === "O" &&
      boardWithCellValues[0][2] === "O"
    ) ||
    (
      boardWithCellValues[0][0] === "X" &&
      boardWithCellValues[1][0] === "X" &&
      boardWithCellValues[2][0] === "X"
    ) ||
    (
      boardWithCellValues[0][0] === "O" &&
      boardWithCellValues[1][0] === "O" &&
      boardWithCellValues[2][0] === "O"
    )|| 
    (
      boardWithCellValues[0][0] === "X" &&
      boardWithCellValues[1][1] === "X" &&
      boardWithCellValues[2][2] === "X"
    )||
    (
      boardWithCellValues[0][0] === "O" &&
      boardWithCellValues[1][1] === "O" &&
      boardWithCellValues[2][2] === "O"
    ) ||
    (
      boardWithCellValues[0][1] === "X" &&
      boardWithCellValues[1][1] === "X" &&
      boardWithCellValues[2][1] === "X"
    ) ||
    (
      boardWithCellValues[0][1] === "O" &&
      boardWithCellValues[1][1] === "O" &&
      boardWithCellValues[2][1] === "O"
    ) ||
    (
      boardWithCellValues[0][2] === "X" &&
      boardWithCellValues[1][1] === "X" &&
      boardWithCellValues[2][0] === "X"
    ) ||
    (
      boardWithCellValues[0][2] === "O" &&
      boardWithCellValues[1][1] === "O" &&
      boardWithCellValues[2][0] === "O"
    ) ||
    (
      boardWithCellValues[0][2] === "X" &&
      boardWithCellValues[1][2] === "X" &&
      boardWithCellValues[2][2] === "X"
    ) ||
    (
      boardWithCellValues[0][2] === "O" &&
      boardWithCellValues[1][2] === "O" &&
      boardWithCellValues[2][2] === "O"
    ) ||
    (
      boardWithCellValues[1][0] === "X" &&
      boardWithCellValues[1][1] === "X" &&
      boardWithCellValues[1][2] === "X"
    ) ||
     (
      boardWithCellValues[1][0] === "O" &&
      boardWithCellValues[1][1] === "O" &&
      boardWithCellValues[1][2] === "O"
    ) ||
    (
      boardWithCellValues[2][0] === "X" &&
      boardWithCellValues[2][1] === "X" &&
      boardWithCellValues[2][2] === "X"
    ) ||
    (
      boardWithCellValues[2][0] === "O" &&
      boardWithCellValues[2][1] === "O" &&
      boardWithCellValues[2][2] === "O"
    )) {
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
    cells
  };
};
const handleGameControl = function (player1, player2) {
  const playerHandler = handlePlayers(player1, player2);
  const gameLogicHandler = handleGameLogic();
  const divDisplayer = handleDisplayDiv();
  /*const handleHomeButton = handleHomeAndResetButton().showHomeButton;*/

  const handleEventListeners = function () {
    function handleCellClick(event) {
      const div = event.target;
      if(gameLogicHandler.isTheCellAlreadyMarked(div)){
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

    function setClickEventOnReturnButton(){
      const returnButton = document.querySelector(".return");
      returnButton.addEventListener("click",function(){
        document.body.classList.add("fade-out");
        setTimeout(() => {
        window.location.href = "index.html"; 
        }, 300);
      })
    }

    function setClickEventOnNewRoundButton(){

    }
    setClickEventOnReturnButton();
    setClickEventOnCells();
    return {
      handleCellClick,
      setClickEventOnCells,
      removeClickEventOnCells,
    };
  };
  const eventHandler = handleEventListeners();

  function increaseCounter(){
    const winner = playerHandler.getActivePlayer();
    if(winner.name===document.querySelector(".player1Name").textContent){
      const scoreCounter= document.querySelector(".player1ScoreContainer > .scoreCounterContainer1 > .scoreCounter");
      scoreCounter.textContent = parseInt(scoreCounter.textContent) + 1;
    }
  }
  
  function checkIfGameCanContinue(){
    if(gameLogicHandler.hasSomeoneWon()){
      playerHandler.displayWinner();
      increaseCounter();
      eventHandler.removeClickEventOnCells();
      return false;
    }else if(!gameLogicHandler.areThereCellsLeft()){
      eventHandler.removeClickEventOnCells();
      return false;
    }
    return true;
  }

  const playRound = function(div) {
    div.textContent = playerHandler.getActivePlayer().token;
    if(!checkIfGameCanContinue()){
      /*handleHomeButton();*/
      return;
    }
    playerHandler.switchPlayerTurn();
    console.log(
      `${playerHandler.getActivePlayer().name}'s turn.(token = ${
        playerHandler.getActivePlayer().token
      })`
    );
  };
  const startDialog = ()=>{
    console.log(
      `${playerHandler.getActivePlayer().name}'s turn.(token = ${
        playerHandler.getActivePlayer().token
      })`
      
    );
    divDisplayer.displayDiv.textContent=`${playerHandler.getActivePlayer().name}'s turn (${
        playerHandler.getActivePlayer().token
      })`
  };
  
  return {
    startDialog,
  };
};
const handleDisplayDiv = function(){
  const displayDiv = document.querySelector(".display");
  return{
    displayDiv
  }
}

/*
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
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "index.html"; 
      }, 300);
    })
  }

  return{
    showHomeButton
  }
}
  */

const player1 = createPlayer(sessionStorage.getItem("player1Name"), "X");
const player2 = createPlayer(sessionStorage.getItem("player2Name"), "O");
const game = handleGameControl(player1, player2);
game.startDialog();
