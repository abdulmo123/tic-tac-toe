// TODO: first work on logic for placing items in a cell when you click it

// 2 player objects created inside of a startGame() function?

// player object - name, symbol (X or O), isTurn?

class Player {
    constructor(name, symbol, isTurn) {
        this.name = name;
        this.symbol = symbol;
        this.isTurn = isTurn;
    }
}

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

const player1 = new Player("Player 1", "X", true);
const player2 = new Player("Player 2", "O", false);

function startGame() {
    console.log('player1 ==>', player1);
    console.log('player2 ==>', player2);
}

function placeSymbol(row, col) {
    const cell = document.querySelector(`button[data-id="${row}-${col}"]`);
    if (player1.isTurn) {
        board[row][col] = player1.symbol;
        cell.textContent = player1.symbol;
        player1.isTurn = false;
        player2.isTurn = true;
    } else if (player2.isTurn) {
        board[row][col] = player2.symbol;
        cell.textContent = player2.symbol;
        player2.isTurn = false;
        player1.isTurn = true;
    }

    // toggle disable so can't select that cell
    cell.disabled = true;
    console.log('board ==>', board);
}


function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    const cells = document.querySelectorAll('.cell').forEach((cell) => {
        cell.textContent = '';
        cell.disabled = false;
        player1.isTurn = true;
        player2.isTurn = false;
    });

}
startGame();