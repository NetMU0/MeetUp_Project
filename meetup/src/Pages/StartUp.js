import logo from "./MeetUp.png";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StartUp() {
  const navigate = useNavigate();

  return (
    <body>
      <h1>Welcome to MeetUp</h1>
      <div id="App">
        <img src={logo} alt="Meet Up" height={200} width={200} />
      </div>
      <p>
        Welcome to MeetUp a web based application where you can meet people{" "}
      </p>

      <button
        onClick={() => {
          navigate("/register");
        }}
      >
        Sign Up
      </button>

      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Sign In
      </button>
    </body>
  );
}
export default StartUp;
