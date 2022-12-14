class Game {
  constructor(rounds = 5) {
    this.choiceMap = new Map([
      [0, "🪨"],
      [1, "🧻"],
      [2, "✂️"],
    ]);
    this.playerScore = 0;
    this.computerScore = 0;
    this.rounds = rounds;
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getComputerChoice() {
    let index = this.randomNumber(0, this.choiceMap.size - 1);
    return index;
  }

  playRound(playerSelect, computerSelect) {
    if (playerSelect == computerSelect) {
      return 0;
    } else {
      if (
        playerSelect == computerSelect + 1 ||
        playerSelect == computerSelect - 2
      ) {
        return 1;
      }
      return 2;
    }
  }

  game(playerChoice) {
    let playerReferenceChoice = document.getElementById("playerChoice");
    let playerReferenceScore = document.getElementById("playerScore");

    let computerReferenceChoice = document.getElementById("computerChoice");
    let computerReferenceScore = document.getElementById("computerScore");

    let winnerOfRound = document.getElementById("winner");
    let explanation = document.getElementById("explanation");

    let computerChoice = this.getComputerChoice();
    computerReferenceChoice.textContent = this.choiceMap.get(computerChoice);
    playerReferenceChoice.textContent = this.choiceMap.get(playerChoice);
    let result = this.playRound(playerChoice, computerChoice);

    if (result == 1) {
      this.playerScore++;
      winnerOfRound.textContent = "Player wins the round";
      explanation.textContent = `${this.choiceMap.get(
        playerChoice
      )} beats ${this.choiceMap.get(computerChoice)}`;
      playerReferenceScore.textContent = `Player: ${this.playerScore}`;
    } else if (result == 2) {
      this.computerScore++;
      winnerOfRound.textContent = "Computer wins the round";
      explanation.textContent = `${this.choiceMap.get(
        computerChoice
      )} beats ${this.choiceMap.get(playerChoice)}`;
      computerReferenceScore.textContent = `Computer: ${this.computerScore}`;
    } else {
      winnerOfRound.textContent = "Round tied";
      explanation.textContent = `${this.choiceMap.get(
        computerChoice
      )} ties ${this.choiceMap.get(playerChoice)}`;
    }

    if (this.playerScore == this.rounds) {
      // player won
      alert("Player won the game");
      this.reset(
        winnerOfRound,
        explanation,
        playerReferenceScore,
        playerReferenceChoice,
        computerReferenceChoice,
        computerReferenceScore
      );
      return;
    }
    if (this.computerScore == this.rounds) {
      // computer won
      alert("Computer won the game");
      this.reset(
        winnerOfRound,
        explanation,
        playerReferenceScore,
        playerReferenceChoice,
        computerReferenceChoice,
        computerReferenceScore
      );
      return;
    }
  }

  reset(
    winnerOfRound,
    explanation,
    playerReferenceScore,
    playerReferenceChoice,
    computerReferenceChoice,
    computerReferenceScore
  ) {
    winnerOfRound.textContent = "Choose your weapon";
    explanation.textContent = "First to score 5 points wins the game";
    playerReferenceScore.textContent = `Player: 0`;
    computerReferenceScore.textContent = `Computer: 0`;
    computerReferenceChoice.textContent = "❓";
    playerReferenceChoice.textContent = "❓";
    game = new Game();
  }
}
