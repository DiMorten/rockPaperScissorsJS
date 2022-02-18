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
            winner = (computerSelection === PAPER) ? COMPUTER :
                    (computerSelection == SCISSORS) ? PLAYER :
                    DRAW; 
            break;
        case PAPER:
            winner = (computerSelection === SCISSORS) ? COMPUTER :
                    (computerSelection == ROCK) ? PLAYER :
                    DRAW; 
            break;
        case SCISSORS:
            winner = (computerSelection === ROCK) ? COMPUTER :
                    (computerSelection == PAPER) ? PLAYER :
                    DRAW;
            break;
        default:
            winner = DRAW;
            break;        
    }
    return winner;
}

function computeMessage(winner, playerSelection, computerSelection) {
    message = (winner === PLAYER) ? playerWinsMessage + " " + playerSelection + " beats " + computerSelection :
            (winner === COMPUTER) ? computerWinsMessage + " " + computerSelection + " beats " + playerSelection :
            drawMessage;
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
function playGame(times) {
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

let playerWinCount = 0;
let computerWinCount = 0;

function checkCountWinner(playerWinCount, computerWinCount) {
    if (playerWinCount > computerWinCount) {
        return "You win!";
    }
    else if (computerWinCount > playerWinCount) {
        return "You lose! Computer wins the game.";
    }
    else if (computerWinCount === playerWinCount) {
        return "Game was a draw.";
    }
    else { return "." };
}
let waitingForRestart = false;
function playRoundCallback(e) {
    if (waitingForRestart === true) return;
    let computerSelection = computerPlay()
    let playerSelection = e.target.id;

    console.log(playerSelection);
    console.log(computerSelection);

    values = playRound(playerSelection, computerSelection)
    winner = values[0];
    message = values[1];

    const computerResult = document.querySelector('#computerresult');
    computerResult.innerHTML = "You selected <b>" + playerSelection + "</b>.<br>" +
            "Computer selected <b>" + computerSelection + "</b>!";


    const roundWinner = document.querySelector('#roundwinner');

    let winnerColor = (winner === PLAYER) ? '#24305e' :
            (winner === COMPUTER) ? '#f76c6c' :
            'gray';
    console.log(winnerColor);

    roundWinner.setAttribute('style', `color: ${winnerColor};`);    
    roundWinner.innerHTML = "<b>" + message + "</b>";


    
    values = increaseWinCount(winner, playerWinCount, computerWinCount)
    playerWinCount = values[0];
    computerWinCount = values[1];
    
    const winCount = document.querySelector('#wincount');
    winCount.innerHTML = 'Player has won <b>' + playerWinCount + '</b> times. Computer has won <b>' + computerWinCount + '</b> times.';

    if (playerWinCount >= 5 || computerWinCount >= 5) {
        message = checkCountWinner(playerWinCount, computerWinCount)
        const countWinner = document.querySelector('#countwinner');
        countWinner.innerHTML = "<b>" + message + "</b>"; 

        computerResult.innerHTML = ".";
        roundWinner.innerHTML = ".";
        winCount.innerHTML = ".";

        restart = document.querySelector("#restart");
        const restartButton = document.createElement('button');

        restartButton.setAttribute('style', 
                'color: white; border: solid white 2px; background-color: #24305e; font-size: 46px; font-weight: bold; padding: 20px; margin: 10px 0;border-radius: 10px;');    
        restartButton.setAttribute('id', 'restartbutton')
        restartButton.textContent = 'Again?';

        restart.appendChild(restartButton);
        
        restartButton.addEventListener('click', restartGame);
        waitingForRestart = true;
    }

}

function restartGame(e) {
    if (waitingForRestart === true) {
        playerWinCount = 0;
        computerWinCount = 0;
        
        const countWinner = document.querySelector('#countwinner');
        countWinner.innerHTML = ".";

        restart = document.querySelector("#restart");
        restartButton = document.querySelector("#restartbutton");
        restart.removeChild(restartButton);

        waitingForRestart = false;
    }

}

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', playRoundCallback));


// playGame(5)
