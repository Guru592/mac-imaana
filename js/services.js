// Mac Imaana — Services Scroll Activation

document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector(".intro");
  const cards = document.querySelectorAll(".service-card");

  // Intro fade-in (safe check)
  if (intro) {
    const introObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.5 }
    );
    introObserver.observe(intro);
  }

  // Service card fade/slide-in
  if (cards.length > 0) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach((card) => cardObserver.observe(card));
  }
});
