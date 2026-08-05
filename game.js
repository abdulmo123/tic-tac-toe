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
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");
    const gamePlayers = [player1, player2];
    const gameBoard = Gameboard.getGameboard();

    let activePlayer = player1;
    let winner = {};

    const setMarker = (row, col) => {
        Gameboard.setBoardMarker(row, col, activePlayer);
        DisplayController.render();

        // check for a winner
        if (checkWinner()) {
            winner = activePlayer;
            DisplayController.renderWinnerMsg(winner);
        }

        // check draw
        if (checkDraw()) {
            console.log('game did end as a draw!', checkDraw());
            DisplayController.renderDrawMsg();
        }

        // switch turns
        activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;
    }

    const resetGame = () => {
        let gameBoard = Gameboard.getGameboard();
        for (let r = 0; r < gameBoard.length; r++) {
            for (let c = 0; c < gameBoard.length; c++) {
                gameBoard[r][c] = "";
            }
        }
        activePlayer = player1;
        xTurns = 0;
        xMoves = [];
        oTurns = 0;
        oMoves = [];
        DisplayController.render();
    }

    // check who won game
    function checkWinner() {

        const rows = [0, 1, 2];
        const cols = [0, 1, 2];

        const winVertical = cols.some(col => (
            gameBoard[0][col] === activePlayer.marker &&
            gameBoard[1][col] === activePlayer.marker &&
            gameBoard[2][col] === activePlayer.marker
        ));

        const winHorizontal = rows.some(row => (
            gameBoard[row][0] === activePlayer.marker &&
            gameBoard[row][1] === activePlayer.marker &&
            gameBoard[row][2] === activePlayer.marker
        ));

        const winDiagonal1 = (
            gameBoard[0][0] === activePlayer.marker &&
            gameBoard[1][1] === activePlayer.marker &&
            gameBoard[2][2] === activePlayer.marker
        );

        const winDiagonal2 = (
            gameBoard[0][2] === activePlayer.marker &&
            gameBoard[1][1] === activePlayer.marker &&
            gameBoard[2][0] === activePlayer.marker
        );

        return winVertical || winHorizontal || winDiagonal1 || winDiagonal2;
    }

    function checkDraw() {
        const hasEmpty = gameBoard.some(row =>
            row.some(cell => cell === "" || cell == null)
        );

        return !hasEmpty;
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

        const h2 = document.querySelector('h2');
        if (h2) {
            h2.remove();
        }
    }

    const renderWinnerMsg = (activePlayer) => {
        console.log('THE WINNER IS ...', activePlayer);
        const header = document.querySelector('.header');
        console.log('header..', header);
        const h2 = document.createElement('h2');
        h2.innerText = `${activePlayer.name} WINS!`;
        h2.style.color = 'green';
        header.appendChild(h2);
        cells.forEach((cell) => {
            cell.disabled = true;
        });
    }

    const renderDrawMsg = () => {
        console.log('GAME ENDED IN A DRAW!');
        const header = document.querySelector('.header');
        console.log('header..', header);
        const h2 = document.createElement('h2');
        h2.innerText = "GAME ENDED IN A DRAW";
        h2.style.color = 'red';
        header.appendChild(h2);
        cells.forEach((cell) => {
            cell.disabled = true;
        });
    }

    return { render, renderWinnerMsg, renderDrawMsg }
})();