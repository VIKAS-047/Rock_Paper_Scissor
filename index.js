let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

document.getElementById('result').innerHTML = `
  <div>Welcome! Make your move.</div>
  <div class="scoreboard">
    Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}
  </div>
`;

function rpsGame(playerMove) {
  const compMove = getComputerMove();
  const result = decideWinner(playerMove, compMove);
  const message = finalMessage(result, playerMove, compMove);
  localStorage.setItem('score', JSON.stringify(score));
  document.getElementById('result').innerHTML = message;
}

function getComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return moves[randomIndex];
}

function decideWinner(player, computer) {
  if (player === computer) {
    score.ties++;
    return 'draw';
  } else if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    score.wins++;
    return 'win';
  } else {
    score.losses++;
    return 'lose';
  }
}

function finalMessage(result, playerMove, compMove) {
  let outcome = '';
  if (result === 'win') {
    outcome = `🎉 You win! <strong>${playerMove}</strong> beats <strong>${compMove}</strong>.`;
  } else if (result === 'lose') {
    outcome = `😞 You lose! <strong>${compMove}</strong> beats <strong>${playerMove}</strong>.`;
  } else {
    outcome = `😐 It's a draw! You both chose <strong>${playerMove}</strong>.`;
  }

  return `
    <div style="margin-bottom: 12px;">${outcome}</div>
    <div class="scoreboard">
      Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}
    </div>
  `;
}

function resetScore() {
  localStorage.removeItem('score');
  score = { wins: 0, losses: 0, ties: 0 };
  document.getElementById('result').innerHTML =
    `<div style="margin-bottom: 10px;">🔄 Score reset. Play again!</div>
    <div class="scoreboard">
      Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}
    </div>`;
}
