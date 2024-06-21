/*  Contains the javascript code for the functions
    and variables needed to create a simple R-P-S game 
    against the console */
const ROUNDS_PLAYED = 5;
const ROCK_PAPER_SCISSORS_MAP = {'rock': 0, 'paper': 1, 'scissors': 2};

let playerScore = 0;
let computerScore = 0;

// Create buttons through DOM - add container for event delegation
let buttonContainer = document.createElement('div');
buttonContainer.id = 'buttonContainer';

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
computerScoreDisplay.textContent = `Player Score: ${computerScore}`;

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
    let playerChoice = target.id;

    if (playerChoice === 'rock' || playerChoice === 'paper' || playerChoice === 'scissors') {
      let computerChoice = getComputerChoice();
      let result = performRockPaperScissors(playerChoice, computerChoice);
      updateScores(result);

      if (playerScore === 5) {
        displayWinner("player");
      }
      else if (computerScore === 5) {
        displayWinner("computer");
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
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
    default:
      throw 'Invalid random choice: ' + randChoice;
  }
}

/*  Function to check winner between human and computer choice
    Return the winner
    Throw exception if the RPS mapping is invalid */ 
function performRockPaperScissors(playerChoice, computerChoice) {
  try {
    let humanValue = ROCK_PAPER_SCISSORS_MAP[playerChoice];
    let computerValue = ROCK_PAPER_SCISSORS_MAP[computerChoice];
    if (humanValue === (computerValue + 1) % Object.keys(ROCK_PAPER_SCISSORS_MAP).length) {
      return 'Win';
    }
    
    if (computerValue === (humanValue + 1) % Object.keys(ROCK_PAPER_SCISSORS_MAP).length) {
      return 'Lose'
    }
    
    return 'Tie';
  }
  catch(err) {
    return 'Invalid result';
  }
}

function updateScores(result) {
  if (result === 'Win') {
    playerScore += 1;
    playerScoreDisplay.textContent = `Player Score: ${playerScore}`;
  }
  else if (result === 'Lose') {
    computerScore += 1;
    computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;
  }
}