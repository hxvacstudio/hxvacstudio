// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => io.observe(el));

// Optional: highlight active nav link while scrolling
const sections = ["home", "examples", "bundles", "reviews"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navLinks = Array.from(document.querySelectorAll(".navlink"));

function setActiveLink() {
  const y = window.scrollY + 120; // offset for sticky nav
  let currentId = "home";

  for (const sec of sections) {
    if (sec.offsetTop <= y) currentId = sec.id;
  }

  navLinks.forEach(a => {
    const href = a.getAttribute("href");
    a.style.textDecoration = (href === `#${currentId}`) ? "underline" : "none";
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();
