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
              if(cell.getID===id){
                if(cell.getValue != ""){
                    console.log("This cell is already marked!")
                    return;
                }
                console.log(cell.getValue());
                cell.setValue(player.token);
                console.log(cell.getValue());
              }
            }
          }
    }
    const printBoard = () => {
        function getBoardWithCellValues(board) {
            const boardWithCellValues = board.map(function(row) {
                return row.map(function(cell) {
                    return cell.getID();
                });
            });
            return boardWithCellValues;
        }
        const boardWithCellValues = getBoardWithCellValues(board);
        console.log(boardWithCellValues);
    };

    return{
        board,
        printBoard,
        markCell
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
    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
      };
    const playRound = () => {
        //const answer = prompt('Enter the ID of the cell you want to mark:');
        //console.log(`${answer} entered!`); 
        //gameBoard.markCell(getActivePlayer(), parseInt(answer)); 
        switchPlayerTurn();
        printNewRound();
    }
    printNewRound();
    
    return{
        playRound,
        getActivePlayer
    };
    
})

const player1 = createPlayer('Tim',1,'0');
const player2 = createPlayer('Max',2,'X');

const game = gameController(gameBoard, player1, player2);
game.playRound();
