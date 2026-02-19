/* ============================================
   form.js - Contact form validation (client-side only)
   ============================================ */

export function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formStatus = document.getElementById('form-status');

  function showError(el, msg) {
    if (el) el.textContent = msg;
  }

  function clearErrors() {
    showError(nameError, '');
    showError(emailError, '');
    showError(messageError, '');
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    nameInput?.closest('.form-group')?.classList.remove('has-error');
    emailInput?.closest('.form-group')?.classList.remove('has-error');
    messageInput?.closest('.form-group')?.classList.remove('has-error');
  }

  function setFieldError(input, errorEl, msg) {
    input?.closest('.form-group')?.classList.add('has-error');
    showError(errorEl, msg);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    const name = nameInput?.value?.trim() || '';
    if (name.length < 2) {
      setFieldError(nameInput, nameError, 'Name must be at least 2 characters');
      valid = false;
    }

    const email = emailInput?.value?.trim() || '';
    if (!emailRegex.test(email)) {
      setFieldError(emailInput, emailError, 'Please enter a valid email');
      valid = false;
    }

    const message = messageInput?.value?.trim() || '';
    if (message.length < 10) {
      setFieldError(messageInput, messageError, 'Message must be at least 10 characters');
      valid = false;
    }

    if (valid) {
      formStatus.textContent = 'Message received';
      formStatus.className = 'form-status success';
      form.reset();
    }
  });
}
