// ===== Navbar Interactions =====
const hamburger = document.getElementById("hamburger");
const overlay = document.getElementById("menu-overlay");

if (hamburger && overlay) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  // Close overlay when a link is clicked
  document.querySelectorAll(".menu-content a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
}
