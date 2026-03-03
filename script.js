/* ================================================= */
/* PORTFOLIO MASTER SCRIPT - AGUSTÍN VILTE */
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
        typedElement.textContent = current.slice(0, charIndex++);
        if (charIndex > current.length) {
          deleting = true;
          setTimeout(typeEffect, 1200);
          return;
        }
      } else {
        typedElement.textContent = current.slice(0, charIndex--);
        if (charIndex === 0) {
          deleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }

      setTimeout(typeEffect, deleting ? 35 : 60);
    }

    typeEffect();
  }

  /* ================================================= */
  /* SCROLL REVEAL (OPTIMIZADO) */
  /* ================================================= */

  const revealElements = document.querySelectorAll("section, .project-card");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
      el.classList.add("reveal-hidden");
      observer.observe(el);
    });
  }

  /* ================================================= */
  /* NAVBAR SCROLL EFFECT */
  /* ================================================= */

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("navbar-scrolled", window.scrollY > 50);
    }
  });

  /* ================================================= */
  /* ACTIVE NAV LINK (MEJORADO) */
  /* ================================================= */

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  function setActiveLink() {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);

  /* ================================================= */
  /* 3D HOVER PROJECT CARDS */
  /* ================================================= */

  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) translateY(0)";
    });

  });

  /* ================================================= */
  /* IMAGE MODAL */
  /* ================================================= */

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");
  const images = document.querySelectorAll(".project-images img");

  if (modal && modalImg && images.length > 0) {

    images.forEach(img => {
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
      });
    });

    if (closeModal) {
      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }

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