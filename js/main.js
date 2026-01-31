'use strict';

console.log('🔥 main.js connected');

document.addEventListener('DOMContentLoaded', () => {
  console.log('🧠 DOM loaded');
  initGlobalActions();
});

function initGlobalActions() {
  document.body.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;

    switch (action) {
      case 'reserve':
      case 'checkout':
        window.location.href = 'mailto:hello@morganthornsley.com?subject=Masamor Retreat Inquiry&body=Hi Morgan,%0D%0A%0D%0AI would like to learn more about the Masamor Retreat (April 22-28, 2026).%0D%0A%0D%0APlease send me booking details.%0D%0A%0D%0AThank you!';
        break;

      default:
        console.warn('Action not recognized:', action);
    }
  });
}
