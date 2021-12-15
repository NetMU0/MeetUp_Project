import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "./firebase.js";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

class usersDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userList: [] };
  }
  render() {
    return <div></div>;
  }
}
function WhoJoined() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [users, setUser] = useState([]);
  const [eventsJoined, setEventJoined] = useState([]);
  const [eventsCreated, setEventCreated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listJoined, setListJoined] = useState([]);

  //Database for events
  const dbEvents = firebase.firestore().collection("event");
  //Database for events joined
  const dbEventsJoined = firebase.firestore().collection("eventsJoined");
  //Database for events created
  const dbEventsCreated = firebase.firestore().collection("eventsCreated");
  //Database for users
  const dbUsers = firebase.firestore().collection("UserInfo");

  //Current user's id  - How to get the id of the currently logged in user? From cache?
  let eventIdToFind = "04jhajo94";

  //Data retrieval function --> Loading phase
  function getData() {
    dbEventsJoined.get().then((item) => {
      //item is each document
      //Collecting data from the retrieval
      const eventsJoinedItems = item.docs.map((doc) => doc.data());
      //Setting the Events Joined List
      setEventJoined(eventsJoinedItems);
    });
    dbEventsCreated.get().then((item) => {
      const eventsCreatedItems = item.docs.map((doc) => doc.data());
      setEventCreated(eventsCreatedItems);
    });
    dbEvents.get().then((item) => {
      //item is each document
      //Collecting data from the retrieval
      const eventsItems = item.docs.map((doc) => doc.data());
      //Setting the Events Joined List
      setEvents(eventsItems);
    });
    dbUsers.get().then((item) => {
      //Collecting data from the retrieval
      const usersItems = item.docs.map((doc) => doc.data());
      //Setting the Users List
      setUser(usersItems);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/create">Create Event</Nav.Link>
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
            <Nav.Link href="/setting">Settings</Nav.Link>

            <Nav.Link href="/">Sign Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Row>
        <Col xs={6}>
          <br></br>
          <h2 class="h2profile">Users who have joined the event</h2>
          {users.map((user) =>
            eventsJoined.some(
              (evJ) => evJ.userID == user.id && evJ.EventID == eventIdToFind
            ) ? (
              <div>
                <br />
                <Card class="card">
                  <Card.Body>
                    <div key={user.id}>
                      <Card.Title> {user.Name}</Card.Title>
                      <Card.Text>
                        Phone: {user.Phone}
                        <br />
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ) : (
              ""
            )
          )}
        </Col>
      </Row>
    </div>
  );
}

export default WhoJoined;
