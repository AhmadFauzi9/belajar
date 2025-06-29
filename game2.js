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
let playerName = "";

const session = loadSession();
if (session !== null) {
  playerName = session[SESSION_KEYS.PLAYER];
  skor = session[SESSION_KEYS.SCORE];
  level = session[SESSION_KEYS.LEVEL];
  nyawa = session[SESSION_KEYS.NYAWA];
  nilaiBlur = session[SESSION_KEYS.BLUR];
  logos[level].blur = nilaiBlur;

  document.getElementById("player-name").textContent = playerName;

  console.log("nilai blur", logos[level].blur, "=", typeof logos[level].blur);
  console.log(
    "level dari session:",
    session[SESSION_KEYS.LEVEL],
    " | jumlah logo:",
    logos.length
  );
} else {
  window.location.replace("index.html");
}

const highScore = localStorage.getItem(SESSION_KEYS.HIGH_SCORE);
const highLevel = localStorage.getItem(SESSION_KEYS.HIGH_LEVEL);
if (highScore !== null || highLevel !== null) {
  document.getElementById("high-score").textContent = highScore;
  document.getElementById("high-level").textContent = parseInt(highLevel) + 1;
}

updateGame();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.filter = `blur(${logos[level].blur}px)`;

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
    tampilkanFeedback("✅ Jawaban Benar! Skor +10", "correct");

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

      // Untuk debugging -----------------------------------------------
      const cekSession = loadSession();
      console.log("nilai blur", nilaiBlur, "=", typeof nilaiBlur);
      console.log(
        "level session:",
        cekSession[SESSION_KEYS.LEVEL],
        " | jumlah logo:",
        logos.length
        // Untuk debugging -----------------------------------------------
      );
    } else {
      saveHighScore();

      setTimeout(() => {
        document.getElementById("winner").textContent = "WINNER!";
        document.getElementById("winner").style.display = "block";

        document.getElementById("canvas").style.display = "none";
        document.getElementById("champion-gif").style.display = "block";

        document.getElementById("tebakan").disabled = true;
        document.getElementById("tombol").disabled = true;
      }, 3000);

      resetGame();
    }
    progressGame();
  } else {
    nyawa--;
    totalNyawa();

    skor -= 2;
    tampilkanFeedback("❎ Jawaban Salah! Skor -2 Nyawa -1", "incorrect");
    document.getElementById("skor").textContent = skor;

    nilaiBlur = Math.max(5, logos[level].blur - 1);
    logos[level].blur = nilaiBlur;
    applyBlur();

    document.getElementById("tebakan").value = "";
    document.getElementById("tebakan").focus();

    // Untuk debugging -----------------------------------------------
    console.log("nilai blur = ", nilaiBlur, "| sisa nyawa = ", nyawa);
    // Untuk debugging -----------------------------------------------

    if (nyawa === 0) {
      saveHighScore();

      document.getElementById("gameover").textContent = "Game Over!";
      document.getElementById("gameover").style.display = "block";

      document.getElementById("canvas").style.display = "none";
      document.getElementById("tebakan").disabled = true;
      document.getElementById("tombol").disabled = true;

      resetSession();

      setTimeout(() => {
        feedbackGameover(
          "Kembali ke halaman utama dalam 3 detik!",
          "incorrect"
        );
        backTohome();
      }, 1000);
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
    [SESSION_KEYS.PLAYER]: playerName,
    [SESSION_KEYS.SCORE]: skor,
    [SESSION_KEYS.LEVEL]: level,
    [SESSION_KEYS.NYAWA]: nyawa,
    [SESSION_KEYS.BLUR]: nilaiBlur,
  };
  const encodedSession = JSON.stringify(session);
  localStorage.setItem(SESSION_KEYS.SESSION, encodedSession);
}

function resetSession() {
  localStorage.removeItem(SESSION_KEYS.SESSION);
}

function updateGame() {
  document.getElementById("skor").textContent = skor;
  document.getElementById("level").textContent = level + 1; // + 1 untuk menampilkan level mulai lv 1
  totalNyawa();
}

function saveHighScore() {
  const highScore = localStorage.getItem(SESSION_KEYS.HIGH_SCORE);
  const highLevel = localStorage.getItem(SESSION_KEYS.HIGH_LEVEL);

  if (highScore === null || skor > parseInt(highScore)) {
    localStorage.setItem(SESSION_KEYS.HIGH_SCORE, skor.toString());
  }

  if (highLevel === null || level > parseInt(highLevel)) {
    localStorage.setItem(SESSION_KEYS.HIGH_LEVEL, level.toString());
  }

  document.getElementById("high-score").textContent = skor;
  document.getElementById("high-level").textContent = parseInt(level) + 1;

  let encodeTopScore = localStorage.getItem(SESSION_KEYS.TOP_SCORE);

  let topScore = [];
  if (encodeTopScore !== null) {
    topScore = JSON.parse(encodeTopScore);
  }

  topScore.push({
    [SESSION_KEYS.PLAYER]: playerName,
    [SESSION_KEYS.SCORE]: skor,
  });

  encodeTopScore = JSON.stringify(topScore);

  localStorage.setItem(SESSION_KEYS.TOP_SCORE, encodeTopScore);
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

function backTohome(delay = 3000) {
  setTimeout(() => {
    window.location.replace("index.html");
  }, delay);
}
