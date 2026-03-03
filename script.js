/* ================================================= */
/* PORTFOLIO SCRIPT PRO VERSION */
/* ================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================================================= */
  /* TYPEWRITER EFFECT */
  /* ================================================= */

  const typedElement = document.getElementById("typed-text");

  if (typedElement) {

    const texts = [
      "Fullstack Developer",
      "Node.js • Backend • APIs",
      "MongoDB • Automatización • Sistemas"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

      const current = texts[textIndex];

      if (!deleting) {
        typedElement.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
          deleting = true;
          setTimeout(typeEffect, 1200);
          return;
        }
      } else {
        typedElement.textContent = current.substring(0, charIndex--);
        if (charIndex === 0) {
          deleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }

      setTimeout(typeEffect, deleting ? 40 : 70);
    }

    typeEffect();
  }

  /* ================================================= */
  /* SCROLL REVEAL (INTERSECTION OBSERVER) */
  /* ================================================= */

  const revealElements = document.querySelectorAll("section, .project-card");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          entry.target.classList.remove("reveal-hidden");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
      el.classList.add("reveal-hidden");
      observer.observe(el);
    });

  }

  /* ================================================= */
  /* NAV LINK ACTIVO SEGÚN SCROLL */
  /* ================================================= */

  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  if (navLinks.length && sections.length) {

    window.addEventListener("scroll", () => {

      let current = "";

      sections.forEach(section => {
        const top = section.offsetTop - 200;
        const height = section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });

    });

  }

  /* ================================================= */
  /* IMAGE MODAL FIX DEFINITIVO */
  /* ================================================= */

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");
  const projectImages = document.querySelectorAll(".project-images img");

  if (modal && modalImg && closeModal && projectImages.length > 0) {

    projectImages.forEach(img => {
      img.addEventListener("click", () => {
        modal.classList.add("active");
        modalImg.src = img.src;
        document.body.style.overflow = "hidden";
      });
    });

    closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

  }

});