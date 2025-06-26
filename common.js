function loadSession() {
  const encodeSession = localStorage.getItem("session");
  if (encodeSession === null) {
    return null;
  }
  return JSON.parse(encodeSession);
}

function tampilkanFeedback(message, type) {
  feedbackMessageDiv.textContent = message; // set pesan feedbackMessageDiv
  feedbackMessageDiv.style.display = "block";
  feedbackMessageDiv.style.opacity = 1; // tampilkan pesan feedbackMessageDiv
  feedbackMessageDiv.className = type; // untuk set class di css

  setTimeout(() => {
    feedbackMessageDiv.style.opacity = 0; // sembunyikan pesan feedbackMessageDiv
    feedbackMessageDiv.style.display = "none";
  }, 3000);
}
