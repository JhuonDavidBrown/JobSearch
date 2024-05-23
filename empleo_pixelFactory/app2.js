document.addEventListener('DOMContentLoaded', () => {
    const close2 = document.getElementById('close2');
    const open = document.getElementById('open');
    const modal_container01 = document.getElementById('modal_container01');
    const modal_container02 = document.getElementById('modal_container02');
    const acceptBtn = document.getElementById('accept.btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const modal = document.querySelector('.modal');

    cancelBtn.addEventListener('click', () => {
      modal_container01.classList.remove('show');
      modal.classList.remove('modal-close');
    });

    open.addEventListener('click', () => {
      modal_container01.classList.add('show');
      modal.classList.add('modal-close');
      setTimeout(() => {
        modal.classList.remove('modal-close');
      });
    });

    acceptBtn.addEventListener('click', () => {
      modal_container01.classList.remove('show');
      modal_container02.classList.add('show');
    });

    close2.addEventListener('click', () => {
      modal_container02.classList.remove('show');
      modal_container01.classList.remove('show');
    });
  });