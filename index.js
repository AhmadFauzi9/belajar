const topScore = loadTopScore();

if (topScore !== null) {
  const topScoreDiv = document.getElementById("top-score-list");

  topScore.sort(function (a, b) {
    return b[SESSION_KEYS.SCORE] - a[SESSION_KEYS.SCORE];
  });

  topScore.forEach(function (player) {
    const row =
      "<div>" +
      "<div class='player-name'>" +
      player[SESSION_KEYS.PLAYER] +
      "</div>" +
      "<div class='player-score'>" +
      player[SESSION_KEYS.SCORE] +
      "</div>" +
      "</div>";
    console.log("NYAWA = ", player[SESSION_KEYS.LEVEL]);
    topScoreDiv.insertAdjacentHTML("beforeend", row);
  });
}

let session = null;
document.addEventListener("DOMContentLoaded", () => {
  const session = loadSession();

  if (session === null) {
    document.getElementById("continue-game-button").disabled = true;
    document.getElementById("container-continue").style.display = "none";
  }
});

function bukaHalamanGame() {
  location.href = "game2.html";
}

function mulaiGameBaru() {
  if (session !== null) {
    const confirmationMessege =
      "Game sebelumnya masih berjalan! Yakin mau mulai game baru?";

    if (confirm(confirmationMessege) === false) {
      return;
    }
  }

  const playerName = document.getElementById("player-name-input").value;

  if (playerName === "") {
    tampilkanFeedback("Masukkan nama player!", "incorrect");
    return;
  }

  session = {
    [SESSION_KEYS.PLAYER]: playerName,
    [SESSION_KEYS.SCORE]: 0,
    [SESSION_KEYS.LEVEL]: 0,
    [SESSION_KEYS.NYAWA]: 3,
    [SESSION_KEYS.BLUR]: 5,
  };

  const encodedSession = JSON.stringify(session);
  localStorage.setItem(SESSION_KEYS.SESSION, encodedSession);

  bukaHalamanGame();
}

function loadTopScore() {
  const encodeTopScore = localStorage.getItem(SESSION_KEYS.TOP_SCORE);

  if (encodeTopScore === null) {
    return null;
  }

  return JSON.parse(encodeTopScore);
}
