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
        const file = event.target.files[0];
        if (file) {
            try {
                const user = await checkAuth();
                const userDocRef = await ensureUserDocument(user);
                const downloadURL = await uploadFile(file, `portfolios/${user.uid}/${file.name}`);
                await userDocRef.update({
                    portfolioURL: downloadURL,
                    portfolioName: file.name
                });
                uploadMessage.textContent = 'Portafolio subido con éxito.';
                displayPortfolio(file.name, downloadURL);
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
                const userDocRef = await ensureUserDocument(user);
                const downloadURL = await uploadFile(file, `profile_pictures/${user.uid}/${file.name}`);
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
                if (userData.portfolioURL && userData.portfolioName) {
                    displayPortfolio(userData.portfolioName, userData.portfolioURL);
                }
                document.getElementById('user-name').textContent = userData.name || 'Nombre';
            }
        } catch (error) {
            window.location.href = '../login.html';
        }
    };


    const displayPortfolio = (fileName, fileURL) => {
        portfolioDisplay.innerHTML = `<p><a href="${fileURL}" download>${fileName}</a></p>`;
    };


    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loadUserProfile();
        } else {
            window.location.href = '../login.html';
        }
    });
});
