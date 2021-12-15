import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, Component } from "react";
import "firebase/firestore";
import firebase from "./firebase.js";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
{
  /*import React from "react";*/
}
{
  /*import { useHistory } from "react-router-dom";*/
}

class SearchResult extends Component {
  render() {
    let currentUID = "lp0rde3sw";
    return (
      <Container>
        <div>
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
          <Container>
            <Row>
              <br></br>
              <Col xs={6}>Hello, {currentUID}!</Col>
              <br></br>
              <h1 class="h1profile">My Events</h1>
              <br></br>
              <Col xs={6}></Col>
            </Row>
            <Row>
              <Col xs={6}>
                <h2 class="h2profile">Attending Events</h2>
                {events.map((event) =>
                  eventsJoined.some(
                    (evJ) =>
                      evJ.EventID === event.id && evJ.UserID == currentUID
                  ) ? (
                    <div>
                      <br />
                      <Card class="card">
                        <Card.Body>
                          <div key={event.EventId}>
                            <Card.Title>{event.Name}</Card.Title>
                            <Card.Text>
                              {event.Date}
                              <br />
                              {event.Time}
                              <br />
                              {event.Location}
                              <br />
                              {event.Description}
                            </Card.Text>
                            <button
                              type="viewbutton"
                              onClick={() => {
                                navigate("/fulleventdescription");
                              }}
                            >
                              Leave
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </Col>
              <Col xs={6}>
                <h2 class="h2profile">Created Events</h2>
                {events.map((event) =>
                  eventsCreated.some(
                    (evC) => evC.eventID == event.id && evC.userID == currentUID
                  ) ? (
                    <div>
                      <br />
                      <Card class="card">
                        <Card.Body>
                          <div key={event.id}>
                            <Card.Title> {event.Name}</Card.Title>
                            <Card.Text>
                              {event.Date}
                              <br /> {event.Time}
                              <br /> {event.Location}
                              <br /> {event.Description}
                            </Card.Text>
                            <button
                              type="viewbutton"
                              onClick={() => {
                                navigate("/WhoJoined");
                              }}
                            >
                              Guestlist
                            </button>
                            <button
                              type="viewbutton"
                              onClick={() => {
                                navigate("/update");
                              }}
                            >
                              Update
                            </button>
                            <button
                              type="viewbutton"
                              onClick={() => {
                                dbEvents.doc("bNXqt1xPcWEthiHlkN5v").delete();
                                window.location.reload();
                              }}
                            >
                              Delete
                            </button>
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
          </Container>
        </div>
      </Container>
    );
  }
}

export default SearchResult;
