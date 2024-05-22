document.addEventListener('DOMContentLoaded', (event) => {
  const openButton = document.getElementById('open');
  const modalContainer = document.getElementById('modal_container');
  const closeButton = document.getElementById('close');
  const openButton2 = document.getElementById('open2');
  const modalContainer2 = document.getElementById('modal_container2');
  const closeButton2 = document.getElementById('close2');

  openButton.addEventListener('click', () => {
      modalContainer.classList.add('show');
  });

  closeButton.addEventListener('click', () => {
      modalContainer.classList.remove('show');
  });

  openButton2.addEventListener('click', () => {
      modalContainer2.classList.add('show');
  });

  closeButton2.addEventListener('click', () => {
      modalContainer2.classList.remove('show');
  });

  // Tu configuración de Firebase
  var firebaseConfig = {
      apiKey: "TU_API_KEY",
      authDomain: "TU_PROJECT_ID.firebaseapp.com",
      databaseURL: "https://TU_PROJECT_ID.firebaseio.com",
      projectId: "TU_PROJECT_ID",
      storageBucket: "TU_PROJECT_ID.appspot.com",
      messagingSenderId: "TU_MESSAGING_SENDER_ID",
      appId: "TU_APP_ID",
      measurementId: "TU_MEASUREMENT_ID"
  };

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);

  // Referencia a Firestore
  const db = firebase.firestore();

  const userNameElement = document.getElementById('user-name');
  const editInformButton = document.getElementById('editarInform');
  const informacionElement = document.getElementById('informacion');
  const agregarIdiomaButton = document.getElementById('agregarIdioma');
  const agregarRedButton = document.getElementById('agregarRed');
  const editarExperienciaButton = document.getElementById('editarExperiencia');
  const experienciaLaboralElement = document.getElementById('experienciaLaboral');
  const editarResumenButton = document.getElementById('editarResumen');
  const resumenTElement = document.getElementById('resumenT');

  // Función para obtener los datos del usuario
  function fetchUserData() {
      const user = firebase.auth().currentUser;
      if (user) {
          const uid = user.uid;
          db.collection('users').doc(uid).get()
              .then(doc => {
                  if (doc.exists) {
                      const data = doc.data();
                      userNameElement.textContent = data.name || 'Nombre';
                      informacionElement.querySelector('h5').textContent = data.occupation || 'Ocupación';
                      experienciaLaboralElement.innerHTML = formatExperiencia(data.experiencia);
                      resumenTElement.innerHTML = data.resumen || 'Escriba una breve descripción de sus fortalezas y cualidades significativas que hacen que destaque en el campo en el cual se desempeña y que para los ofertantes sea atractivo.';
                      // Actualiza otros campos con los datos del usuario según sea necesario
                  } else {
                      console.log("No such document!");
                  }
              })
              .catch(error => {
                  console.log("Error getting document:", error);
              });
      }
  }

  // Formatear la experiencia laboral para mostrarla correctamente
  function formatExperiencia(experiencia) {
      if (!experiencia) return '';
      return experiencia.map(exp => `
          <p>Puesto: ${exp.puesto} <br>Empresa: ${exp.empresa} <br>Ubicación: ${exp.ubicacion} <br>Periodo Laboral: ${exp.periodo}</p>
          <hr class="linea" width="50%" size="1" color="#2B5161">
          <p>Funciones: </p>
          <ul>
              ${exp.funciones.map(func => `<li>${func}</li>`).join('')}
          </ul>
      `).join('');
  }

  // Fetch user data when the user is signed in
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          fetchUserData();
      } else {
          console.log("User is not signed in");
      }
  });

  // Event listeners for editing functionalities
  editInformButton.addEventListener('click', () => {
      const isEditable = informacionElement.getAttribute('contenteditable') === 'true';
      informacionElement.setAttribute('contenteditable', !isEditable);
      editInformButton.textContent = isEditable ? 'Editar' : 'Guardar';
  });

  agregarIdiomaButton.addEventListener('click', () => {
      const newLang = prompt('Agregar nuevo idioma:');
      if (newLang) {
          const newLangElement = document.createElement('span');
          newLangElement.innerHTML = `<p>${newLang}</p>`;
          document.querySelector('.idiomas').appendChild(newLangElement);
      }
  });

  agregarRedButton.addEventListener('click', () => {
      const newRed = prompt('Agregar nueva red social:');
      if (newRed) {
          const newRedElement = document.createElement('span');
          newRedElement.innerHTML = `<p>${newRed}</p>`;
          document.querySelector('.redesContainer').appendChild(newRedElement);
      }
  });

  editarExperienciaButton.addEventListener('click', () => {
      const isEditable = experienciaLaboralElement.getAttribute('contenteditable') === 'true';
      experienciaLaboralElement.setAttribute('contenteditable', !isEditable);
      editarExperienciaButton.textContent = isEditable ? 'Editar' : 'Guardar';
  });

  editarResumenButton.addEventListener('click', () => {
      const isEditable = resumenTElement.getAttribute('contenteditable') === 'true';
      resumenTElement.setAttribute('contenteditable', !isEditable);
      editarResumenButton.textContent = isEditable ? 'Editar' : 'Guardar';
  });
});
