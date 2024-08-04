// script.js

document.getElementById('solve-button').addEventListener('click', function() {
    const grid = [];
    const inputs = document.querySelectorAll('#sudoku-grid input');

    // Initialize the grid with zeros
    for (let i = 0; i < 9; i++) {
        grid[i] = [];
    }

    inputs.forEach((input, index) => {
        const value = parseInt(input.value) || 0;
        const row = Math.floor(index / 9);
        const col = index % 9;
        grid[row][col] = value;
    });

    if (solveSudoku(grid)) {
        displaySolvedGrid(grid);
    } else {
        alert('No solution exists!');
    }
});

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0; // backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || 
            board[x][col] === num || 
            board[Math.floor(row / 3) * 3 + Math.floor(x / 3)][Math.floor(col / 3) * 3 + (x % 3)] === num) {
            return false;
        }
    }
    return true;
}

function displaySolvedGrid(grid) {
    let solvedHTML = '<table><tbody>';
    for (let i = 0; i < 9; i++) {
        solvedHTML += '<tr>';
        for (let j = 0; j < 9; j++) {
            solvedHTML += `<td>${grid[i][j] || ''}</td>`;
        }
        solvedHTML += '</tr>';
    }
    solvedHTML += '</tbody></table>';
    document.getElementById('solved-grid').innerHTML = solvedHTML;
}
