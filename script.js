/* ================================================= */
/* PORTFOLIO SCRIPT CLEAN VERSION */
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

    function type() {

      const currentText = texts[textIndex];

      if (!deleting) {
        typedElement.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
          deleting = true;
          setTimeout(type, 1200);
          return;
        }
      } else {
        typedElement.textContent = currentText.substring(0, charIndex--);
        if (charIndex === 0) {
          deleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }

      setTimeout(type, deleting ? 40 : 70);
    }

    type();
  }

  /* ================================================= */
  /* SCROLL REVEAL (SUAVE Y ESTABLE) */
  /* ================================================= */

  const revealElements = document.querySelectorAll("section, .project-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        entry.target.classList.remove("reveal-hidden");
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => {
    el.classList.add("reveal-hidden");
    observer.observe(el);
  });

  /* ================================================= */
  /* NAV LINK ACTIVO SEGÚN SCROLL */
  /* ================================================= */

  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });

  });

  /* ================================================= */
  /* IMAGE MODAL FUNCIONAL */
  /* ================================================= */

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");
  const projectImages = document.querySelectorAll(".project-images img");

  if (modal && modalImg && projectImages.length > 0) {

    projectImages.forEach(img => {
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
      });
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.style.display = "none";
      }
    });

  }

});