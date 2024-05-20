  const openButton = document.getElementById("open");
  const modalContainer = document.getElementById("modal_container");
  const closeButton = document.getElementById("close");

  const openButton2 = document.getElementById("open2");
  const modalContainer2 = document.getElementById("modal_container2");
  const closeButton2 = document.getElementById("close2");


// Función para abrir el portafolio
openButton.addEventListener("click", () => {
  modalContainer.classList.add('show');
});

// Función para cerrar el portafolio
closeButton.addEventListener("click",() =>{
  modalContainer.classList.remove('show');
});

// Función para abrir la foto
openButton2.addEventListener("click", () => {
  modalContainer2.classList.add('show');
});

// Función para cerrar la foto
closeButton2.addEventListener("click", () => {
  modalContainer2.classList.remove('show');
});
