const redirectDiv1 = document.getElementById('redirectDiv1');
const redirectDiv2 = document.getElementById('redirectDiv2');

// Agregar el evento de clic
redirectDiv1.addEventListener('click', () => {
  // Redireccionar a otra página HTML
  window.location.href = '../chat_pixelfactory/chat.html';
});

redirectDiv2.addEventListener('click', () => {
    // Redireccionar a otra página HTML
    window.location.href = '../chat_sunburst/chat.html';
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