let playerScore = 0;
let computerScore = 0;
let ties = 0;

function playGame(userChoice) {
    const choices = ["rock", "paper", "scissor"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = "";

    if (userChoice === computerChoice) {
        result = "It's a Tie! 🤝";
        ties++;
    } else if (
        (userChoice === "rock" && computerChoice === "scissor") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissor" && computerChoice === "paper")
    ) {
        result = `You Win! 🎉 ${userChoice} beats ${computerChoice}`;
        playerScore++;
    } else {
        result = `Computer Wins! 💻 ${computerChoice} beats ${userChoice}`;
        computerScore++;
    }

    document.querySelector(".result").textContent = result;
    updateScoreboard();
}

function updateScoreboard() {
    document.querySelector(".scoreboard").innerHTML = `
        <p>Player: ${playerScore}</p>
        <p>Computer: ${computerScore}</p>
        <p>Ties: ${ties}</p>
    `;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    ties = 0;
    document.querySelector(".result").textContent = "Scores reset! Start again 🎮";
    updateScoreboard();
}