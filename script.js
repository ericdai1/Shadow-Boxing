/*  Contains the javascript code for the functions
    and variables needed to create a simple R-P-S game 
    against the console */

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

// Global variables for the choices
let computerChoice = 0;
let humanChoice = 0;