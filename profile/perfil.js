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
});