// Animate logos on scroll using GSAP + ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

gsap.from(".logo", {
  scrollTrigger: {
    trigger: ".logo-grid",
    start: "top 85%",
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.15,
  ease: "power2.out"
});
