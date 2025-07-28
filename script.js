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
    function markCell(player,id){
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              let cell = board[i][j];
              if(cell.getID()===id){
                if(cell.getValue() != ""){
                    console.log("This cell is already marked!")
                    return;
                }
                cell.setValue(player.token);
              }
            }
          }
    }
    const printBoard = () => {
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
        getCurrentInput
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

        if(i>=9)return;
        //gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
        playRound();

      };
    const submitButton = document.querySelector("button");
    submitButton.addEventListener("click",()=>{
        printNewRound();
    })

    /*
    const printNewRound = () => {

        if(i>=3)return;
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
        playRound();

      };*/
    const playRound = () => {
        if (i >= 3) return; 
       // const answer = prompt('Enter the ID of the cell you want to mark:');
        const answer = gameBoard.getCurrentInput();
        console.log(`${answer} entered!`); 
        gameBoard.markCell(getActivePlayer(), parseInt(answer)); 
        gameBoard.printBoard();
        switchPlayerTurn();
        i++;
        //printNewRound();
    }
    
    return{
        playRound,
        getActivePlayer,
        //printNewRound
    };
    
})

const player1 = createPlayer('Tim',1,'O');
const player2 = createPlayer('Max',2,'X');

const game = gameController(gameBoard, player1, player2);
gameBoard.printBoard();
//game.printNewRound();
