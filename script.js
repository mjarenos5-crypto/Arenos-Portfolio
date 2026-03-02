// Initialize variables first
const cursorGlow = document.getElementById('cursorGlow');
const scrollProgress = document.getElementById('scrollProgress');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let mouseX = 0;
let mouseY = 0;

// Mouse follower
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  if (cursorGlow) {
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Scroll progress
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${progress})`;
  }
}
window.addEventListener('scroll', updateScrollProgress);

// Mobile menu toggle
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Reveal on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Animate skill bars
      const skillFill = entry.target.querySelector('.skill-fill');
      if (skillFill) {
        const width = skillFill.dataset.width;
        if (width) {
          skillFill.style.transform = `scaleX(${width / 100})`;
          skillFill.classList.add('animate');
        }
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Reduced motion check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('active');
  });
  if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }
}
