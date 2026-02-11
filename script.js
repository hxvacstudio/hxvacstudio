// Year in footer
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

// Copy Discord anywhere it appears
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
