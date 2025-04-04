let playerScore = 0;
let computerScore = 0;
const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

function getRandomComputerResult() {
    const options = ["Rock", "Paper", "Scissors"];
    const index = Math.floor(Math.random() * options.length);
    return options[index];
}

function hasPlayerWonTheRound(player, computer) {
    return(
        (player === "Rock" && computer === "Scissors") ||
        (player === "Scissors" && computer === "Paper")||
        (player === "Paper" && computer === "Rock")
    )
}

function getRoundResults(userOption) {
    const computerResult = getRandomComputerResult();
    let roundResult = hasPlayerWonTheRound(userOption, computerResult);

    if (userOption === computerResult) {
        return (`It´s a tie! Both chose ${userOption}`);
    }
    else if (roundResult) {
        playerScore += 1;
        return (`Player wins! ${userOption} beats ${computerResult}`);
    }
    else {
        computerScore += 1;
        return (`Computer wins! ${computerResult} beats ${userOption}`);
    }
}

function showResults(userOption) {
    roundResultsMsg.innerText = getRoundResults(userOption);
    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;

    if (playerScore === 3) {
        winnerMsgElement.innerText = "Player has won the game!"
    }
    if (computerScore === 3) {
        winnerMsgElement.innerText = "Computer has won the game!"
    }
    if (playerScore === 3 || computerScore === 3) {
        resetGameBtn.style.display = "block";
        optionsContainer.style.display = "none";
    }
};

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;
    resetGameBtn.style.display = "none";
    optionsContainer.style.display = "block";
    roundResultsMsg.innerText = "";
    winnerMsgElement.innerText = "";
};

resetGameBtn.addEventListener("click", resetGame);

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

rockBtn.addEventListener("click", function () {
  showResults("Rock");
});

paperBtn.addEventListener("click", function () {
  showResults("Paper");
});

scissorsBtn.addEventListener("click", function () {
  showResults("Scissors");
});
  
