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
firebase.analytics();



loginGoogle=()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user); 

        document.getElementById('idmain').innerHTML = "<img width = 150 src = '" + user.photoURL + "'/>" + "<br>" +  user.displayName;
        
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

        console.log(errorMessage);
      });
}

loginFacebook=()=>{
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_birthday');

  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;

    document.getElementById('idmain').innerHTML = "<img width = 150 src = '" + user.photoURL + "'/>" + "<br>" +  user.displayName;
    
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;

    console.log(errorMessage);

  });
}