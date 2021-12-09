import '../App.css';
import firebase from '../firebase.js';
import 'firebase/firestore';
import React, {useState, useEffect} from "react";

import { AddCircleOutlineRounded, DeleteOutlineRounded, Edit } from '@material-ui/icons';

import { Button, TextField, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogContent, DialogActions } from '@material-ui/core';



//Current user's id  - How to get the id of the currently logged in user? From cache?
var currentUID = "asd546s789";

const JoinEvent =()=> {
  //Databases for users
  const [userID,setUserID] = useState("");
  const [eventID,setEvenID] = useState("");
  const [eventsJoined, setEventsJoined] = useState([]);
  //Created by will have to be username gotten from the pther SignUp js and id
  
  useEffect(() => {
    console.log('useEffect Hook!!!');

    firebase.firestore().collection('eventsJoined').onSnapshot(snapshot => {
      console.log('Firebase Snap!');
      setEventsJoined(snapshot.docs.map(doc => {
        return {
          EventID: doc.data().EventID,
          UserID: doc.data().UserID

        }
      }))
    })

  }, []);
//@TODO ADD VALIDATION IF TIME HAD
  const handleSubmit = (e) => {
    e.preventDefault();
    const dbEventsJoined = firebase.firestore().collection("eventsJoined");
    dbEventsJoined.add({
        EventID: eventID,
        UserID: userID,
    })
    .then(()=>{
      alert('You are going to join this event: ' + eventID);
    })
    .catch((error) =>{
      alert(error.message);
    });
    setUserID("");
    setEvenID("");

  };


  return (
    <Container maxWidth="sm">
      <form id = "JoinForm" onSubmit = {handleSubmit}>
        <label>User ID:
          <div>
          <input type="text" value = {userID} onChange={(e) =>setUserID(e.target.value)} />
          </div>
        </label>

        <label>Event ID:
          <div>
          <input type="text" id ="eventplace" value = {eventID} onChange={(e) =>setEvenID(e.target.value)} />
          </div>
        </label>

        <p></p>
        <button type ="submit">Join</button>

      </form> 

      <List dense={true}>
      {
        eventsJoined.map(e => (

          <ListItem  >

            <ListItemText
              primary={e.EventID}
              secondary={e.UserID}
            />

          </ListItem>
        ))
      }
      </List>

    </Container >
  );
}

export default JoinEvent;
