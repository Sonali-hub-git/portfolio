document.addEventListener("DOMContentLoaded", () => {
  const roles = ["Web Developer", "SEO Specialist", "Brand Designer"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingElement = document.getElementById("typing");

  function typeWriter() {
    if (!typingElement) return;

    const currentText = roles[roleIndex];
    typingElement.textContent = currentText.substring(0, charIndex);
    let delay = isDeleting ? 40 : 90;

    if (!isDeleting) {
      charIndex++;
      if (charIndex === currentText.length) {
        isDeleting = true;
        delay = 1200;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeWriter, delay);
  }

  typeWriter();

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  function startCounter(counter) {
    const target = Number(counter.dataset.target) || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));

    function update() {
      current += step;
      if (current < target) {
        counter.textContent = current;
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    update();
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const projectModal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalTag = document.getElementById("modal-tag");
  const modalDescription = document.getElementById("modal-description");
  const modalList = document.getElementById("modal-list");
  const projectButtons = document.querySelectorAll(".project-action");

  const projectDetails = {
    business: {
      title: "Business Launch Site",
      tag: "Website",
      description: "A fast, responsive business website built for strong conversions and seamless mobile performance.",
      items: [
        "Landing page optimization",
        "SEO-friendly structure",
        "Mobile-first sections",
        "Clear call-to-action layout"
      ]
    },
    portfolio: {
      title: "Portfolio Showcase",
      tag: "Portfolio",
      description: "A modern portfolio site designed to highlight work clearly and encourage client contact.",
      items: [
        "Minimal visual design",
        "Animated interactions",
        "Project detail pages",
        "Easy editing for new work"
      ]
    },
    branding: {
      title: "Logo & Brand Identity",
      tag: "Branding",
      description: "A cohesive brand package with a memorable logo, color palette, and marketing-ready visuals.",
      items: [
        "Logo concept and refinement",
        "Color palette selection",
        "Typography system",
        "Social and presentation assets"
      ]
    }
  };

  function openProjectModal(key) {
    const project = projectDetails[key];
    if (!project || !projectModal) return;

    modalTitle.textContent = project.title;
    modalTag.textContent = project.tag;
    modalDescription.textContent = project.description;
    modalList.innerHTML = project.items.map((item) => `<li>${item}</li>`).join("");
    projectModal.classList.add("open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove("open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.project;
      openProjectModal(key);
    });
  });

  const modalClose = projectModal?.querySelector(".modal-close");
  const modalOverlay = projectModal?.querySelector(".modal-overlay");

  modalClose?.addEventListener("click", closeProjectModal);
  modalOverlay?.addEventListener("click", closeProjectModal);

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!formStatus || !contactForm) return;

    const formData = new FormData(contactForm);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();
    const method = formData.get("method")?.toString();

    if (!name || !email || !message) {
      formStatus.textContent = "Please complete all fields before sending.";
      return;
    }

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    if (method === "whatsapp") {
      const whatsappText = encodeURIComponent(
        `Hi Sonali, I would like to discuss a website project.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
      );
      window.open(`https://wa.me/8449085664?text=${whatsappText}`, "_blank");
      formStatus.textContent = "Opening WhatsApp... please send the message to complete your request.";
    } else {
      const subject = encodeURIComponent(`Website inquiry from ${name}`);
      window.location.href = `mailto:here4sonali@gmail.com?subject=${subject}&body=${body}`;
      formStatus.textContent = "Opening your email app... please send the email to complete your request.";
    }

    contactForm.reset();
    setTimeout(() => {
      formStatus.textContent = "";
    }, 7000);
  });
});
