const gameBoard = (function(){
    const fieldsArray = (function() {
        const array = [];
        for (let i = 1; i < 10; i++) {
            let cell = Cell();
            cell.setID(i);
            array.push(cell);
        }
        return array;
    })();
    const rows = 3;
    const columns = 3;
    const board = [];
    let fieldsArrayIndex = 0; 
    let currentInput;
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(fieldsArray[fieldsArrayIndex]);
        fieldsArrayIndex++;
      }
    }
    (function ShowBoardOnWebpage(){
        const divContainer = document.createElement("div");
        for(let i = 0;i< board.length;i++){
            let divRowContainer = document.createElement("div");
            divRowContainer.classList.add(`row-${i}-container`);
            for(let j = 0;j<3;j++){
                let divChild = document.createElement("div");
                divChild.classList.add(`row-${i}`);
                divChild.classList.add(`cell-${j}`);
                divRowContainer.appendChild(divChild);
            }
            divContainer.appendChild(divRowContainer);
        }
        const main = document.querySelector("main");
        main.appendChild(divContainer);
    })()


    function markCell(player,id){
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              let cell = board[i][j];
              if(cell.getID()===id){
                if(cell.getValue() != ""){
                    console.log("This cell is already marked!")
                    return false;
                }
                cell.setValue(player.token);
                return true;
              }
            }
          }
    }
    function getBoardWithCellValues(board) {
        const boardWithCellValues = board.map(function(row) {
            return row.map(function(cell) {
                return cell.getValue();
            });
        });
        return boardWithCellValues;
    }
    function getBoardWithCellID(board) {
        const boardWithCellIDs = board.map(function(row) {
            return row.map(function(cell) {
                return cell.getID();
            });
        });
        return boardWithCellIDs;
    }
    ;
    const printBoard = () => {  
        const boardWithCellValues = getBoardWithCellValues(board);
        const boardWithCellIDs = getBoardWithCellID(board);
    
        console.log(boardWithCellIDs);
        console.log(boardWithCellValues);
    };
   
    const submitButton = document.querySelector("button");
        submitButton.addEventListener("click", () => {
        currentInput = document.querySelector("input").value;
    });
    const getCurrentInput= () => currentInput;
    
   
    return{
        board,
        printBoard,
        markCell,
        getCurrentInput,
        getBoardWithCellValues
    };
})();
function Cell() {
    let value="";
    let id = 0;
  
    const setValue = (player) => {
      value = player;
    };
  
    const getValue = () => value;
    const setID = (number)=>{
        id = number;
    }
    const getID = () =>id;

    return {
      setValue,
      getValue,
      setID,
      getID
    };
  }
