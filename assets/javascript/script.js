// Modal functionality
const modals = {
  terms: document.getElementById("termsModal"),
  privacy: document.getElementById("privacyModal"),
};

const modalTriggers = {
  terms: document.getElementById("termsLink"),
  privacy: document.getElementById("privacyLink"),
};

// Open modal function
function openModal(modal) {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Focus management for accessibility
  const closeBtn = modal.querySelector(".close");
  if (closeBtn) {
    closeBtn.focus();
  }
}

// Close modal function
function closeModal(modal) {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  Object.values(modals).forEach((modal) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

// Close modal with escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    Object.values(modals).forEach((modal) => {
      if (modal.style.display === "block") {
        closeModal(modal);
      }
    });
  }
});

// Event listeners for modal triggers
Object.entries(modalTriggers).forEach(([key, trigger]) => {
  if (trigger && modals[key]) {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modals[key]);
    });
  }
});

// Close button event listeners
Object.values(modals).forEach((modal) => {
  const closeBtn = modal.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeModal(modal);
    });
  }
});

// Smooth scroll for anchor links - Fixed selector issue
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");

    // Only proceed if href is not just "#"
    if (href && href !== "#") {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Add loading animation to download buttons
const downloadButtons = document.querySelectorAll(".download-btn");
downloadButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    if (this.href === "#") {
      e.preventDefault();

      // Add loading state
      this.classList.add("loading");
      const originalText = this.querySelector(".large-text").textContent;
      this.querySelector(".large-text").textContent = "Loading...";

      // Simulate loading (replace with actual app store redirect)
      setTimeout(() => {
        this.classList.remove("loading");
        this.querySelector(".large-text").textContent = originalText;

        // Show a message or redirect
        if (this.classList.contains("app-store")) {
          alert("App Store link will be added here");
        }
      }, 1000);
    }
  });
});

// Add hover effects for social icons
const socialIcons = document.querySelectorAll(".social-icon");
socialIcons.forEach((icon) => {
  icon.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });

  icon.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// Performance optimization: Lazy load non-critical resources
document.addEventListener("DOMContentLoaded", () => {
  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".logo, .tagline, .download-btn"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartY - touchEndY;

  if (Math.abs(diff) > swipeThreshold) {
    // Close modals on swipe down
    if (diff < 0) {
      Object.values(modals).forEach((modal) => {
        if (modal.style.display === "block") {
          closeModal(modal);
        }
      });
    }
  }
}
