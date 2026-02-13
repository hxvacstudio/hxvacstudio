// =========================
// Hxvac Studio - script.js
// =========================

(function () {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Trigger hero entrance once everything is ready
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // Reveal-on-scroll
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => io.observe(el));
})();
