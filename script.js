/* ================================================= */
/* PORTFOLIO SCRIPT - ELITE VERSION */
/* ================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================================================= */
  /* HERO FADE IN SUAVE */
  /* ================================================= */

  const hero = document.querySelector(".hero-content");
  if (hero) {
    hero.style.opacity = "0";
    hero.style.transform = "translateY(40px)";
    setTimeout(() => {
      hero.style.transition = "all 1.2s ease";
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    }, 200);
  }

  /* ================================================= */
  /* TYPEWRITER PROFESIONAL */
  /* ================================================= */

  const typedElement = document.getElementById("typed-text");

  if (typedElement) {

    const texts = [
      "Arquitectura backend escalable",
      "APIs seguras con JWT",
      "MongoDB • Node.js • Producción"
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
          setTimeout(typeEffect, 1400);
          return;
        }
      } else {
        typedElement.textContent = current.slice(0, charIndex--);
        if (charIndex === 0) {
          deleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }

      setTimeout(typeEffect, deleting ? 35 : 55);
    }

    typeEffect();
  }

  /* ================================================= */
  /* CONTADORES ANIMADOS (IMPACT) */
  /* ================================================= */

  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 1500;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    let current = 0;

    const update = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  };

  if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  /* ================================================= */
  /* SCROLL REVEAL */
  /* ================================================= */

  const revealElements = document.querySelectorAll("section, .project-card");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          entry.target.classList.remove("reveal-hidden");
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => {
      el.classList.add("reveal-hidden");
      revealObserver.observe(el);
    });
  }

  /* ================================================= */
  /* NAVBAR DINÁMICA + ACTIVE LINK */
  /* ================================================= */

  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {

    /* Navbar efecto */
    if (window.scrollY > 60) {
      navbar.style.padding = "12px 8%";
      navbar.style.background = "rgba(5,5,15,0.95)";
    } else {
      navbar.style.padding = "18px 8%";
      navbar.style.background = "rgba(5,5,15,0.8)";
    }

    /* Active link */
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight) {
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
  /* PARALLAX SUTIL EN BACKGROUND */
  /* ================================================= */

  const bg = document.querySelector(".bg-blur");

  window.addEventListener("mousemove", (e) => {
    if (!bg) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    bg.style.transform = `translate(${x}px, ${y}px)`;
  });

  /* ================================================= */
  /* MODAL IMÁGENES ESTABLE */
  /* ================================================= */

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");
  const projectImages = document.querySelectorAll(".project-images img");

  if (modal && modalImg && closeModal && projectImages.length > 0) {

    const openModal = (src) => {
      modal.classList.add("active");
      modalImg.src = src;
      document.body.style.overflow = "hidden";
    };

    const closeModalFunc = () => {
      modal.classList.remove("active");
      modalImg.src = "";
      document.body.style.overflow = "auto";
    };

    projectImages.forEach(img => {
      img.addEventListener("click", () => openModal(img.src));
    });

    closeModal.addEventListener("click", closeModalFunc);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModalFunc();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModalFunc();
    });

  }

});