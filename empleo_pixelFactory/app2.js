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
    // Obtener referencias a los elementos
 const msgBtn = document.getElementById('msgBtn');
 const msgContainer = document.getElementById('container_nmp');
 const notiBtn = document.getElementById('notiBtn');
 const notiContainer = document.getElementById('container_n');
 
// Función para alternar la visibilidad de la ventana de mensajes
function toggleMsgContainer() {
    if (msgContainer.style.display === 'none') {
        msgContainer.style.display = 'block';
        notiContainer.style.display = 'none'; // Cerrar la ventana de notificaciones
    } else {
        msgContainer.style.display = 'none';
    }
}

// Función para alternar la visibilidad de la ventana de notificaciones
function toggleNotiContainer() {
    if (notiContainer.style.display === 'none') {
        notiContainer.style.display = 'block';
        msgContainer.style.display = 'none'; // Cerrar la ventana de mensajes
    } else {
        notiContainer.style.display = 'none';
    }
}

// Función para cerrar las ventanas emergentes cuando se hace clic fuera de ellas
function closePopups(event) {
    if (!msgContainer.contains(event.target) && !msgBtn.contains(event.target)) {
        msgContainer.style.display = 'none';
    }
    if (!notiContainer.contains(event.target) && !notiBtn.contains(event.target)) {
        notiContainer.style.display = 'none';
    }
}

// Agregar eventos de clic a los botones
msgBtn.addEventListener('click', toggleMsgContainer);
notiBtn.addEventListener('click', toggleNotiContainer);

// Agregar evento de clic al documento para cerrar las ventanas emergentes cuando se hace clic fuera de ellas
document.addEventListener('click', closePopups);
  });