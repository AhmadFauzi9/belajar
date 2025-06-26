const feedbackMessageDiv = document.getElementById("feedback-message");

let session = loadSession();
if (session === null) {
  document.getElementById("continue-game-button").disabled = true;
}

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

  if (playerName !== "") {
    session = {
      playerName: playerName,
      skor: 0,
      level: 0,
      nyawa: 3,
    };

    const encodeSession = JSON.stringify(session);
    localStorage.setItem("session", encodeSession);
    document.getElementById("player-name").textContent = playerName;
  }

  bukaHalamanGame();
}
