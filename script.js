// Toggle navigation on mobile
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    navLinks.classList.remove("open");
  });
});

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
