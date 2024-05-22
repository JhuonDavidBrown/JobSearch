// Configuración de Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDKTveJUKHlY4ioPcYIoEsAWaOtmQ5msBw",
    authDomain: "jobsearch-284fa.firebaseapp.com",
    projectId: "jobsearch-284fa",
    storageBucket: "jobsearch-284fa.appspot.com",
    messagingSenderId: "835836872345",
    appId: "1:835836872345:web:ed8cfb1d43bbcc73715a08",
    measurementId: "G-47J1N1DVLC"
};

firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

function registerWithEmail() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var fullName = document.getElementById('nombre-completo').value;

    if (password === confirmPassword) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);

                firestore.collection('ofertante').doc(user.uid).set({
                    email: email,
                    name: fullName,
                    role: 'ofertante'
                })
                .then(() => {
                    console.log("Usuario registrado correctamente en Firestore.");
                    // Redirigir a la página de perfil después de la autenticación exitosa
                    window.location.href = "../home_iniciado/home.hmtl";
                })
                .catch((error) => {
                    console.error("Error al registrar usuario en Firestore: ", error);
                });

            })
            .catch((error) => {
                console.error("Error al crear la cuenta: ", error.message);
            });
    } else {
        alert("Las contraseñas no coinciden.");
    }
}

function loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            var user = result.user;
            console.log("Usuario autenticado con Google:", user);

            if (result.additionalUserInfo.isNewUser) {
                firestore.collection('ofertante').doc(user.uid).set({
                    email: user.email,
                    name: user.displayName,
                    role: 'ofertante'
                })
                .then(() => {
                    console.log("Usuario registrado correctamente en Firestore.");
                })
                .catch((error) => {
                    console.error("Error al registrar usuario en Firestore: ", error);
                });
            }

            // Redirigir a la página de perfil después de la autenticación exitosa
            window.location.href = "../home_iniciado/home.html";
        })
        .catch(function(error) {
            console.error("Error al iniciar sesión con Google:", error.message);
            alert("Error al iniciar sesión con Google: " + error.message);
        });
}

function loginFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');

    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            var user = result.user;
            console.log("Usuario autenticado con Facebook:", user);

            if (result.additionalUserInfo.isNewUser) {
                firestore.collection('ofertante').doc(user.uid).set({
                    email: user.email,
                    name: user.displayName,
                    role: 'ofertante'
                })
                .then(() => {
                    console.log("Usuario registrado correctamente en Firestore.");
                })
                .catch((error) => {
                    console.error("Error al registrar usuario en Firestore: ", error);
                });
            }

            // Redirigir a la página de perfil después de la autenticación exitosa
            window.location.href = "../home_iniciado/home.hmtl";
        })
        .catch(function(error) {
            console.error("Error al iniciar sesión con Facebook:", error.message);
            alert("Error al iniciar sesión con Facebook: " + error.message);
        });
}

function registerWithEmail() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var fullName = document.getElementById('nombre-completo').value;

    if (password === confirmPassword) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);

                firestore.collection('talento').doc(user.uid).set({
                    email: email,
                    name: fullName,
                    role: 'talento'
                })
                .then(() => {
                    console.log("Usuario registrado correctamente en Firestore.");
                    // Redirigir a la página de perfil después de la autenticación exitosa
                    window.location.href = "../home_iniciado/home.hmtl";
                })
                .catch((error) => {
                    console.error("Error al registrar usuario en Firestore: ", error);
                });

            })
            .catch((error) => {
                console.error("Error al crear la cuenta: ", error.message);
            });
    } else {
        alert("Las contraseñas no coinciden.");
    }
}

function loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            var user = result.user;
            console.log("Usuario autenticado con Google:", user);

            if (result.additionalUserInfo.isNewUser) {
                firestore.collection('talento').doc(user.uid).set({
                    email: user.email,
                    name: user.displayName,
                    role: 'talento'
                })
                .then(() => {
                    console.log("Usuario registrado correctamente en Firestore.");
                })
                .catch((error) => {
                    console.error("Error al registrar usuario en Firestore: ", error);
                });
            }

            // Redirigir a la página de perfil después de la autenticación exitosa
            window.location.href = "../home_iniciado/home.html";
        })
        .catch(function(error) {
            console.error("Error al iniciar sesión con Google:", error.message);
            alert("Error al iniciar sesión con Google: " + error.message);
        });
}

function loginFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');

    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            var user = result.user;
            console.log("Usuario autenticado con Facebook:", user);

            if (result.additionalUserInfo.isNewUser) {
                firestore.collection('talento').doc(user.uid).set({
                    email: user.email,
                    name: user.displayName,
                    role: 'ofertante'
                })
                .then(() => {
                    console.log("Usuario registrado correctamente en Firestore.");
                })
                .catch((error) => {
                    console.error("Error al registrar usuario en Firestore: ", error);
                });
            }

            // Redirigir a la página de perfil después de la autenticación exitosa
            window.location.href = "../home_iniciado/home.hmtl";
        })
        .catch(function(error) {
            console.error("Error al iniciar sesión con Facebook:", error.message);
            alert("Error al iniciar sesión con Facebook: " + error.message);
        });
}
