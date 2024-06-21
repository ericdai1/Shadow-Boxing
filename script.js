/*  Contains the javascript code for the functions
    and variables needed to create a simple R-P-S game 
    against the console */
const ROUNDS_PLAYED = 5;
const ROCK_PAPER_SCISSORS_MAP = {'rock': 0, 'paper': 1, 'scissors': 2};

let computerScore = 0;
let humanScore = 0;

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

const body = document.querySelector('body');
body.appendChild(buttonContainer);

/*  Event listener in response to a certain button being clicked 
    Utilize bubbling to handle all 3 possibilities in one */
buttonContainer.addEventListener('click', (event) => {
  let target = event.target;
  if (target.tagName === 'BUTTON') {
    let playerChoice = target.id;

    if (playerChoice === 'rock' || playerChoice === 'paper' || playerChoice === 'scissors') {
      let computerChoice = getComputerChoice();
      performRockPaperScissors(playerChoice, computerChoice);
      
      if (humanScore === 5) {
        
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

/*  Function to check winner between human and computer choice
    Increment the score of the winner
    Throw exception if the RPS mapping is invalid */ 
function performRockPaperScissors(playerChoice, computerChoice) {
  try {
    let humanValue = ROCK_PAPER_SCISSORS_MAP[playerChoice];
    let computerValue = ROCK_PAPER_SCISSORS_MAP[computerChoice];
    if (humanValue === (computerValue + 1) % Object.keys(ROCK_PAPER_SCISSORS_MAP).length) {
      humanScore += 1;
    }
    
    if (computerValue === (humanValue + 1) % Object.keys(ROCK_PAPER_SCISSORS_MAP).length) {
      computerScore += 1;
    }
  }
  catch(err) {
    return 'Invalid result';
  }
}

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