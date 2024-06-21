/*  Contains the javascript code for the functions
    and variables needed to create a simple R-P-S game 
    against the console */
const WINNER_SCORE = 5;
const ROCK_PAPER_SCISSORS_MAP = {'Rock': 0, 'Paper': 1, 'Scissors': 2};

let playerScore = 0;
let computerScore = 0;

// Create buttons through DOM - add container for event delegation
let buttonContainer = document.createElement('div');
buttonContainer.id = 'button-container';

let rockBtn = document.createElement('button');
let paperBtn = document.createElement('button');
let scissorsBtn = document.createElement('button');

rockBtn.classList.add('rps-button');
rockBtn.id = 'rock';
rockBtn.textContent = 'Rock';

paperBtn.classList.add('rps-button');
paperBtn.id = 'paper';
paperBtn.textContent = 'Paper';

scissorsBtn.classList.add('rps-button');
scissorsBtn.id = 'scissors';
scissorsBtn.textContent = 'Scissors';

buttonContainer.appendChild(rockBtn);
buttonContainer.appendChild(paperBtn);
buttonContainer.appendChild(scissorsBtn);

// The following will indicate the scores of the player and computer
let scoreDisplay = document.createElement('div');

let playerScoreDisplay = document.createElement('p');
let computerScoreDisplay = document.createElement('p');
playerScoreDisplay.textContent = `Player Score: ${playerScore}`;
computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;

scoreDisplay.appendChild(playerScoreDisplay);
scoreDisplay.appendChild(computerScoreDisplay);

// Tie everything together and allow them to show up in the document by using the body
const body = document.querySelector('body');
body.appendChild(buttonContainer);
body.appendChild(scoreDisplay);


/*  Event listener in response to a certain button being clicked 
    Utilize bubbling to handle all 3 possibilities in one */
buttonContainer.addEventListener('click', (event) => {
  let target = event.target;
  if (target.tagName === 'BUTTON') {
    let playerChoice = target.textContent;

    if (playerChoice === 'Rock' || playerChoice === 'Paper' || playerChoice === 'Scissors') {
      if (playerScore >= WINNER_SCORE || computerScore >= WINNER_SCORE) {
        resetGame();
      }

      // Following handles playing the main game, as well as updating the score and/or displaying a winner
      let computerChoice = getComputerChoice();
      let result = getRockPaperScissorsResult(playerChoice, computerChoice);
      displayRoundResult(result, playerChoice, computerChoice);

      if (playerScore === WINNER_SCORE) {
        displayWinner('Player');
      }
      else if (computerScore === WINNER_SCORE) {
        displayWinner('Computer');
      }
    }
  }
});

// Add event listeners for mouse events to add styling
const buttons = document.querySelectorAll('.rps-button')
buttons.forEach(button => {
  button.addEventListener('mousedown', () => {
    button.classList.add('pressed');
  });

  button.addEventListener('mouseup', () => {
      button.classList.remove('pressed');
  });

  button.addEventListener('mouseleave', () => {
      button.classList.remove('pressed');
  });
});

/*  Function to return a random RPS decision by the computer 
    Throws exception if random choice is not between 0-2 */
function getComputerChoice() {
  let randChoice = Math.floor(Math.random() * 3);
  switch(randChoice) {
    case 0:
      return 'Rock';
    case 1:
      return 'Paper';
    case 2:
      return 'Scissors';
    default:
      throw 'Invalid random choice: ' + randChoice;
  }
}

/*  Function to get winner between a human and computer choice
    Return the winner
    Throw exception if the RPS mapping is invalid */ 
function getRockPaperScissorsResult(playerChoice, computerChoice) {
  try {
    let playerValue = ROCK_PAPER_SCISSORS_MAP[playerChoice];
    let computerValue = ROCK_PAPER_SCISSORS_MAP[computerChoice];
    if (playerValue === (computerValue + 1) % Object.keys(ROCK_PAPER_SCISSORS_MAP).length) {
      return 'Win';
    }
    
    if (computerValue === (playerValue + 1) % Object.keys(ROCK_PAPER_SCISSORS_MAP).length) {
      return 'Lose'
    }
    
    return 'Tie';
  }
  catch(err) {
    return 'Invalid result';
  }
}

function displayRoundResult(result, playerChoice, computerChoice) {
  let roundResult = document.querySelector('#round-result');

  // In the case it's the first ever round and no results have been created
  if (!roundResult) {
    roundResult = document.createElement('p');
    roundResult.id = 'round-result';
    body.appendChild(roundResult);
  }

  // Reset classList in order to apply a className later to determine color output
  roundResult.classList.value = '';

  if (result === 'Win') {
    playerScore += 1;
    playerScoreDisplay.textContent = `Player Score: ${playerScore}`;
    roundResult.textContent = `You played ${playerChoice}, which beat the computer's choice of ${computerChoice}. You win!`
    roundResult.classList.add('won');
  }
  else if (result === 'Lose') {
    computerScore += 1;
    computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;
    roundResult.textContent = `You played ${playerChoice}, which lost to the computer's choice of ${computerChoice}. You lost!`
    roundResult.classList.add('lost');
  }
  else {
    roundResult.textContent = `You played ${playerChoice}, which tied with the computer's choice of ${computerChoice}. Draw!`
    roundResult.classList.add('tied');
  }
}

function displayWinner(winner) {
  let winnerDisplay = document.createElement('p');
  winnerDisplay.id = 'winner';

  if (winner === 'Player') {
    winnerDisplay.textContent = 'You won! Press any button to play again';
  }
  else if (winner === 'Computer') {
    winnerDisplay.textContent = 'You lost... Press any button to try again';
  }

  body.appendChild(winnerDisplay);
}

function resetGame() {
  playerScore = 0;
  playerScoreDisplay.textContent = `Player Score: ${playerScore}`;

  computerScore = 0;
  computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;

  const winnerDisplay = document.querySelector('#winner');

  if (winnerDisplay) {
    winnerDisplay.remove();
  }
}