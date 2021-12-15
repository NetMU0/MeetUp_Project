import React, { Component } from "react";
import firebaseApp from "./firebase.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "firebase/firestore";
//import firebase from '../firebase.js';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { render } from "react-dom";

class SignIn extends Component {
  render() {
    //const navigate = useNavigate();
    const auth = getAuth();

    let inputFielde = "";
    let inputFieldp = "";
    let inputFieldpa = "";
    let error = "";

    const setUser = this.props.setUser;

    //Go to Home pqge

    // our state variables for SignIn.
    // e for email, p for password
    function setInputFielde(i) {
      inputFielde = i;
    }

    function setInputFieldp(i) {
      inputFieldp = i;
    }

    function setInputFieldpa(i) {
      inputFieldpa = i;
    }

    function setError(e) {
      error = e;
    }

    // handler function when password textbox changes.
    const onChangePassword = (e) => {
      e.preventDefault();
      setInputFieldp(e.target.value);
    };

    const onChangePasswordAgain = (e) => {
      e.preventDefault();
      setInputFieldpa(e.target.value);
    };

    // handler function when email textbox changes.
    const onChangeEmail = (e) => {
      e.preventDefault();
      setInputFielde(e.target.value);
    };

    // When the submit button is pressed we pass the values of the
    // state variables inputFielde, inputFieldp to our
    // firebase function signInWithEmailAndPassword
    const submitButton = () => {
      if (inputFieldp === inputFieldpa) {
        createUserWithEmailAndPassword(auth, setInputFielde, setInputFieldp)
          .then((userCredentials) => {
            // Obtain the authenticated user object
            // from firebase.
            const user = userCredentials.user;

            // setTheAuthUser from the Parent App.
            // now the parent will know the user is authenticated
            setUser = user;
            const navigate = useNavigate();
            navigate("/home");
          })
          .catch((error) => {
            setError("Unable to create account");
          });
      } else {
        setError("Password not the same");
      }
    };

    return (
      <Container>
        <div>
          <h3>Sign In</h3>
          <label htmlFor="email">Email</label>
          <br />
          <input
            onChange={onChangeEmail}
            value={inputFielde}
            type="text"
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="password">password</label>
          <br />
          <input
            onChange={onChangePassword}
            value={inputFieldp}
            type="text"
            id="password"
            name="password"
          />
          <br />
          <br />
          <button onClick={submitButton}>Submit</button>
          <hr />
          <p>{error}</p>
        </div>
      </Container>
    );
  }
}

export default SignIn;
