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