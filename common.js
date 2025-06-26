let feedbackMessageDiv;
document.addEventListener("DOMContentLoaded", () => {
  feedbackMessageDiv = document.getElementById("feedback-messege");
});

function tampilkanFeedback(message, type) {
  if (!feedbackMessageDiv) {
    feedbackMessageDiv = document.getElementById("feedback-messege");
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
