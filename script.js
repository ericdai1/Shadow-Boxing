/*  Contains the javascript code for the functions
    and variables needed to create a simple R-P-S game 
    against the console */

// Global Constants
const ROUNDS_PLAYED = 5;
const ROCK_PAPER_SCISSORS_MAP = {"Rock": 0, "Paper": 1, "Scissors": 2};

// Global variables for the score count
let computerScore = 0;
let humanScore = 0;

/* Validity check for Rock Paper Scissors */
function validChoice(choice) {
  if (choice === "Rock" || choice === "Paper" || 
  choice === "Scissors") {
    return true;
  }

  return false;
}

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

/*  Function to play one round of RPS 
    Throws exception if human and computer choices aren't valid */
function playRound(humanChoice, computerChoice) { 
  let casedHumanChoice = humanChoice.substr(0, 1).toUpperCase() + humanChoice.substr(1).toLowerCase();
  let casedComputerChoice = computerChoice.substr(0, 1).toUpperCase() + computerChoice.substr(1).toLowerCase();
  
  // Check validity
  if (!validChoice(casedHumanChoice) || !validChoice(casedComputerChoice)) {
    throw "Invalid input for the choices";
  }
  
  // Perform round and
  let roundResult = rockPaperScissors(casedHumanChoice, casedComputerChoice);

  switch(roundResult) {
    case "Win":
      console.log("You win! " + casedHumanChoice + " beats " + casedComputerChoice + ".");
      humanScore++;
      break;
    case "Lose":
      console.log("You lose! " + casedComputerChoice + " beats " 
      + casedHumanChoice + ".");
      computerScore++;
      break;
    case "Tie":
      console.log("You tied! Both chose " + casedHumanChoice + ".");
      break;
    default: 
      throw "invalid outcome";
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

/*  Function to prompt the user to make a decision in this
    Rock Paper Scissors game, in an attempt to beat the computer */
function getHumanChoice() {
  let humanChoice = prompt("Please make your decision for Rock, Paper, Scissors:");

  // Uncomment below if playing from terminal, as prompt only works on browser
  // let humanChoice = "papEr";
  return humanChoice;
}

// Play 5 rounds
try {
  for (let round = 0; round < ROUNDS_PLAYED; round++) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
  }
}
catch (err) {
  console.log("Error thrown: " + err);
}

// Announce results
if (humanScore > computerScore) {
  console.log("You won, congratulations!");
}
else if (computerScore > humanScore) {
  console.log("You lose, try again next time!");
}
else {
  console.log("You tied. Keep on trying!");
}