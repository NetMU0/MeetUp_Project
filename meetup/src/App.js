import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import './App.css';

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


function App() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    //Database
    const db = firebase.firestore();

    const usersRef = db.collection("user");

    //Users info retrieval function
    function getUsers(){
        //Need to put on true
        setLoading(false);
        usersRef.get().then((item)=> {
            const usersItems = item.docs.map((doc) => doc.data());
            setUser(usersItems);
            setLoading(false);
    });
    }

    useEffect(() => {
        getUsers();
    },[]);

    //Loading Screen
    if (loading){
        return <h1>Loading in progress...</h1>
    }

  return (
    <div className="App">
        List of users :
        <br/>
        {user.map((u)=> (
            <div key={u.id}>
               Username : {u.name}
                <br/>
            </div>
        ))}
    </div>
  );
}

export default App;
