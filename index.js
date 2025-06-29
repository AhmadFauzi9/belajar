const topScore = loadTopScore();
if (topScore !== null) {
  const topScoreDiv = document.getElementById("top-score-list");

  const namaPlayerUnik = [];

  topScore.forEach((player) => {
    nama = player[SESSION_KEYS.PLAYER];
    skorPlayer = player[SESSION_KEYS.SCORE];

    if (
      !namaPlayerUnik[nama] ||
      skorPlayer > namaPlayerUnik[nama][SESSION_KEYS.SCORE]
    ) {
      namaPlayerUnik[nama] = player;
    }
  });

  const topScoreUnik = Object.values(namaPlayerUnik);

  // topScore
  topScoreUnik
    .sort(function (a, b) {
      return b[SESSION_KEYS.SCORE] - a[SESSION_KEYS.SCORE];
    })
    .slice(0, 5)
    .forEach(function (player, peringkatScore) {
      let className = "";
      let medal = "";

      if (peringkatScore === 0) {
        //jika peringkatScore === indeks ke 0(peringkat tertinggi) maka set className
        className = "top-one";
        medal = "<span class='medal-one'>🥇</span> ";
      } else if (peringkatScore === 1) {
        className = "top-two";
        medal = "<span class='medal'>🥈</span> ";
      } else if (peringkatScore === 2) {
        className = "top-three";
        medal = "<span class='medal'>🥉</span> ";
      } else if (peringkatScore === 3) {
        className = "top-four";
        medal = "<span class='medal'>🏅</span> ";
      } else if (peringkatScore === 4) {
        className = "top-five";
        medal = "<span class='medal'>🏅</span> ";
      }

      const row =
        "<div class='" +
        className +
        "'>" +
        "<div class='player-name'>" +
        medal +
        player[SESSION_KEYS.PLAYER] +
        "</div>" +
        "<div class='player-score'>" +
        player[SESSION_KEYS.SCORE] +
        "</div>" +
        "</div>";
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
  const inputan = document.getElementById("player-name-input");
  const klik = document.getElementById("mulai-game-button");

  if (inputan.value.length > 10) {
    tampilkanFeedback(
      "Maksimal 10 karakter, termasuk spasi, angka, & simbol",
      "incorrect"
    );
    return;
  }

  const session = loadSession();
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
