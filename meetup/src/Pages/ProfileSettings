//import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "./firebase.js";
import "firebase/firestore";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
//make random unique as username then use username to update evrything else
//username should be the name of the document
//will ve id of current user but idk that yest soo
const ProfileSettings = () => {
  //Databases for users
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const uniqueid = "1"; // uuid(); //will be the id gotten from the user
  //@TODO ADD VALIDATION IF TIME HAD
  const handleSubmit = (e) => {
    e.preventDefault();

    const dbUsers = firebase.firestore().collection("UserInfo");
    dbUsers
      .doc("9evpMALGpF9MvVjT2Zc2")
      .set({
        //looks for document under that id then changes infor accordingly
        Username: user,
        Name: name,
        Phone: phone,
        Birthday: birth,
        Gender: gender,
        UserId: "lp0rde3sw" //(place holder) until we can can be sure of how to get user id
      })
      .then(() => {
        alert("Data has been added to database");
      })
      .catch((error) => {
        alert(error.message);
      });
    setUser("");
    setName("");
    setPhone("");
    setBirth("");
    setGender("");
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

      <form id="Updateform" onSubmit={handleSubmit}>
        <label>Username:</label>
        <div>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <label>Full Name:</label>
        <div>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <label>Phone Number:</label>
        <div>
          <input
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <label> Birthday:</label>
        <div>
          <input
            type="date"
            id="birth"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </div>

        <p></p>
        <label>
          Gender:
          <div class="form-group">
            <label class="col-md-4 control-label" for="radios"></label>
            <div class="col-md-4">
              <div class="radio">
                <label for="radios-0">
                  <input
                    type="radio"
                    name="radios"
                    id="radios-0"
                    value={gender}
                    onChange={(e) => setGender("Male")}
                    checked="checked"
                  />
                  Male
                </label>
              </div>
              <div class="radio">
                <label for="radios-1">
                  <input
                    type="radio"
                    name="radios"
                    id="radios-1"
                    value={gender}
                    onChange={(e) => setGender("Female")}
                  />
                  Female
                </label>
              </div>
              <div class="radio">
                <label for="radios-2">
                  <input
                    type="radio"
                    name="radios"
                    id="radios-2"
                    value={gender}
                    onChange={(e) => setGender("Prefer Not to Say")}
                  />
                  Prefer Not to Say
                </label>
              </div>
            </div>
          </div>
        </label>
        <p></p>
        <button type="submit">Amend</button>
      </form>
    </body>
  );
};

export default ProfileSettings;
