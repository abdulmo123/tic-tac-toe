// TODO: first work on logic for placing items in a cell when you click it

// 2 player objects created inside of a startGame() function?

// player object - name, symbol (X or O), isTurn?

// TODO: try the module approach 
// player object
function createPlayer(name, marker) {
    return { name, marker }
}

// game board object
let gameBoard = (function () {
    let board = [];

    const getGameBoard = () => board;

    const setMarker = (row, col, marker) => {
        if (board[row][col] === "") {
            board[row][col] = marker;
            return true;
        }

        return false;
    };

    const resetBoard = () => {
        board.fill("");
    }


    return { getGameBoard, setMarker, resetBoard }
})();

// game state object
let gameController = (() => {
    
})();


// display controller
let displayController = (() => {

})();
const player1 = createPlayer("Player 1", "X", true);
const player2 = createPlayer("Player 2", "O", false);


console.log('player 1 ...', player1);
console.log('player 2 ...', player2);