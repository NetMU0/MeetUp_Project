//import './CreateEventCSS.css';
import firebase from "./firebase.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "firebase/firestore";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Navigate, useNavigate } from "react-router-dom";
const CreateEvent = () => {
  //Databases for users
  const navigate = useNavigate();
  const [eventname, setEventName] = useState("");
  const [eventplace, setEventPlace] = useState("");
  const [eventdate, setEventDate] = useState("");
  const [eventdescription, setEventDescription] = useState("");
  const [eventtime, setEventTime] = useState("");
  const uniqueid = "e68322b6-90b1-4be8-a05a-49994eb25eec";
  //@TODO ADD VALIDATION IF TIME HAD ADD STATTUS TO CHANGE TO CANCELL GOING AHEAD AND FINISHED
  const handleSubmit = (e) => {
    e.preventDefault();
    const dbEvents = firebase.firestore().collection("event");
    const dbEventCreated = firebase.firestore().collection("eventsCreated");
    var currentid = uniqueid; //get id of current event
    dbEvents.doc(uniqueid).set({
      //id of event is same as document id to make it easier to find
      //makes editing it easier to find
      Name: eventname,
      Location: eventplace,
      Date: eventdate,
      Description: eventdescription,
      Time: eventtime,
      id: "gtehegd",
      Status: "ongoing",
      Createdby: "lp0rde3sw" //how do we know who is logged in
      //Created by will have to be username gotten from the pther SignUp js and id
    });
    dbEventCreated
      .add({
        eventID: "gtehegd",
        userID: "lp0rde3sw"
      })
      /*   dbEvents.add({
        Name: eventname,
        Location: eventplace,
        Date: eventdate,
        Description: eventdescription,
        Time : eventtime,
        EventID: uniqueid
        //Created by will have to be username gotten from the pther SignUp js and id
    })*/
      .then(() => {
        alert("Data has been added to database");
      })
      .catch((error) => {
        alert(error.message);
      });
    setEventName("");
    setEventPlace("");
    setEventDate("");
    setEventTime("");
    setEventDescription("");
    navigate("/home");
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
      <div id="f">
        <form id="EventForm" onSubmit={handleSubmit}>
          <h1> Type in Event Information </h1>
          <label>
            Name of Event:
            <div>
              <input
                type="text"
                value={eventname}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
          </label>
          <div>
            <label>Place:</label>
          </div>
          <div>
            <input
              type="text"
              id="eventplace"
              value={eventplace}
              onChange={(e) => setEventPlace(e.target.value)}
            />
          </div>

          <label> Date of Event:</label>
          <div>
            <input
              type="date"
              id="eventdate"
              value={eventdate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          <label> Time of Event:</label>
          <div>
            <input
              type="time"
              id="eventtime"
              value={eventtime}
              onChange={(e) => setEventTime(e.target.value)}
            />
          </div>

          <label>
            Description:
            <div>
              <textarea
                id="eventdescription"
                value={eventdescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>
          </label>

          <p></p>
          <button type="submit">Create</button>
        </form>
      </div>
    </body>
  );
};

export default CreateEvent;
