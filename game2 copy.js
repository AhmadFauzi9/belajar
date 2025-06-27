const logos = [
  {
    nama: "luffy",
    gambar:
      "https://cineverse.id/wp-content/uploads/2023/08/timeskip-one-piece-awal-mula-new-world.jpg",
  },
  {
    nama: "zoro",
    gambar:
      "https://cdn.oneesports.id/cdn-data/sites/2/2023/11/Anime_OnePiece_StrawHatPirates_RoronoaZoro_PostTimeskip_Wallpaper-1024x576-1.jpg",
  },
  {
    nama: "sanji",
    gambar:
      "https://cdn.oneesports.gg/cdn-data/2023/10/Anime_OnePiece_StrawHatPirates_Sanji_PostTimeskip_Wallpaper3.jpg",
  },
  {
    nama: "nami",
    gambar:
      "https://awsimages.detik.net.id/community/media/visual/2021/11/30/nami-one-piece.jpeg?w=1200",
  },
  {
    nama: "chopper",
    gambar:
      "https://i.pinimg.com/originals/23/62/50/236250f1055a352c4a0cd5e0a21aaf33.jpg",
  },
];

// Inisialisasi nilai blur awal secara global
logos.forEach((logo) => {
  logo.blur = 5;
});

const imgChampion = new Image();
imgChampion.src =
  "https://i.pinimg.com/originals/a5/da/be/a5dabea9202dcfef09cb11340fd86192.gif";

document.getElementById("tebakan").focus();

let skor = 0;
let level = 0;
let nyawa = 3;
let nilaiBlur = 5;

const session = loadSession();
if (session !== null) {
  // playerName = session.playerName;
  // skor = session.skor;
  // level = session.level;
  // nyawa = session.nyawa;
  // nilaiBlur = session.nilaiBlur;
  playerName = session.currentPlayer;
  skor = session.currentSkor;
  level = session.currentLevel;
  nyawa = session.currentNyawa;
  nilaiBlur = session.currentBlur;
  logos[level].blur = nilaiBlur;

  document.getElementById("player-name").textContent = playerName;

  console.log("nilai blur", logos[level].blur, "=", typeof logos[level].blur);
  console.log(
    "level dari session:",
    session.currentLevel,
    " | jumlah logo:",
    logos.length
  );
}

const highScore = localStorage.getItem("highScore");
const highLevel = localStorage.getItem("highLevel");
if (highScore !== null || highLevel !== null) {
  document.getElementById("high-score").textContent = highScore;
  document.getElementById("high-level").textContent = parseInt(highLevel) + 1;
}

updateGame();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.filter = `blur(${logos[level].blur}px)`;

// sudah dideklarasikan secara global
// dan diinisialisasi dengan DOMContentLoaded di common.js
// const feedbackMessageDiv = document.getElementById("feedback-message");

const img = new Image();
img.src = logos[level].gambar;
img.onload = () => applyBlur();

