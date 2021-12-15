import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDcnUJQARPQPUnh9ypX7V2Fz6aPhFfgNqg",
    authDomain: "cs353-team3.firebaseapp.com",
    projectId: "cs353-team3",
    storageBucket: "cs353-team3.appspot.com",
    messagingSenderId: "855698334596",
    appId: "1:855698334596:web:e3af74392a1b4fb690f3d1",
    measurementId: "G-T5C8JLS9V7"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
