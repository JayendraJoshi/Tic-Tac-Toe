const gameBoard = (function(){
    const fieldsArray = (function() {
        const array = [];
        for (let i = 0; i < 9; i++) {
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
    const printBoard = () => {
        function getBoardWithCellValues(board) {
            const boardWithCellValues = board.map(function(row) {
                return row.map(function(cell) {
                    return cell.getValue();
                });
            });
            return boardWithCellValues;
        }
        const boardWithCellValues = getBoardWithCellValues(board);
        console.log(boardWithCellValues);
    };
    printBoard();
})
function Cell() {
    let value="";
    let id = 0;
  
    // Accept a player's token to change the value of the cell
    const addSymbol = (player) => {
      value = player;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
    const setID = (number)=>{
        id = number;
    }
    const getID = () =>id;

    return {
      addSymbol,
      getValue,
      setID,
      getID
    };
  }
function createPlayer (name, id, token){
    return {name,id,token};
}
const gameController = (function(gameBoard, player1, player2){
    
})

const player1 = createPlayer('Tim',1,'0');
const player2 = createPlayer('Max',2,'X');

console.log(player1);
console.log(player2);
gameBoard();
