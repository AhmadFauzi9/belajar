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

  session = {
    // playerName: playerName,
    // skor: 0,
    // level: 0,
    // nyawa: 3,
    // nilaiBlur: 5,
    currentPlayer: playerName,
    currentSkor: 0,
    currentLevel: 0,
    currentNyawa: 3,
    currentBlur: 5,
  };

  const encodedSession = JSON.stringify(session);
  localStorage.setItem("session", encodedSession);

  bukaHalamanGame();
}
