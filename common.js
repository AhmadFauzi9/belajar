// Konstanta nama properti session
const SESSION_KEYS = {
  PLAYER: "namaPlayer",
  SCORE: "skor",
  LEVEL: "level",
  NYAWA: "nyawa",
  BLUR: "nilaiBlur",
  SESSION: "session",
  HIGH_SCORE: "highScore",
  HIGH_LEVEL: "highLevel",
};

// Deklarasi secara Global feedbackMessageDiv
let feedbackMessageDiv;
document.addEventListener("DOMContentLoaded", () => {
  feedbackMessageDiv = document.getElementById("feedback-message");
});

function tampilkanFeedback(message, type) {
  if (!feedbackMessageDiv) {
    feedbackMessageDiv = document.getElementById("feedback-message");
  }

  if (feedbackMessageDiv) {
    feedbackMessageDiv.textContent = message; // set pesan feedbackMessageDiv
    feedbackMessageDiv.style.display = "block";
    feedbackMessageDiv.style.opacity = 1; // tampilkan pesan feedbackMessageDiv
    feedbackMessageDiv.className = type; // untuk set class di css

    setTimeout(() => {
      feedbackMessageDiv.style.opacity = 0; // sembunyikan pesan feedbackMessageDiv
      feedbackMessageDiv.style.display = "none";
    }, 3000);
  }
}

function loadSession() {
  const encodedSession = localStorage.getItem("session");
  if (encodedSession === null) {
    return null;
  }
  return JSON.parse(encodedSession);
}
