document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const progress = document.getElementById("scrollProgress");
  const year = document.getElementById("year");
  year.textContent = new Date().getFullYear();

  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${scrollable > 0 ? (scrollTop / scrollable) * 100 : 0}%`;
    navbar.classList.toggle("scrolled", scrollTop > 30);
  };
  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });

  // Reveal sections as they enter the viewport.
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Animate skill bars when the skills section is visible.
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".progress-fill").forEach(bar => {
          bar.style.width = bar.dataset.width || "0%";
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  const skillsSection = document.getElementById("skills");
  if (skillsSection) skillObserver.observe(skillsSection);

  // Close mobile navigation after a link is selected.
  document.querySelectorAll("#navLinks .nav-link, #navLinks .btn-nav").forEach(link => {
    link.addEventListener("click", () => {
      const navCollapse = document.getElementById("navLinks");
      if (navCollapse.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  // Contact form creates a pre-filled email draft; no backend is implied.
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const service = data.get("service");
    const message = data.get("message").trim();
    const subject = encodeURIComponent(`Portfolio inquiry: ${service}`);
    const body = encodeURIComponent(
      `Hello Faizan,\n\nMy name is ${name} (${email}).\n\nService needed: ${service}\n\nProject details:\n${message}\n\nThank you.`
    );
    feedback.textContent = "Opening your email app with a prepared message…";
    window.location.href = `mailto:mfaizanamjad144@gmail.com?subject=${subject}&body=${body}`;
  });
});
