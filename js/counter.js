// ======================
// Counter Animation
// ======================
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 100; // lower = faster

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const update = () => {
        const value = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (value < target) {
          counter.innerText = value + increment;
          setTimeout(update, 20);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  };

  // Trigger when section enters viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect(); // run once
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector(".about-stats");
  if (statsSection) observer.observe(statsSection);
});
