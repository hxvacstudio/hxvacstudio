// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobileMenu");

if (toggle && mobileMenu) {
  toggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Copy Discord handle
document.querySelectorAll(".copy-discord").forEach((el) => {
  el.addEventListener("click", async () => {
    const text = el.getAttribute("data-copy") || ".hxvac";
    try {
      await navigator.clipboard.writeText(text);
      const original = el.textContent;
      el.textContent = "Copied!";
      setTimeout(() => (el.textContent = original), 900);
    } catch {
      alert("Discord: " + text);
    }
  });
});

// Fade/pop reveal on scroll
const revealEls = document.querySelectorAll(".reveal");

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => io.observe(el));
