import '../App.css';
import firebase from '../firebase.js';
import 'firebase/firestore';
import React, {useState, useEffect} from "react";
import { AddCircleOutlineRounded, AddRounded, DeleteOutlineRounded, Edit, RateReview, Style } from '@material-ui/icons';

import { Button, TextField, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { Rating } from 'react-simple-star-rating'

//Current user's id  - How to get the id of the currently logged in user? From cache?
var currentUID = "lp0rde3sw";
var currentUserName = "Tooni"

const JoinEvent =()=> {
  //Databases for users
  const [userID,setUserID] = useState("");
  const [eventID,setEvenID] = useState("");
  const [rating, setRating] = useState(0)
  const [events, setEvents] = useState([]);
  const [eventsJoined, setEventsJoined] = useState([]);

    
  useEffect(() => {
      console.log('useEffect Hook!!!');

      firebase.firestore().collection('eventsJoined').onSnapshot(snapshot => {
        console.log('Firebase Snap!');
        setEventsJoined(snapshot.docs.map(doc => {
          return {
            id: doc.id,
            EventID: doc.data().EventID,
            UserID: doc.data().UserID,
            Rating: doc.data().Rating

          }
        }))
      });
      firebase.firestore().collection('event').onSnapshot(snapshot => {
        console.log('Firebase Snap!');
        setEvents(snapshot.docs.map(doc => {
          return {
            id: doc.id,
            Name: doc.data().Name,
            Date: doc.data().Date

          }
        }))
      });

    }, []);

    // TODO: UserID = login userID (from login page)
  const joinEvent = (e) => {
    firebase.firestore().collection("eventsJoined").add({
        EventID: e.id,
        UserID: currentUID,
        Rating: rating
    })
    .then(()=>{
      alert('You are going to join this event: ' + e.Name);
    })
    .catch((error) =>{
      alert(error.message);
    });


  };

  const rateEvent = (e,ratingValue) => {
    setRating(ratingValue)
    firebase.firestore().collection('eventsJoined').doc(e.id).update({
      Rating: ratingValue
    });
  };

  
  return (
    <Container maxWidth="sm">
      <h2>Current USER: {currentUserName}</h2>
      <h2>LIST OF EVENTS</h2>
      <List dense={true}>
      {
        events.map(e => (
          <ListItem  >
            <ListItemText
              primary={e.id + ' - ' +e.Name}
              secondary={e.Date}
            />
            <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="JOIN" onClick={() => joinEvent(e)}>
              <AddRounded />
            </IconButton>
          </ListItemSecondaryAction>  
          </ListItem>
          
        ))
      }
      <h2>LIST OF EVENTSJOINED</h2>
      </List>
      <List dense={true}>
      {
        eventsJoined.map(e => (
          <ListItem key={e.id} >
            <ListItemText
              primary={e.EventID + ' -- ' +e.UserID}
              secondary={e.Rating}
            />
            <ListItemSecondaryAction>
                <div >
                  <Rating onClick={() => rateEvent(e, 5)} />
                </div>
            </ListItemSecondaryAction>
          </ListItem>
          
        ))
      }
      </List>
    </Container >
  );
}

export default JoinEvent;
