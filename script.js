// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

// Copy Discord button
const copyBtn = document.getElementById("copyDiscord");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(".hxvac");
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy Discord"), 1200);
    } catch {
      alert("Could not copy. Discord: .hxvac");
    }
  });
}

// “Open Email Request” form (mailto)
const form = document.getElementById("requestForm");
const statusEl = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const bundle = data.get("bundle");
    const deadline = data.get("deadline") || "N/A";
    const details = data.get("details");

    // CHANGE THIS to your business email when ready:
    const to = "YOUR_EMAIL_HERE@example.com";

    const subject = encodeURIComponent(`Hxvac Studio Commission Request — ${bundle}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Bundle: ${bundle}\n` +
      `Deadline: ${deadline}\n\n` +
      `Details/Links:\n${details}\n\n` +
      `Discord: .hxvac\n`
    );

    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailto;

    if (statusEl) statusEl.textContent = "Opening your email app…";
  });
}

