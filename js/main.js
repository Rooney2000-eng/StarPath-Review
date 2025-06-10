// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 1500);
  }
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });
});

// Navigation functionality
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

// Mobile menu toggle
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// FAQ Accordion functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all FAQ items
    faqItems.forEach(faqItem => {
      faqItem.classList.remove('active');
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const business = formData.get('business');
    const service = formData.get('service');
    const message = formData.get('message');

    // Create WhatsApp message
    let whatsappMessage = `Hello, I'm ${name} and I'm interested in your services.\n\n`;
    whatsappMessage += `Email: ${email}\n`;
    if (business) whatsappMessage += `Business: ${business}\n`;
    whatsappMessage += `Service Interest: ${service}\n\n`;
    if (message) whatsappMessage += `Message: ${message}\n\n`;
    whatsappMessage += `Please get back to me. Thank you!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Open WhatsApp
    window.open(`https://wa.me/212645089208?text=${encodedMessage}`, '_blank');

    // Show success message
    showNotification('Message prepared! WhatsApp should open automatically.', 'success');

    // Reset form
    this.reset();
  });
}

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });

  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Card hover effects
document.querySelectorAll('.feature-card, .offer-card, .contact-method').forEach(card => {
  card.addEventListener('mouseenter', function() {
    if (!this.classList.contains('featured') && !this.classList.contains('primary')) {
      this.style.transform = 'translateY(-10px)';
    }
  });

  card.addEventListener('mouseleave', function() {
    if (!this.classList.contains('featured') && !this.classList.contains('primary')) {
      this.style.transform = 'translateY(0)';
    }
  });
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.visibility = 'visible';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
  }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    border-radius: 5px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    z-index: 10000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Hide notification after 5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      observer.unobserve(img);
    }
  });
});

images.forEach(img => {
  if (img.dataset.src) {
    imageObserver.observe(img);
  }
});

// Add loading states for buttons
document.querySelectorAll('a[href^="https://wa.me"]').forEach(btn => {
  btn.addEventListener('click', function() {
    const originalText = this.innerHTML;
    this.innerHTML = '<img src="images/whatsapp.png" alt="WhatsApp" class="btn-icon"> Opening WhatsApp...';
    this.style.opacity = '0.7';

    setTimeout(() => {
      this.innerHTML = originalText;
      this.style.opacity = '1';
    }, 3000);
  });
});

// Counter animation for numbers
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);

    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// Observe counters and animate when in view
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.dataset.target);
      animateCounter(counter, target);
      counterObserver.unobserve(counter);
    }
  });
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// Parallax effect for hero sections
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-bg-image, .page-hero-bg-image');

  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Form validation enhancement
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
  input.addEventListener('blur', function() {
    if (this.hasAttribute('required') && !this.value.trim()) {
      this.style.borderColor = '#f44336';
      this.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
    } else {
      this.style.borderColor = '#eee';
      this.style.boxShadow = 'none';
    }
  });

  input.addEventListener('focus', function() {
    this.style.borderColor = '#667eea';
    this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
  });
});

// Add page transition effects
window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.3s ease';
});
