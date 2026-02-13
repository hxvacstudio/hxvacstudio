// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobileMenu");

if (toggle && mobileMenu) {
  toggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // close mobile menu on click
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
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

// Scroll reveal
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

// Active nav highlight (based on section in view)
const navLinks = document.querySelectorAll(".nav-link");
const sections = ["home", "examples", "bundles", "reviews", "addme"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navIO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle("active", href === "#" + id);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });

sections.forEach((s) => navIO.observe(s));

// Subtle parallax (hero only)
const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector(".hero2");
const parallaxEls = document.querySelectorAll(".parallax");

if (!prefersReduce && hero && parallaxEls.length) {
  let raf = null;

  const onMove = (e) => {
    const rect = hero.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = (e.clientX - cx) / rect.width;   // -0.5..0.5ish
    const dy = (e.clientY - cy) / rect.height;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      parallaxEls.forEach((el) => {
        const depth = Number(el.getAttribute("data-depth") || 8);
        const x = dx * depth;
        const y = dy * depth;

        // Keep existing rotation on robux icons
        const isRobux = el.classList.contains("robux");
        const rot = isRobux ? (getComputedStyle(el).getPropertyValue("--rot") || "0deg") : "0deg";

        el.style.transform = `translate(${x}px, ${y}px) rotate(${rot})`;
      });
    });
  };

  const onLeave = () => {
    parallaxEls.forEach((el) => {
      el.style.transform = "";
    });
  };

  hero.addEventListener("mousemove", onMove);
  hero.addEventListener("mouseleave", onLeave);
}
