/*  Contains the javascript code for the functions
    and variables needed to create a simple R-P-S game 
    against the console */
const ROUNDS_PLAYED = 5;
const ROCK_PAPER_SCISSORS_MAP = {"Rock": 0, "Paper": 1, "Scissors": 2};

let computerScore = 0;
let humanScore = 0;

// Create buttons through DOM
let rockBtn = document.createElement("button");
let paperBtn = document.createElement("button");
let scissorsBtn = document.createElement("button");
rockBtn.classList.add('button-style');
paperBtn.classList.add('button-style');
scissorsBtn.classList.add('button-style');
rockBtn.textContent = "Rock";
paperBtn.textContent = "Paper";
scissorsBtn.textContent = "Scissors";

const body = document.querySelector("body");
body.appendChild(rockBtn);
body.appendChild(paperBtn);
body.appendChild(scissorsBtn);

/*  Function to check winner between human and computer choice
    Throw exception if the RPS mapping is invalid */ 
function rockPaperScissors(humanChoice, computerChoice) {
  try {
    let humanValue = ROCK_PAPER_SCISSORS_MAP[humanChoice];
    let computerValue = ROCK_PAPER_SCISSORS_MAP[computerChoice];
    if (humanValue === (computerValue + 1) % Object.keys(ROCK_PAPER_SCISSORS_MAP).length) {
      return "Win";
    }
    
    if (computerValue === (humanValue + 1) % Object.keys(ROCK_PAPER_SCISSORS_MAP).length) {
      return "Lose";
    }
    
    return "Tie";
  }
  catch(err) {
    return "Invalid result";
  }
}

/*  Function to return a random RPS decision by the computer 
    Throws exception if random choice is not between 0-2 */
function getComputerChoice() {
  let randChoice = Math.floor(Math.random() * 3);
  switch(randChoice) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
    default:
      throw "Invalid random choice: " + randChoice;
  }
}