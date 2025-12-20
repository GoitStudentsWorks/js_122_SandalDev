const close = document.getElementsByClassName('order-modal__close')[0];
const modal = document.querySelector('[data-order-modal]');
const petmo = document.getElementsByClassName('modalpet-backdrop')[0];
const open = document.getElementsByClassName('modalpet-adopt-btn')[0];


close.addEventListener('click', () => {
    modal.classList.add('is-hidden');
    document.body.style.overflow = '';
});

open.addEventListener('click', () => {
    modal.classList.remove('is-hidden');
    petmo.classList.add('is-hidden');
    document.body.style.overflow = 'hidden';
});