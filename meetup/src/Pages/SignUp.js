//import './App.css';
import firebase from "./firebase.js";
import "firebase/firestore";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  //Databases for users
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const uniqueid = "lp0rde3sw";
  //@TODO ADD VALIDATION IF TIME HAD
  const handleSubmit = (e) => {
    e.preventDefault();
    const dbUsers = firebase.firestore().collection("UserInfo");
    dbUsers
      .doc("9evpMALGpF9MvVjT2Zc2")
      .set({
        Username: user,
        Name: name,
        Phone: phone,
        Birthday: birth,
        Gender: gender,
        id: uniqueid
      })
      .then(() => {
        //popup
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
    <form id="signupform" onSubmit={handleSubmit}>
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

      <label>
        {" "}
        Birthday:
        <div>
          <input
            type="date"
            id="birth"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </div>
      </label>
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
      <button type="submit">Join</button>
    </form>
  );
};

export default SignUp;
