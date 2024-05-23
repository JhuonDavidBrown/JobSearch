document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const profilePicInput = document.getElementById('profile-pic2');
    const uploadMessage = document.getElementById('uploadMessage');
    const profilePic = document.getElementById('profile-pic');
    const portfolioDisplay = document.getElementById('portfolioDisplay');

    const uploadFile = (file, path) => {
        return firebase.storage().ref(path).put(file).then(snapshot => {
            return snapshot.ref.getDownloadURL();
        });
    };

    const checkAuth = () => {
        return new Promise((resolve, reject) => {
            const user = firebase.auth().currentUser;
            if (user) {
                resolve(user);
            } else {
                reject('No user is authenticated.');
            }
        });
    };

    const ensureUserDocument = async (user) => {
        const userDocRef = firebase.firestore().collection('users').doc(user.uid);
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
            await userDocRef.set({
                name: user.displayName || 'Nombre',
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        return userDocRef;
    };

    fileInput.addEventListener('change', async (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            try {
                const user = await checkAuth();
                const userDocRef = await ensureUserDocument(user);
                const uploadedFiles = [];
                
                for (const file of files) {
                    const downloadURL = await uploadFile(file, `portfolios/${user.uid}/${file.name}`);
                    uploadedFiles.push({
                        name: file.name,
                        url: downloadURL
                    });
                }
                
                await userDocRef.update({
                    portfolio: firebase.firestore.FieldValue.arrayUnion(...uploadedFiles)
                });

                uploadMessage.textContent = 'Portafolio subido con éxito.';
                displayPortfolio(uploadedFiles);
            } catch (error) {
                console.error('Error al subir el archivo:', error);
                uploadMessage.textContent = 'Error al subir el archivo.';
            }
        }
    });

    profilePicInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const user = await checkAuth();
                const downloadURL = await uploadFile(file, `profile_pictures/${user.uid}/${file.name}`);
                const userDocRef = await ensureUserDocument(user);
                await userDocRef.update({
                    profilePicURL: downloadURL
                });
                profilePic.src = downloadURL;
            } catch (error) {
                console.error('Error al subir la foto de perfil:', error);
            }
        }
    });

    document.getElementById('open').addEventListener('click', () => {
        fileInput.click();
    });

    document.getElementById('open2').addEventListener('click', () => {
        profilePicInput.click();
    });

    const loadUserProfile = async () => {
        try {
            const user = await checkAuth();
            const userDocRef = await ensureUserDocument(user);
            const userDoc = await userDocRef.get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.profilePicURL) {
                    profilePic.src = userData.profilePicURL;
                }
                if (userData.portfolio) {
                    displayPortfolio(userData.portfolio);
                }
                document.getElementById('user-name').textContent = userData.name || 'Nombre';
            }
        } catch (error) {
            window.location.href = '../login.html';
        }
    };

    const displayPortfolio = (files) => {
        portfolioDisplay.innerHTML = '';
        files.forEach(file => {
            const fileElement = document.createElement('p');
            const fileLink = document.createElement('a');
            fileLink.href = file.url;
            fileLink.textContent = file.name;
            fileLink.download = file.name;
            fileElement.appendChild(fileLink);
            portfolioDisplay.appendChild(fileElement);
        });
    };

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loadUserProfile();
        } else {
            window.location.href = '../login.html';
        }
    });

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

const botonEditar = document.getElementById('editarExperiencia');
  const divExperiencia = document.getElementById('experienciaLaboral');
  const btnEditar = document.getElementById('editarResumen');
  const divResumen = document.getElementById('resumenT');
  const idiomasContainer = document.querySelector('.idiomas');
  const agregarIdiomaBtn = document.getElementById('agregarIdioma');
  const redesContainer = document.querySelector('.redesContainer');
  const agregarRedBtn = document.getElementById('agregarRed');
  const btnInfor = document.getElementById('editarInform');
  const divInformacion = document.getElementById('informacion');

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

  agregarIdiomaBtn.addEventListener('click', () => {
    const nuevoIdioma = document.createElement('span');
    const idiomaEditable = document.createElement('p');
    idiomaEditable.contentEditable = true;
    idiomaEditable.textContent = 'Nuevo idioma';
    nuevoIdioma.appendChild(idiomaEditable);
    idiomasContainer.insertBefore(nuevoIdioma, agregarIdiomaBtn);
  });
  
  agregarRedBtn.addEventListener('click', () => {
    const nuevaRed = document.createElement('span');
    const redEditable = document.createElement('p');
    redEditable.contentEditable = true;
    redEditable.textContent = 'Nueva Red';
    nuevaRed.appendChild(redEditable);
    redesContainer.insertBefore(nuevaRed, agregarRedBtn);
  });

  // Si se entra en modo de edición, colocar el cursor en el div
  if (divInformacion.contentEditable === 'true') {
    divInformacion.focus();
  }

  btnInfor.addEventListener('click', () => {
    // Alternar el modo de edición del div
    divInformacion.contentEditable = divInformacion.contentEditable === 'true' ? 'false' : 'true';
  
    // Cambiar el texto del botón según el modo de edición
    btnInfor.textContent = divInformacion.contentEditable === 'true' ? 'Guardar' : 'Editar';
  
    // Si se entra en modo de edición, colocar el cursor en el div
    if (divInformacion.contentEditable === 'true') {
      divInformacion.focus();
    }
  
    // Si se sale del modo de edición, guardar el contenido en una variable
    if (divInformacion.contentEditable === 'false') {
      const contenidoEditado = divInformacion.innerHTML;
      // Aquí puedes realizar alguna acción adicional con el contenido editado, como enviarlo al servidor o almacenarlo localmente
      console.log('Contenido editado:', contenidoEditado);
    }
  });