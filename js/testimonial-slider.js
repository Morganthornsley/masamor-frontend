'use strict';

class MasamorTestimonialSlider {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('MasamorTestimonialSlider: invalid container');
    }

    this.container = container;
    this.slides = Array.from(container.querySelectorAll('.testimonial'));
    this.dots = Array.from(container.querySelectorAll('.dot'));
    this.intervalTime = Number(container.dataset.interval) || 5000;
    this.autoplay = container.dataset.autoplay !== 'false';
    this.currentIndex = 0;
    this.timer = null;
    this.isDestroyed = false;
    this.isVisible = true;

    if (!this.slides.length || !this.dots.length) return;

    this.init();
  }

  init() {
    this.setupAccessibility();
    this.bindEvents();
    this.observeVisibility();
    this.goTo(0);

    if (this.autoplay) {
      this.start();
    }
  }

  destroy() {
    if (this.isDestroyed) return;
    this.stop();
    this.container.replaceWith(this.container.cloneNode(true));
    this.isDestroyed = true;
  }

  goTo(index) {
    if (this.isDestroyed || !Number.isInteger(index) || index < 0 || index >= this.slides.length) {
      return;
    }

    this.slides[this.currentIndex]?.classList.remove('active');
    this.dots[this.currentIndex]?.classList.remove('active');

    this.currentIndex = index;

    this.slides[this.currentIndex].classList.add('active');
    this.dots[this.currentIndex].classList.add('active');
  }

  next() {
    this.goTo((this.currentIndex + 1) % this.slides.length);
  }

  start() {
    if (this.timer || !this.isVisible || this.isDestroyed) return;
    this.timer = setInterval(() => this.next(), this.intervalTime);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  bindEvents() {
    this.container.addEventListener('click', e => {
      const dot = e.target.closest('.dot');
      if (!dot) return;

      const index = this.dots.indexOf(dot);
      if (index === -1) return;

      this.stop();
      this.goTo(index);
      if (this.autoplay) this.start();
    });

    this.container.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;

      const dot = e.target.closest('.dot');
      if (!dot) return;

      e.preventDefault();
      dot.click();
    });

    this.container.addEventListener('mouseenter', () => this.stop());
    this.container.
cat > testimonial-slider.js << 'EOF'
'use strict';

class MasamorTestimonialSlider {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('MasamorTestimonialSlider: invalid container');
    }

    this.container = container;
    this.slides = Array.from(container.querySelectorAll('.testimonial'));
    this.dots = Array.from(container.querySelectorAll('.dot'));
    this.intervalTime = Number(container.dataset.interval) || 5000;
    this.autoplay = container.dataset.autoplay !== 'false';
    this.currentIndex = 0;
    this.timer = null;
    this.isDestroyed = false;
    this.isVisible = true;

    if (!this.slides.length || !this.dots.length) return;

    this.init();
  }

  init() {
    this.setupAccessibility();
    this.bindEvents();
    this.observeVisibility();
    this.goTo(0);

    if (this.autoplay) {
      this.start();
    }
  }

  destroy() {
    if (this.isDestroyed) return;
    this.stop();
    this.container.replaceWith(this.container.cloneNode(true));
    this.isDestroyed = true;
  }

  goTo(index) {
    if (this.isDestroyed || !Number.isInteger(index) || index < 0 || index >= this.slides.length) {
      return;
    }

    this.slides[this.currentIndex]?.classList.remove('active');
    this.dots[this.currentIndex]?.classList.remove('active');

    this.currentIndex = index;

    this.slides[this.currentIndex].classList.add('active');
    this.dots[this.currentIndex].classList.add('active');
  }

  next() {
    this.goTo((this.currentIndex + 1) % this.slides.length);
  }

  start() {
    if (this.timer || !this.isVisible || this.isDestroyed) return;
    this.timer = setInterval(() => this.next(), this.intervalTime);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  bindEvents() {
    this.container.addEventListener('click', e => {
      const dot = e.target.closest('.dot');
      if (!dot) return;

      const index = this.dots.indexOf(dot);
      if (index === -1) return;

      this.stop();
      this.goTo(index);
      if (this.autoplay) this.start();
    });

    this.container.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;

      const dot = e.target.closest('.dot');
      if (!dot) return;

      e.preventDefault();
      dot.click();
    });

    this.container.addEventListener('mouseenter', () => this.stop());
    this.container.addEventListener('mouseleave', () => {
      if (this.autoplay) this.start();
    });
  }

  observeVisibility() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
      this.isVisible = entries[0].isIntersecting;

      if (this.isVisible && this.autoplay) {
        this.start();
      } else {
        this.stop();
      }
    }, { threshold: 0.3 });

    observer.observe(this.container);
  }

  setupAccessibility() {
    this.container.setAttribute('aria-live', 'polite');

    this.dots.forEach((dot, index) => {
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.testimonial-slider').forEach(container => {
    try {
      new MasamorTestimonialSlider(container);
    } catch (err) {
      console.error(err.message);
    }
  });
});
