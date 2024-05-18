const open= document.getElementById('open');
const modal_container=document.getElementById('modal_container');
const close=document.getElementById('close');
const modal = document.querySelector('.modal');

close.addEventListener('click', () => {
    modal_container.classList.remove('show');
    modal.classList.remove('modal-close');
  });
  
  open.addEventListener('click', () => {
    modal_container.classList.add('show');
    modal.classList.add('modal-close');
    setTimeout(() => {
      modal.classList.remove('modal-close');
    });
  });
