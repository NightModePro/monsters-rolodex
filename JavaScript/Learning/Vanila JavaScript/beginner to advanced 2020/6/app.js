const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";


let gameIsRunning = false;

const getPlayerChoice = () => {
    const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}`, '').toUpperCase();

    if (
        selection !== ROCK &&
        selection !== PAPER &&
        selection !== SCISSORS
    ) {
        alert(`Invalid choice! We choose ${DEFAULT_USER_CHOICE} for you`)
        return;
    }

    return selection;
};

const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return ROCK
    } else if (randomValue < 0.67) {
        return PAPER
    } else {
        return SCISSORS
    }
};

const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) => {
    if (cChoice === pChoice) {
        return RESULT_DRAW;
    } else if (
        (cChoice === ROCK && pChoice === PAPER) ||
        (cChoice === PAPER && pChoice === SCISSORS) ||
        (cChoice === SCISSORS && pChoice === ROCK)
    ) {
        return RESULT_PLAYER_WINS
    } else {
        return RESULT_COMPUTER_WINS
    }
}

startGameBtn.addEventListener('click', () => {
    if (gameIsRunning) {
        return;
    }
    gameIsRunning = true
    console.log('Game is starting...')
    const playerChoise = getPlayerChoice();
    const computerChoice = getComputerChoice();
    let winner;
    if (playerChoise) {
        winner = getWinner(computerChoice, playerChoise);
    } else {
        winner = getWinner(computerChoice);
    }

    let message = `You picked ${playerChoise || DEFAULT_USER_CHOICE}, computer picked ${computerChoice} `;
    if (winner === RESULT_DRAW) {
        message = message + 'had a draw';
    } else if (winner === RESULT_PLAYER_WINS) {
        message = message + 'you won';
    } else {
        message = message + 'you lost';
    }

    alert(message);
    gameIsRunning = false
});


const sumUp = (...numbers) => {
    // all the parameters will become an array with name numbers
}