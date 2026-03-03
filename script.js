/* ================================================= */
/* PORTFOLIO MASTER SCRIPT - AGUSTÍN VILTE */
/* ================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================================================= */
  /* CURSOR SUAVE */
  /* ================================================= */

  const cursor = document.querySelector(".cursor");

  if (cursor) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  /* ================================================= */
  /* MÁQUINA DE ESCRIBIR */
  /* ================================================= */

  const typedElement = document.getElementById("typed-text");

  if (typedElement) {

    const textArray = [
      "Fullstack Developer",
      "Node.js • Backend • APIs",
      "MongoDB • Automatización • Sistemas"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentText = textArray[textIndex];

      if (!deleting) {
        typedElement.textContent = currentText.slice(0, charIndex++);
        if (charIndex > currentText.length) {
          deleting = true;
          setTimeout(typeEffect, 1200);
          return;
        }
      } else {
        typedElement.textContent = currentText.slice(0, charIndex--);
        if (charIndex === 0) {
          deleting = false;
          textIndex = (textIndex + 1) % textArray.length;
        }
      }

      setTimeout(typeEffect, deleting ? 35 : 60);
    }

    typeEffect();
  }

  /* ================================================= */
  /* SCROLL REVEAL */
  /* ================================================= */

  const revealElements = document.querySelectorAll("section, .project-card");

  if (revealElements.length > 0 && "IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(60px)";
      el.style.transition = "all 0.8s ease";
      observer.observe(el);
    });
  }

  /* ================================================= */
  /* NAVBAR EFECTO SCROLL */
  /* ================================================= */

  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("navbar-scrolled", window.scrollY > 50);
    });
  }

  /* ================================================= */
  /* NAV LINK ACTIVO */
  /* ================================================= */

  const navItems = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  if (navItems.length > 0 && sections.length > 0) {

    window.addEventListener("scroll", () => {

      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });

    });
  }

  /* ================================================= */
  /* HOVER 3D EN PROJECT CARDS */
  /* ================================================= */

  const projectCards = document.querySelectorAll(".project-card");

  if (projectCards.length > 0) {

    projectCards.forEach(card => {

      card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform =
          `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;

      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) translateY(0)";
      });

    });
  }

  /* ================================================= */
  /* WAVE 3D */
  /* ================================================= */

  const waveContainer = document.querySelector(".wave-svg");
  const paths = document.querySelectorAll(".wave-path");

  if (waveContainer && paths.length > 0) {

    let waveMouseX = 0;
    let waveMouseY = 0;
    let waveCurrentX = 0;
    let waveCurrentY = 0;

    document.addEventListener("mousemove", (e) => {
      waveMouseX = (e.clientX / window.innerWidth - 0.5);
      waveMouseY = (e.clientY / window.innerHeight - 0.5);
    });

    function animateWave() {

      waveCurrentX += (waveMouseX - waveCurrentX) * 0.08;
      waveCurrentY += (waveMouseY - waveCurrentY) * 0.08;

      waveContainer.style.transform =
        `translateY(-50%) rotateY(${waveCurrentX * 8}deg) rotateX(${waveCurrentY * -6}deg)`;

      paths.forEach((path, index) => {

        const depth = index * 15;
        const float = Math.sin(Date.now() * 0.002 + index) * 6;

        path.style.transform =
          `translateX(${waveCurrentX * 100 + depth}px)
           translateY(${waveCurrentY * 30 + float}px)`;

      });

      requestAnimationFrame(animateWave);
    }

    animateWave();
  }

  /* ================================================= */
  /* IMAGE MODAL PRO */
  /* ================================================= */

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");
  const prevBtn = document.getElementById("prevImage");
  const nextBtn = document.getElementById("nextImage");
  const images = document.querySelectorAll(".project-images img");

  if (modal && modalImg && images.length > 0) {

    let currentImageIndex = 0;

    function showImage(index) {
      if (index >= 0 && index < images.length) {
        modalImg.src = images[index].src;
        currentImageIndex = index;
      }
    }

    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        showImage(index);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showImage(currentImageIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showImage(currentImageIndex + 1);
      });
    }

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