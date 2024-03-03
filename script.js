// 6 x 7

let currentPlayer = 1;
let winner = false;

const model = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

document.addEventListener('DOMContentLoaded', start)

function start() {
    drawGame();
}

function drawGame() {
    const board = document.getElementById("board");
    for(let i=0; i<6; i++) {
        for(let j=0; j<7; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell')
            cell.dataset.row = i;
            cell.dataset.col = j;
            board.appendChild(cell);
        }
    }
    clickCell();
}

function displayBoard() {
    for(let row = 0; row <6; row++) {
        for(let col = 0; col <7; col++) {
            const value = readFromCell(row, col);
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
            
            switch(value) {
                case 1: cell.classList.add('red'); break;
                case 2: cell.classList.add('yellow'); break;
            }
        }
    }
}

function nextTurn() {
    if(currentPlayer === 1) {
        currentPlayer = 2;
    } else {
        currentPlayer = 1;
    }
}

function computerTurn() {
    const cells = availableCells();
    console.log(cells);
    const index = Math.floor(Math.random() * cells.length);
    const [row, col] = cells[index];
    selectCell(col)
}


function clickCell() {
    const buttons = document.querySelectorAll('.cell');
    buttons.forEach(button => {
        button.addEventListener('click', boardClicked);
    })
}

function boardClicked(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    console.log(row, col);
    selectCell(col)
}

function writeToCell(row, col, value) {
    model[row][col] = value;
}

function readFromCell(row, col) {
    return model[row][col];
}

function selectCell(col) {
    if (!winner) {
    let newRow;
    for(let i = 5; i > -1; i--) {
        if(readFromCell(i, col) === 0) {
            newRow = i;
            break;
        }
    }
    if(readFromCell(newRow, col) === 0) {
        writeToCell(newRow, col, currentPlayer)
        console.table(model)
        displayBoard();
        winnerCheck();
        nextTurn();
        return true;
    }
    return false;
}
}

function winnerCheck() {
    // check lodret
    for(let col = 0; col < 7; col ++) {
        for(let row = 0; row < 3; row++) {
            if(readFromCell(row,col) !== 0 &&
                readFromCell(row,col) === readFromCell(row + 1, col) &&
                readFromCell(row,col) === readFromCell(row + 2, col) &&
                readFromCell(row,col) === readFromCell(row + 3, col)) {
                    winner = true
                }
        }
    }
    // check vandret
    for(let row = 0; row<6; row++) {
        for(let col = 0; col < 3; col++) {
            if(readFromCell(row,col) !== 0 &&
                readFromCell(row,col) === readFromCell(row, col + 1) &&
                readFromCell(row,col) === readFromCell(row, col + 2) &&
                readFromCell(row,col) === readFromCell(row, col + 3)) {
                    winner = true
                }
        }
    }
    // skrå
    for (let row = 3; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (readFromCell(row,col) !== 0 &&
                readFromCell(row,col) === readFromCell(row - 1,col + 1) &&
                readFromCell(row,col) === readFromCell(row - 2,col + 2) &&
                readFromCell(row,col) === readFromCell(row - 3,col + 3)) {
                winner = true
            }
        }
    }

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (readFromCell(row,col) !== 0 &&
                readFromCell(row,col) === readFromCell(row + 1,col + 1) &&
                readFromCell(row,col) === readFromCell(row + 2,col + 2) &&
                readFromCell(row,col) === readFromCell(row + 3,col + 3)) {
                winner = true;
            }
        }
    }

    console.log(winner)
}


function availableCells() {
    let availableCells = [];
    for(let row = 0; row < 7; row ++) {
        for(let col = 0; col < 6; col++) {
            if(readFromCell(row,col) === 0 ) {
                availableCells.push([row,col])
            }
        }
    }
    return availableCells;
}