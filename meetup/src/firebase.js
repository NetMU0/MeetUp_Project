import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBR-yv4Tzb9NHonmEk6E53APR64vmWDwmU",
    authDomain: "meetup-1a50b.firebaseapp.com",
    projectId: "meetup-1a50b",
    storageBucket: "meetup-1a50b.appspot.com",
    messagingSenderId: "21582739950",
    appId: "1:21582739950:web:eca1cc25af75001c5c76ff",
    measurementId: "G-KD454655GW"
};

firebase.initializeApp(firebaseConfig);

export default firebase;