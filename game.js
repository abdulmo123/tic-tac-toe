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

    let xTurns = 0;
    let oTurns = 0;

    let xMoves = [];
    let oMoves = [];


    const setMarker = (row, col) => {
        Gameboard.setBoardMarker(row, col, activePlayer);
        // console.log('activePlayer === ', activePlayer);
        if (activePlayer === player1) {
            xTurns++;
            // console.log('xTurns = ', xTurns);
            xMoves.push([Number(row), Number(col)]);
            // console.log('xMoves =>', xMoves);
        } else {
            oTurns++;
            // console.log('oTurns = ', oTurns);
            oMoves.push([Number(row), Number(col)]);
            // console.log('oMoves =>', oMoves);
        }
        DisplayController.render();
        // check for a winner only after a player has taken 3 turns (need 3-in-a-row to win)
        if (xTurns >= 3 || oTurns >= 3) {
            checkWinner(xMoves, xTurns, oMoves, oTurns);
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
    function checkWinner(xMoves, xTurns, oMoves, oTurns) {

        if (xTurns >= 3) {
            checkXWin = checkMarkerWinner(xMoves, xTurns);
            if (checkXWin) {
                // TODO: x won the game!
                DisplayController.renderWinnerMsg(activePlayer);
            }
        }

        if (oTurns >= 3) {
            checkOWin = checkMarkerWinner(oMoves, oTurns);
            if (checkOWin) {
                // TODO: o won the game!
                DisplayController.renderWinnerMsg(activePlayer);
            }
        }
    }

    // TODO: check for diagonal win ...
    function checkMarkerWinner(moves, turns) {
        const xMap = new Map();
        const yMap = new Map();
        for (let i = 0; i < moves.length; i++) {
            if (!xMap.has(moves[i][0])) {
                xMap.set(moves[i][0], []);
            }

            xMap.get(moves[i][0]).push(moves[i][1]);

            if (!yMap.has(moves[i][1])) {
                yMap.set(moves[i][1], [])
            }

            yMap.get(moves[i][1]).push(moves[i][0]);
        }


        // find a key whose value is 3! that's the winner!
        for (const [key, list] of xMap) {
            if (list.length === 3) {
                return true;
            }
        }

        for (const [key, list] of yMap) {
            if (list.length === 3) {
                return true;
            }
        }

        return false;
    };

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

    return { render, renderWinnerMsg }
})();