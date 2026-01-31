'use strict';

console.log('🔥 main.js connected');

const API_BASE_URL = 'https://masamor-backend-production.up.railway.app';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🧠 DOM loaded');
  initGlobalActions();
  initReservationModal();
});

function initGlobalActions() {
  document.body.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;

    switch (action) {
      case 'reserve':
        openReservationModal(btn.dataset.source);
        break;
      case 'checkout':
        handleCheckout(btn.dataset.priceId);
        break;
      default:
        console.warn('Action not recognized:', action);
    }
  });
}

function handleCheckout(priceId) {
  console.log('💳 Checkout initiated:', priceId);
  alert(`Checkout: ${priceId}`);
}

let modalOverlay;
let modal;
let form;

function initReservationModal() {
  modalOverlay = document.querySelector('.modal-overlay');
  modal = document.querySelector('.modal');
  form = document.getElementById('reservation-form');

  if (!modalOverlay || !modal || !form) {
    console.warn('⚠️ Modal not found');
    return;
  }

  modalOverlay.addEventListener('click', closeReservationModal);
  modal.querySelector('.close-button')?.addEventListener('click', closeReservationModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeReservationModal();
  });

  form.addEventListener('submit', handleReservationSubmit);

  const cancelBtn = form.querySelector('.cancel-button');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeReservationModal);
  }
}

function openReservationModal(source = 'unknown') {
  console.log('📩 Opening modal from:', source);
  modalOverlay.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
  modalOverlay?.classList
cd ~/Documents/masamor-project/masamor-frontend/js
cat > main.js << 'EOF'
'use strict';

console.log('🔥 main.js connected');

const API_BASE_URL = 'https://masamor-backend-production.up.railway.app';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🧠 DOM loaded');
  initGlobalActions();
  initReservationModal();
});

function initGlobalActions() {
  document.body.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;

    switch (action) {
      case 'reserve':
        openReservationModal(btn.dataset.source);
        break;
      case 'checkout':
        handleCheckout(btn.dataset.priceId);
        break;
      default:
        console.warn('Action not recognized:', action);
    }
  });
}

function handleCheckout(priceId) {
  console.log('💳 Checkout initiated:', priceId);
  alert(`Checkout: ${priceId}`);
}

let modalOverlay;
let modal;
let form;

function initReservationModal() {
  modalOverlay = document.querySelector('.modal-overlay');
  modal = document.querySelector('.modal');
  form = document.getElementById('reservation-form');

  if (!modalOverlay || !modal || !form) {
    console.warn('⚠️ Modal not found');
    return;
  }

  modalOverlay.addEventListener('click', closeReservationModal);
  modal.querySelector('.close-button')?.addEventListener('click', closeReservationModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeReservationModal();
  });

  form.addEventListener('submit', handleReservationSubmit);

  const cancelBtn = form.querySelector('.cancel-button');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeReservationModal);
  }
}

function openReservationModal(source = 'unknown') {
  console.log('📩 Opening modal from:', source);
  modalOverlay.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
  modalOverlay?.classList.remove('active');
  modal?.classList.remove('active');
  document.body.style.overflow = '';
}

async function handleReservationSubmit(e) {
  e.preventDefault();

  clearErrors();

  const submitBtn = form.querySelector('.submit-button');
  const spinner = submitBtn.querySelector('.loading-spinner');

  submitBtn.disabled = true;
  spinner.style.display = 'block';

  const data = getFormData();

  try {
    const response = await fetch(`${API_BASE_URL}/reservas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error creating reservation');
    }

    showSuccess(result);
  } catch (err) {
    showGlobalError(err.message);
  } finally {
    submitBtn.disabled = false;
    spinner.style.display = 'none';
  }
}

function getFormData() {
  const fd = new FormData(form);

  return {
    email_contacto: fd.get('email'),
    fecha_inicio: fd.get('start_date'),
    fecha_fin: fd.get('end_date'),
    cantidad_personas: Number(fd.get('people')) || 1
  };
}

function clearErrors() {
  form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  form.querySelector('.global-error')?.remove();
}

function showGlobalError(message) {
  const div = document.createElement('div');
  div.className = 'global-error';
  div.textContent = message;
  form.prepend(div);
}

function showSuccess(reserva) {
  form.innerHTML = `
    <div class="success-message">
      <h3>Reservation Confirmed</h3>
      <div class="success-details">
        <p><strong>Email</strong><span>${reserva.email_contacto}</span></p>
        <p><strong>From</strong><span>${formatDate(reserva.fecha_inicio)}</span></p>
        <p><strong>To</strong><span>${formatDate(reserva.fecha_fin)}</span></p>
        <p><strong>People</strong><span>${reserva.cantidad_personas}</span></p>
      </div>
      <button class="cta-button" onclick="location.reload()">Done</button>
    </div>
  `;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString();
}
