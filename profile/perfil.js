  const openButton = document.getElementById("open");
  const modalContainer = document.getElementById("modal_container");
  const closeButton = document.getElementById("close");

  const openButton2 = document.getElementById("open2");
  const modalContainer2 = document.getElementById("modal_container2");
  const closeButton2 = document.getElementById("close2");
  const botonEditar = document.getElementById('editarExperiencia');
  const divExperiencia = document.getElementById('experienciaLaboral');
  const btnEditar = document.getElementById('editarResumen');
  const divResumen = document.getElementById('resumenT');


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

// Agregar un evento click al botón
botonEditar.addEventListener('click', () => {
  // Alternar el modo de edición del div
  divExperiencia.contentEditable = divExperiencia.contentEditable === 'true' ? 'false' : 'true';

  // Cambiar el texto del botón según el modo de edición
  botonEditar.textContent = divExperiencia.contentEditable === 'true' ? 'Guardar' : 'Editar';

  // Si se sale del modo de edición, guardar el contenido en una variable
  if (divExperiencia.contentEditable === 'false') {
    const contenidoEditado = divExperiencia.innerHTML;
    // Aquí puedes realizar alguna acción adicional con el contenido editado, como enviarlo al servidor o almacenarlo localmente
    console.log('Contenido editado:', contenidoEditado);
  }
});

// Agregar un evento click al botón
btnEditar.addEventListener('click', () => {
  // Alternar el modo de edición del div
  divResumen.contentEditable = divResumen.contentEditable === 'true' ? 'false' : 'true';

  // Cambiar el texto del botón según el modo de edición
  btnEditar.textContent = divResumen.contentEditable === 'true' ? 'Guardar' : 'Editar';

  // Si se sale del modo de edición, guardar el contenido en una variable
  if (divResumen.contentEditable === 'false') {
    const contenidoEditado = divResumen.innerHTML;
    // Aquí puedes realizar alguna acción adicional con el contenido editado, como enviarlo al servidor o almacenarlo localmente
    console.log('Contenido editado:', contenidoEditado);
  }
});
