// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKTveJUKHlY4ioPcYIoEsAWaOtmQ5msBw",
  authDomain: "jobsearch-284fa.firebaseapp.com",
  projectId: "jobsearch-284fa",
  storageBucket: "jobsearch-284fa.appspot.com",
  messagingSenderId: "835836872345",
  appId: "1:835836872345:web:ed8cfb1d43bbcc73715a08",
  measurementId: "G-47J1N1DVLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);