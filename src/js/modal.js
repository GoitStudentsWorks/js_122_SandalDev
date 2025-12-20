import Swal from 'sweetalert2';

const modal = document.querySelector('[data-order-modal]');
const closeBtn = document.querySelector('[data-order-close]');
const backdrop = document.querySelector('[data-backdrop]');
const form = document.querySelector('[data-order-form]');
const openBtn = document.querySelector('.modalpet-adopt-btn');
const petModal = document.querySelector('.modalpet-backdrop');

function openModal() {
  modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.add('is-hidden');
  document.body.style.overflow = '';
}

/* OPEN */
openBtn?.addEventListener('click', () => {
  openModal();
  petModal?.classList.add('is-hidden');
});

/* CLOSE — BUTTON */
closeBtn.addEventListener('click', closeModal);

/* CLOSE — BACKDROP */
backdrop.addEventListener('click', e => {
  if (e.target === backdrop) {
    closeModal();
  }
});

/* CLOSE — ESC */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('is-hidden')) {
    closeModal();
  }
});

/* SUBMIT */
form.addEventListener('submit', async e => {
  e.preventDefault();

  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.trim();
  const comment = form.elements.comment.value.trim();

  /* ========= VALIDATION (NEW, SAFE) ========= */

  if (name.length < 2) {
    Swal.fire({
      icon: 'warning',
      title: 'Некоректне імʼя',
      text: 'Імʼя повинно містити щонайменше 2 символи',
    });
    return;
  }

  const phonePattern =
    /^\+38\s?\(?0\d{2}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/;

  if (!phonePattern.test(phone)) {
    Swal.fire({
      icon: 'warning',
      title: 'Некоректний номер',
      text: 'Введіть номер у форматі +38 (0XX) XXX XX XX',
    });
    return;
  }

  /* ========= ORIGINAL LOGIC (UNCHANGED) ========= */

  const data = {
    name,
    phone,
    comment,
  };

  try {
    await fetch('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    Swal.fire({
      icon: 'success',
      title: 'Заявку надіслано!',
      text: 'Ми звʼяжемося з вами найближчим часом',
    });

    form.reset();
    closeModal();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Помилка',
      text: 'Спробуйте ще раз пізніше',
    });
  }
});
