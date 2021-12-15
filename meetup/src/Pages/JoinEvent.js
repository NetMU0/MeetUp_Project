//import "./styles.css";

import firebase from "./firebase.js";
import "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  AddCircleOutlineRounded,
  AddRounded,
  DeleteOutlineRounded,
  Edit,
  RateReview,
  Style
} from "@material-ui/icons";

import {
  Button,
  TextField,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { Rating } from "react-simple-star-rating";

//Current user's id  - How to get the id of the currently logged in user? From cache?
var currentUID = "lp0rde3sw";
var currentUserName = "Tooni";

const JoinEvent = () => {
  const [events, setEvents] = useState([]);
  const [eventsJoined, setEventsJoined] = useState([]);

  useEffect(() => {
    console.log("useEffect Hook!!!");

    firebase
      .firestore()
      .collection("eventsJoined")
      .where("UserID", "==", currentUID)
      .onSnapshot((snapshot) => {
        console.log("Firebase Snap!");
        setEventsJoined(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              EventID: doc.data().EventID,
              UserID: doc.data().UserID,
              Rating: doc.data().Rating
            };
          })
        );
      });
    firebase
      .firestore()
      .collection("event")
      .onSnapshot((snapshot) => {
        console.log("Firebase Snap!");
        setEvents(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              Name: doc.data().Name,
              Date: doc.data().Date
            };
          })
        );
      });
  }, []);

  // TODO: UserID = login userID (from login page)
  const joinEvent = (e) => {
    firebase
      .firestore()
      .collection("eventsJoined")
      .add({
        id: firebase.firestore.FieldValue.serverTimestamp(),
        EventID: e.id,
        UserID: currentUID,
        Rating: 5
      })
      .then(() => {
        alert("You are going to join this event: " + e.Name);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const rateEvent = (e, rate) => {
    firebase
      .firestore()
      .collection("eventsJoined")
      .doc(e.id)
      .update({
        Rating: rate / 20
      });
  };

  return (
    <body>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/create">Create Event</Nav.Link>
            {/*<button type="button"
                            onClick={() => {
                            history.push("/index");
                            }}>Logout
                          </button>*/}
          </Nav>
          <Nav>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Type your activity"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  onClick={() => navigate("/search")}
                >
                  Search
                </button>
              </div>
            </div>
          </Nav>
          <Nav>
            <Nav.Link href="/settings">Settings</Nav.Link>
            <Nav.Link href="/">Sign Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container maxWidth="sm">
        <h3>
          Current USER: {currentUserName} (UserID: {currentUID})
        </h3>
        <h2>LIST OF EVENTS</h2>
        <List dense={true}>
          {events.map((e) => (
            <ListItem>
              <ListItemText
                primary={e.id + " - " + e.Name}
                secondary={e.Date}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="JOIN"
                  onClick={() => joinEvent(e)}
                >
                  <AddRounded />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <h2>LIST OF EVENTSJOINED</h2>
        </List>
        <List dense={true}>
          {eventsJoined.map((e) => (
            <ListItem>
              <ListItemText
                primary={e.EventID + " -- " + e.UserID}
                secondary={e.Rating}
              />
              <ListItemSecondaryAction>
                <div>
                  <Rating
                    ratingValue={e.Rating}
                    onClick={(newValue) => {
                      rateEvent(e, newValue);
                    }}
                  />
                </div>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </body>
  );
};

export default JoinEvent;