function masukkanJawaban() {
  const tebakan = document.getElementById("tebakan").value.toLowerCase().trim();

  if (!tebakan || tebakan === "") {
    tampilkanFeedback("Masukkan jawabanmu!", "incorrect");
    return;
  }

  document.getElementById("tebakan").focus();

  if (tebakan === logos[level].nama) {
    skor += 10;
    tampilkanFeedback("Jawaban Benar! Skor +10", "correct");

    document.getElementById("skor").textContent = skor;
    document.getElementById("tebakan").value = "";
    document.getElementById("tebakan").focus();

    if (level < logos.length - 1) {
      level++;
      document.getElementById("level").textContent = level + 1;

      nilaiBlur = Math.min(20, logos[level - 1].blur + 2);
      logos[level].blur = nilaiBlur;

      img.src = logos[level].gambar;
      img.onload = () => applyBlur();

      progressGame();

      // const latestSession = loadSession();
      // console.log("nilai blur", nilaiBlur, "=", typeof nilaiBlur);
      // console.log("level dari session:", latestSession.currentLevel, " | jumlah logo:", logos.length);
    } else {
      saveHighScore();

      document.getElementById("winner").textContent = "WINNER!";

      document.getElementById("canvas").style.display = "none";
      document.getElementById("champion-gif").style.display = "block";

      // document.getElementById("tebakan").disabled = true;
      // document.getElementById("tombol").disabled = true;

      resetGame();
    }
    progressGame();
  } else {
    nyawa--;
    totalNyawa();

    skor -= 2;
    tampilkanFeedback("Jawaban Salah! Skor -2 Nyawa -1", "incorrect");
    document.getElementById("skor").textContent = skor;

    nilaiBlur = Math.max(5, logos[level].blur - 1);
    logos[level].blur = nilaiBlur;
    applyBlur();

    console.log("nilai blur", nilaiBlur, "=", typeof nilaiBlur);

    document.getElementById("tebakan").value = "";
    document.getElementById("tebakan").focus();

    if (nyawa === 0) {
      saveHighScore();

      document.getElementById("gameover").textContent = "Game Over!";

      document.getElementById("canvas").style.display = "none";
      document.getElementById("tebakan").disabled = true;
      document.getElementById("tombol").disabled = true;

      resetSession();
      // backToHome();
      // resetGame();
      return;
    } else {
      progressGame();
    }
    updateGame();
  }
}

function resetBlur() {
  logos[level].blur = 5;
  img.src = logos[level].gambar;
  img.onload = () => applyBlur();
}

function applyBlur() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // bersihkan sebelum gambar ulang
  ctx.filter = `blur(${logos[level].blur}px)`;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function totalNyawa() {
  document.getElementById("nyawa").textContent =
    "💖".repeat(nyawa) + "🖤".repeat(3 - nyawa);
}

function progressGame() {
  const session = {
    currentSkor: skor,
    currentLevel: level,
    currentNyawa: nyawa,
    currentBlur: nilaiBlur,
    currentPlayer: playerName,
    // skor: skor,
    // level: level,
    // nyawa: nyawa,
    // nilaiBlur: nilaiBlur,
    // playerName: playerName,
  };
  const encodedSession = JSON.stringify(session);
  localStorage.setItem("session", encodedSession);
}

function resetSession() {
  localStorage.removeItem("session");
}

function updateGame() {
  document.getElementById("skor").textContent = skor;
  document.getElementById("level").textContent = level + 1; // + 1 untuk menampilkan level mulai lv 1
  totalNyawa();
}

function saveHighScore() {
  const highScore = localStorage.getItem("highScore");
  const highLevel = localStorage.getItem("highLevel");

  if (highScore === null || skor > parseInt(highScore)) {
    localStorage.setItem("highScore", skor.toString());
  }

  if (highLevel === null || level > parseInt(highLevel)) {
    localStorage.setItem("highLevel", level.toString());
  }

  document.getElementById("high-score").textContent = skor;
  document.getElementById("high-level").textContent = parseInt(level) + 1;
}

function resetGame() {
  if (level == logos.length - 1) {
    skor = 0;
    level = 0;
    nyawa = 3;
    nilaiBlur = 5;

    logos.forEach((logo) => (logo.blur = 5));
    img.src = logos[level].gambar;
    img.onload = () => applyBlur();

    resetSession();
    updateGame();

    document.getElementById("champion-gif").style.display = "none";
    canvas.style.display = "block";

    document.getElementById("gameover").textContent = "";
    document.getElementById("winner").textContent = "";

    document.getElementById("skor").textContent = skor;
    document.getElementById("level").textContent = level + 1;

    img.src = logos[level].gambar;
    img.onload = () => applyBlur();

    document.getElementById("tebakan").disabled = false;
    document.getElementById("tombol").disabled = false;
    document.getElementById("tebakan").value = "";
    document.getElementById("tebakan").focus();
  }
}

function backToHome() {}
