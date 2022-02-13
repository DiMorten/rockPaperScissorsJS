const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

const playerWinsMessage = 'You win.';
const computerWinsMessage = 'You lose.';
const drawMessage = 'It was a draw';

const PLAYER = 'player';
const COMPUTER = 'computer';
const DRAW = 'draw';

function computerPlay() {
    let items = Array(ROCK, PAPER, SCISSORS);
    let item = items[Math.floor(Math.random()*items.length)];  
    return item;
}

function checkWinner(playerSelection, computerSelection)  {
    switch (playerSelection) {
        case ROCK:
            if (computerSelection === PAPER) {
                winner = COMPUTER;                                
            }
            else if (computerSelection == SCISSORS) {
                winner = PLAYER;
            }
            else {
                winner = DRAW;
            }
            break;

        case PAPER:
            if (computerSelection === SCISSORS) {
                winner = COMPUTER;                                
            }
            else if (computerSelection == ROCK) {
                winner = PLAYER;
            }
            else {
                winner = DRAW;
            }

            break;

        case SCISSORS:
            if (computerSelection === ROCK) {
                winner = COMPUTER;                                
            }
            else if (computerSelection == PAPER) {
                winner = PLAYER;
            }
            else {
                winner = DRAW;
            }

            break;
        default:
            winner = DRAW;
            break;        
    }
    return winner;
}

function computeMessage(winner, playerSelection, computerSelection) {
    if (winner === PLAYER) {
        message = playerWinsMessage + " " + playerSelection + " beats " + computerSelection;
        
    }
    else if (winner === COMPUTER) {
        message = computerWinsMessage + " " + computerSelection + " beats " + playerSelection;
    }
    else {
        message = drawMessage;
    }
    return message;
}

function playRound(playerSelection, computerSelection) {

    playerSelection = playerSelection.toLowerCase()
    computerSelection = computerSelection.toLowerCase()

    console.log(playerSelection);
    console.log(computerSelection);

    let winner = checkWinner(playerSelection, computerSelection);
    let message = computeMessage(winner, playerSelection, computerSelection);

    return [winner, message]

}
function increaseWinCount(winner, playerWinCount, computerWinCount) {
    if (winner === PLAYER) {
        playerWinCount += 1;
    } 
    else if (winner === COMPUTER) {
        computerWinCount += 1;
    }
    return [playerWinCount, computerWinCount]
}
function game(times) {
    let playerWinCount = 0;
    let computerWinCount = 0;
    for (let i = 0; i < times; i++) {
        let playerSelection = prompt("Rock, paper, scissors! What is your choice?")
        let computerSelection = computerPlay()
        values = playRound(playerSelection, computerSelection);
        winner = values[0];
        message = values[1];
        console.log(message);

        values = increaseWinCount(winner, playerWinCount, computerWinCount)
        playerWinCount = values[0];
        computerWinCount = values[1];
        console.log('Player has won ' + playerWinCount + ' times. Computer has won ' + computerWinCount + ' times.')
    }

    if (playerWinCount > computerWinCount) {
        console.log("Player wins the game.")
    }
    else if (computerWinCount > playerWinCount) {
        console.log("Computer wins the game.")
    }
    else {
        console.log("Game was a draw.")
    }

}

game(5)
