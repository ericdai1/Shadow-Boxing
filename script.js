/*  Contains the javascript code for the functions
    and variables needed to create a simple R-P-S game 
    against the console */

// Global variables for the score count
let computerScore = 0;
let humanScore = 0;
const ROCK_PAPER_SCISSORS_MAP = {"Rock": 0, "Paper": 1, "Scissors": 2};

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
    let humanValue = rockPaperScissorsMap[humanChoice];
    let computerValue = rockPaperScissorsMap[computerChoice];
    if (humanValue === (computerValue + 1) % Object.keys(ROCK_PAPER_SCISSORS_MAP)) {
      return "Win";
    }
    
    if (computerValue === (humanVaue + 1) % Object.keys(ROCK_PAPER_SCISSORS_MAP)) {
      return "Lose";
    }
    
    return "Tie";
  }
  catch {
    throw "Invalid mapping of choices to values for the Rock Paper Scissors mapping.";
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
      + casedComputerChoice + ".");
      computerScore++;
      break;
    case "Tie":
      console.log("You tied! Both chose " + casedHumanChoice + ".");
      break;
    default: 
      throw "Invalid outcome";
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
    Rock Paper Scissors game, in an attempt to beat the computer
    Throws an exception if an invalid choice is made */
function getHumanChoice() {
  let humanChoice = prompt("Please make your decision for Rock, Paper, Scissors:");
}

const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();

playRound(humanChoice, computerChoice);