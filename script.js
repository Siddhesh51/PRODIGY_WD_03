const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const winningMessageElement = document.getElementById('winning-message');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

const checkWin = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    
    return gameBoard.includes(null) ? null : 'Tie';
};

const handleClick = (event) => {
    const index = event.target.dataset.index;
    
    if (gameBoard[index] || checkWin()) return;
    
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());

    const winner = checkWin();
    if (winner) {
        winningMessageElement.textContent = winner === 'Tie' ? 'It\'s a tie!' : `Player ${winner} wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const resetGame = () => {
    gameBoard.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
    winningMessageElement.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);