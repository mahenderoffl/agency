// Professional startup-grade JavaScript for WaveSeed Growth
// Focus: Precise countdown, smooth animations, performance-optimized

class WaveSeedLaunch {
  constructor() {
    this.targetDate = new Date('2026-02-15T00:00:00').getTime();
    this.elements = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds')
    };

    this.currentValues = {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    };

    this.animationFrame = null;
    this.lastUpdate = 0;

    this.init();
  }

  init() {
    this.updateCountdown();
    this.startAnimationLoop();
    this.setupScrollEffects();
  }

  // Precise countdown with smooth digit transitions
  updateCountdown() {
    const now = Date.now();
    const distance = this.targetDate - now;

    if (distance <= 0) {
      this.setAllDigits('00');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.animateDigits({
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    });
  }

  // Smooth digit-by-digit animation
  animateDigits(newValues) {
    Object.keys(newValues).forEach(key => {
      if (newValues[key] !== this.currentValues[key]) {
        this.animateDigit(this.elements[key], this.currentValues[key], newValues[key]);
        this.currentValues[key] = newValues[key];
      }
    });
  }

  animateDigit(element, from, to) {
    if (!element) return;

    // Simple fade transition for digit changes
    element.style.transition = 'opacity 0.3s ease';
    element.style.opacity = '0.3';

    setTimeout(() => {
      element.textContent = to;
      element.style.opacity = '1';
    }, 150);
  }

  setAllDigits(value) {
    Object.values(this.elements).forEach(el => {
      if (el) el.textContent = value;
    });
  }

  // Optimized animation loop using requestAnimationFrame
  startAnimationLoop() {
    const animate = (timestamp) => {
      // Update countdown every second
      if (timestamp - this.lastUpdate >= 1000) {
        this.updateCountdown();
        this.lastUpdate = timestamp;
      }

      // Continue loop
      this.animationFrame = requestAnimationFrame(animate);
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  // Subtle scroll-based effects for depth
  setupScrollEffects() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Subtle parallax on background gradient
    const gradient = document.querySelector('.background-gradient');
    if (gradient) {
      gradient.style.transform = `translate3d(0, ${rate * 0.1}px, 0)`;
    }
  }

  // Cleanup method for performance
  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    window.removeEventListener('scroll', this.handleScroll);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new WaveSeedLaunch();
});

// Performance optimization: Reduce activity when page is hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause intensive operations if needed
  } else {
    // Resume operations
  }
});