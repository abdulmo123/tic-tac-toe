const createPlayer = (name, marker) => {
    return { name, marker }
}

let Gameboard = (function () {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    const getGameboard = () => board;

    const setBoardMarker = (row, col, activePlayer) => {
        board[row][col] = activePlayer.marker;
    }

    return { getGameboard, setBoardMarker }
})();

let GameController = (function () {
    const player1 = createPlayer("John", "X");
    const player2 = createPlayer("Jim", "O");
    const gamePlayers = [player1, player2];
    const gameBoard = Gameboard.getGameboard();

    let activePlayer = player1;
    let winner = {};

    const setMarker = (row, col) => {
        Gameboard.setBoardMarker(row, col, activePlayer);
        activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;
        DisplayController.render();
        checkWinner();
    }

    const resetGame = () => {
        let gameBoard = Gameboard.getGameboard();
        for (let r = 0; r < gameBoard.length; r++) {
            for (let c = 0; c < gameBoard.length; c++) {
                gameBoard[r][c] = "";
            }
        }
        activePlayer = player1;
        DisplayController.render();
    }

    // check who won game
    function checkWinner() {
        if ((gameBoard[0][0] !== '' &&
            gameBoard[0][0] === gameBoard[1][1] &&
            gameBoard[1][1] === gameBoard[2][2]) ||
            (gameBoard[0][0] !== '' &&
                gameBoard[0][0] === gameBoard[0][1] &&
                gameBoard[0][1] === gameBoard[0][2])) {
            const winningMarker = gameBoard[0][0];

            const winner = winningMarker ? gamePlayers.find((player) => player.marker === winningMarker) : null;
            console.log('winner!', winner);
        } else {
            // check if the board is full to declare draw
            if (checkDraw()) {
                console.log('GAME HAS ENDED IN A DRAW');
            }
        }
    }

    function checkDraw() {
        const blank = "";
        for (let r = 0; r < gameBoard.length; r++) {
            for (let c = 0; c < gameBoard.length; c++) {
                if (gameBoard[r][c] !== blank) {
                    return false;
                }
            }
        }

        return true;
    }
    return { setMarker, resetGame };
})();


let DisplayController = (function () {
    // place marker
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            GameController.setMarker(cell.dataset.row, cell.dataset.col);
            cell.disabled = true;
        });
    });

    // reset game 
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', (e) => {
        GameController.resetGame();
        cells.forEach((cell) => {
            cell.disabled = false;
        })
    });


    // render display on screen - happens after each turn
    const render = () => {
        const gameBoard = Gameboard.getGameboard();
        for (let r = 0; r < gameBoard.length; r++) {
            for (let c = 0; c < gameBoard.length; c++) {
                const cell = document.querySelector(`button[data-row="${r}"][data-col="${c}"]`);
                cell.textContent = gameBoard[r][c];
            }
        }
    }

    return { render }
})();