import React, { useState } from "react";
import firebaseApp from "./fireconfiglogin";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = ({ userCentral }) => {
  //getting navigate function
  const navigate = useNavigate();

  const auth = getAuth(firebaseApp);

  const [emailInput, setemailInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");
  // we'll need an error message state variable.
  const [error, setError] = useState("");

  // handler function when password textbox changes.
  const onChangePassword = (e) => {
    e.preventDefault();
    setpasswordInput(e.target.value);
  };

  // handler function when email textbox changes.
  const onChangeEmail = (e) => {
    e.preventDefault();
    setemailInput(e.target.value);
  };

  // When the submit button is pressed we pass the values of the
  // state variables emailInput, passwordInput to our
  // firebase function signInWithEmailAndPassword
  const submitButton = () => {
    signInWithEmailAndPassword(auth, emailInput, passwordInput)
      .then((userCredentials) => {
        const user = userCredentials.user;

        userCentral = user;
      })
      .catch((error) => {
        setError("Unable to logon");
      });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <label htmlFor="email">Email</label>
      <br />
      <input
        onChange={onChangeEmail}
        value={emailInput}
        type="email"
        id="email"
        name="email"
      />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        onChange={onChangePassword}
        value={passwordInput}
        type="password"
        id="password"
        name="password"
      />
      <br />
      <br />
      <button onClick={submitButton}>Submit</button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to menu
      </button>
      <p>{error}</p>
    </div>
  );
};

export default SignIn;
