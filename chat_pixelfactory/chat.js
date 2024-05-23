const redirectDiv1 = document.getElementById('redirectDiv1');
const redirectDiv2 = document.getElementById('redirectDiv2');

// Agregar el evento de clic
redirectDiv1.addEventListener('click', () => {
  // Redireccionar a otra página HTML
  window.location.href = '../chat_codeworks/chat.html';
});

redirectDiv2.addEventListener('click', () => {
    // Redireccionar a otra página HTML
    window.location.href = '../chat_sunburst/chat.html';
  });
  
const notiBtn = document.getElementById('notiBtn');
const notiContainer = document.getElementById('container_n');

// Función para alternar la visibilidad de la ventana de notificaciones
function toggleNotiContainer() {
    if (notiContainer.style.display === 'none' || notiContainer.style.display === '') {
        notiContainer.style.display = 'block';
    } else {
        notiContainer.style.display = 'none';
    }
}

// Función para cerrar la ventana de notificaciones cuando se hace clic fuera de ella
function closeNotiPopup(event) {
    if (!notiContainer.contains(event.target) && !notiBtn.contains(event.target)) {
        notiContainer.style.display = 'none';
    }
}

// Agregar evento de clic al botón de notificaciones
notiBtn.addEventListener('click', toggleNotiContainer);

// Agregar evento de clic al documento para cerrar la ventana de notificaciones cuando se hace clic fuera de ella
document.addEventListener('click', closeNotiPopup);