function createPlayer (name, id, token){
    return {name,id,token};
}
const gameController = (function(){
    const players = [player1,player2];
    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;
    function switchPlayerTurn(){
        if (activePlayer === players[0]){
            activePlayer = players[1]
        }else{
            activePlayer = players[0];
        }
    }
    let i = 0;
    const printNewRound = () => {
        if(areThereCellsLeft){
            playRound();
        }

      };
    const submitButton = document.querySelector("button");
    submitButton.addEventListener("click",()=>{
        printNewRound();
    })
    function areThereCellsLeft(){
        const boardWithCellValues = gameBoard.getBoardWithCellValues(gameBoard.board);
        for (let i = 0; i < boardWithCellValues.length; i++) {
            for (let j = 0; j < boardWithCellValues[i].length; j++) {
                if (boardWithCellValues[i][j] === "") {
                    return true; 
                }
            }
        }
        console.log("No empty cells left, it's a tie!");
        return false; 
    }
    function isTheGameOver(){
        const boardWithCellValues = gameBoard.getBoardWithCellValues(gameBoard.board);
        if (boardWithCellValues[0][0]==="X" && boardWithCellValues[0][1]==="X" &&boardWithCellValues[0][2]==="X" ) {
            displayWinner(players[0]);
        }else if(boardWithCellValues[0][0]==="O" && boardWithCellValues[0][1]==="O" &&boardWithCellValues[0][2]==="O" ){
            displayWinner(players[1]);
        }else if(boardWithCellValues[0][0]==="X" && boardWithCellValues[1][0]==="X" &&boardWithCellValues[2][0]==="X" ){
            displayWinner(players[1]);
        }else if(boardWithCellValues[0][0]==="O" && boardWithCellValues[1][0]==="O" &&boardWithCellValues[2][0]==="O" ){
            displayWinner(players[1]);
        }else if(boardWithCellValues[0][0]==="X" && boardWithCellValues[1][1]==="X" &&boardWithCellValues[2][2]==="X" ){
            displayWinner(players[0]);
        }else if(boardWithCellValues[0][0]==="O" && boardWithCellValues[1][1]==="O" &&boardWithCellValues[2][2]==="O" ){
            displayWinner(players[1]);
        }else if(boardWithCellValues[0][1]==="X" && boardWithCellValues[1][1]==="X" &&boardWithCellValues[2][1]==="X" ){
            displayWinner(players[0]);
        }else if(boardWithCellValues[0][1]==="O" && boardWithCellValues[1][1]==="O" &&boardWithCellValues[2][1]==="O" ){
            displayWinner(players[1]);
        }else if(boardWithCellValues[0][2]==="X" && boardWithCellValues[1][1]==="X" &&boardWithCellValues[2][0]==="X" ){
            displayWinner(players[0]);
        }else if(boardWithCellValues[0][2]==="O" && boardWithCellValues[1][1]==="O" &&boardWithCellValues[2][0]==="O" ){
            displayWinner(players[1]);
        }else if(boardWithCellValues[0][2]==="X" && boardWithCellValues[1][2]==="X" &&boardWithCellValues[2][2]==="X" ){
            displayWinner(players[0]);
        }else if(boardWithCellValues[0][2]==="O" && boardWithCellValues[1][2]==="O" &&boardWithCellValues[2][2]==="O" ){
            displayWinner(players[1]);
        }else if(boardWithCellValues[1][0]==="X" && boardWithCellValues[1][1]==="X" &&boardWithCellValues[1][2]==="X" ){
            displayWinner(players[0]);
        }else if(boardWithCellValues[1][0]==="O" && boardWithCellValues[1][1]==="O" &&boardWithCellValues[1][2]==="O" ){
            displayWinner(players[1]);
        }else if(boardWithCellValues[2][0]==="X" && boardWithCellValues[2][1]==="X" &&boardWithCellValues[2][2]==="X" ){
            displayWinner(players[0]);
        }else if(boardWithCellValues[2][0]==="O" && boardWithCellValues[2][1]==="O" &&boardWithCellValues[2][2]==="O" ){
            displayWinner(players[1]);
        }else{
            return false;
        }
        return true;

    }
    function displayWinner(player){
        console.log(`${player.name} has won!`)

    }
    const playRound = () => {
        if(isTheGameOver() || !areThereCellsLeft()){
            return;
        }
        const answer = gameBoard.getCurrentInput();
        console.log(`${answer} entered!`); 
        let validInput = gameBoard.markCell(getActivePlayer(), parseInt(answer)); 
        gameBoard.printBoard();
        if(isTheGameOver() || !areThereCellsLeft()){
            return;
        }
        if(validInput){
            switchPlayerTurn();
        }
        console.log(`${getActivePlayer().name}'s turn.(token = ${getActivePlayer().token})`);
        i++;
    
    }
    console.log(`${getActivePlayer().name}'s turn.(token = ${getActivePlayer().token})`);
    gameBoard.printBoard();
    return{
        playRound,
        getActivePlayer,
        
    };
    
})

const player1 = createPlayer('Tim',1,'X');
const player2 = createPlayer('Max',2,'O');

const game = gameController();
//gameBoard.printBoard();
