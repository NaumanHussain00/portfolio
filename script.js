// ==================== NAVIGATION TOGGLE ====================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ==================== STICKY NAVBAR ====================
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
    return;
  }

  if (currentScroll > lastScroll) {
    // Scrolling down
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up
    navbar.style.transform = "translateY(0)";
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5)";
  }

  lastScroll = currentScroll;
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll("section");

function updateActiveLink() {
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink(); // Call once on load

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all elements that should fade in
const fadeElements = document.querySelectorAll(`
    .education-card,
    .timeline-item,
    .project-card,
    .skill-category,
    .extra-card,
    .contact-card
`);

fadeElements.forEach((el) => {
  el.classList.add("fade-in");
  observer.observe(el);
});

// ==================== TYPING EFFECT ====================
const heroSubtitle = document.querySelector(".hero-subtitle");
const subtitleText = heroSubtitle.textContent;
heroSubtitle.textContent = "";

let charIndex = 0;
function typeText() {
  if (charIndex < subtitleText.length) {
    heroSubtitle.textContent += subtitleText.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100);
  }
}

// Start typing effect after a short delay
setTimeout(typeText, 500);

// ==================== SKILL TAG ANIMATION ====================
const skillTags = document.querySelectorAll(".skill-tag");

skillTags.forEach((tag, index) => {
  tag.style.animationDelay = `${index * 0.05}s`;
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".hero-image");

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ==================== PROJECT CARD TILT EFFECT ====================
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ==================== CURSOR TRAIL EFFECT ====================
const cursorDot = document.createElement("div");
cursorDot.className = "cursor-dot";
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement("div");
cursorOutline.className = "cursor-outline";
document.body.appendChild(cursorOutline);

// Add cursor styles dynamically
const cursorStyle = document.createElement("style");
cursorStyle.textContent = `
    .cursor-dot, .cursor-outline {
        pointer-events: none;
        position: fixed;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        opacity: 0.5;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 10000;
    }
    
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: var(--primary-color);
    }
    
    .cursor-outline {
        width: 40px;
        height: 40px;
        border: 2px solid var(--primary-color);
        transition: width 0.3s, height 0.3s, opacity 0.3s;
    }
    
    @media (max-width: 768px) {
        .cursor-dot, .cursor-outline {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);

let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener("mousemove", (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function animateCursor() {
  // Smooth cursor dot movement
  dotX += (cursorX - dotX) * 0.8;
  dotY += (cursorY - dotY) * 0.8;
  cursorDot.style.left = dotX + "px";
  cursorDot.style.top = dotY + "px";

  // Smooth cursor outline movement
  outlineX += (cursorX - outlineX) * 0.2;
  outlineY += (cursorY - outlineY) * 0.2;
  cursorOutline.style.left = outlineX + "px";
  cursorOutline.style.top = outlineY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Scale cursor on hover
const hoverElements = document.querySelectorAll(
  "a, button, .btn, .project-card, .skill-tag"
);
hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
    cursorOutline.style.width = "60px";
    cursorOutline.style.height = "60px";
  });

  element.addEventListener("mouseleave", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
    cursorOutline.style.width = "40px";
    cursorOutline.style.height = "40px";
  });
});

// ==================== LOADING ANIMATION ====================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ==================== FLOATING BADGES ANIMATION ====================
const floatingBadges = document.querySelectorAll(".floating-badge");

floatingBadges.forEach((badge, index) => {
  const randomDelay = Math.random() * 2;
  const randomDuration = 2 + Math.random() * 2;

  badge.style.animation = `bounce ${randomDuration}s ease-in-out infinite`;
  badge.style.animationDelay = `${randomDelay}s`;
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = "scroll-top-btn";
document.body.appendChild(scrollTopBtn);

// Add scroll to top button styles
const scrollTopStyle = document.createElement("style");
scrollTopStyle.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-1);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        pointer-events: all;
    }
    
    .scroll-top-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(14, 84, 132, 0.5);
    }
    
    @media (max-width: 768px) {
        .scroll-top-btn {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(scrollTopStyle);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ==================== CONSOLE MESSAGE ====================
console.log(
  "%c👨‍💻 Welcome to Nauman Hussain's Portfolio!",
  "color: #0E5484; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cInterested in the code? Check out my GitHub: https://github.com/NaumanHussain00",
  "color: #0F4539; font-size: 14px;"
);

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
window.addEventListener(
  "scroll",
  debounce(() => {
    updateActiveLink();
  }, 10)
);

// ==================== ACCESSIBILITY IMPROVEMENTS ====================
// Add keyboard navigation for mobile menu
hamburger.addEventListener("keypress", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    hamburger.click();
  }
});

// Focus management for mobile menu
navMenu.addEventListener("transitionend", () => {
  if (navMenu.classList.contains("active")) {
    navLinks[0].focus();
  }
});

// ==================== THEME DETECTION ====================
// Detect user's system theme preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (prefersDarkScheme.matches) {
  document.body.classList.add("dark-theme");
} else {
  document.body.classList.add("light-theme");
}

// Listen for theme changes
prefersDarkScheme.addEventListener("change", (e) => {
  if (e.matches) {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
  } else {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
  }
});

// ==================== ERROR HANDLING ====================
window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error);
});

// ==================== SERVICE WORKER REGISTRATION (for PWA) ====================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered:', registration))
    //     .catch(error => console.log('SW registration failed:', error));
  });
}
