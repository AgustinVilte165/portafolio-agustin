/* ================================================= */
/* PORTFOLIO SCRIPT - FINAL PRO VERSION */
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

      setTimeout(typeEffect, deleting ? 35 : 65);
    }

    typeEffect();
  }

  /* ================================================= */
  /* SCROLL REVEAL (OPTIMIZADO) */
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
  /* NAVBAR SHRINK + ACTIVE LINK */
  /* ================================================= */

  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {

    /* Shrink Navbar */
    if (window.scrollY > 60) {
      navbar.style.padding = "12px 8%";
      navbar.style.background = "rgba(5,5,15,0.9)";
    } else {
      navbar.style.padding = "18px 8%";
      navbar.style.background = "rgba(5,5,15,0.75)";
    }

    /* Active link */
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

  /* ================================================= */
  /* IMAGE MODAL PRO FIXED */
  /* ================================================= */

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");
  const projectImages = document.querySelectorAll(".project-images img");

  if (modal && modalImg && closeModal && projectImages.length > 0) {

    function openModal(src) {
      modal.classList.add("active");
      modalImg.src = src;
      document.body.style.overflow = "hidden";
    }

    function closeModalFunc() {
      modal.classList.remove("active");
      modalImg.src = "";
      document.body.style.overflow = "auto";
    }

    projectImages.forEach(img => {
      img.addEventListener("click", () => {
        openModal(img.src);
      });
    });

    closeModal.addEventListener("click", closeModalFunc);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModalFunc();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModalFunc();
      }
    });
  }

});