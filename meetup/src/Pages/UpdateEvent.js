//import './App.css';
import firebase from "./firebase.js";
import "firebase/firestore";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
const UpdateEvent = () => {
  //Databases for users
  const [eventname, setEventName] = useState("");
  const [eventplace, setEventPlace] = useState("");
  const [eventdate, setEventDate] = useState("");
  const [eventdescription, setEventDescription] = useState("");
  const [eventtime, setEventTime] = useState("");
  const [eventstatus, setEventStatus] = useState("");
  const uniqueid = "35trfuyg";
  const navigate = useNavigate();
  //@TODO ADD VALIDATION IF TIME HAD ADD STATTUS TO CHANGE TO CANCELL GOING AHEAD AND FINISHED
  const handleSubmit = (e) => {
    e.preventDefault();

    const dbEvents = firebase.firestore().collection("event");
    //   var currentid = uniqueid; //get id of current event
    // let id = e.target.id;

    dbEvents
      .doc("e68322b6-90b1-4be8-a05a-49994eb25eec")
      .set({
        //id of event is same as document id to make it easier to find
        //makes editing it easier to find
        Name: eventname,
        Location: eventplace,
        Date: eventdate,
        Description: eventdescription,
        Time: eventtime,
        id: uniqueid,
        Status: eventstatus,
        UserId: "lp0rde3sw" // place holder user icd
        //Created by will have to be username gotten from the pther SignUp js and id
      })

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
    setEventStatus("");

    navigate("/home");
  };

  return (
    <form id="EventForm" onSubmit={handleSubmit}>
      <label>Name of Event:</label>
      <div>
        <input
          type="text"
          placeholder="MU Halloween Party"
          value={eventname}
          onChange={(e) => setEventName(e.target.value)}
        />
      </div>

      <label>Place:</label>
      <div>
        <input
          type="text"
          placeholder="Maynooth"
          id="eventplace"
          value={eventplace}
          onChange={(e) => setEventPlace(e.target.value)}
        />
      </div>

      <label> Date of Event:</label>
      <div>
        <input
          type="date"
          placeholder="01-01-0001"
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
          placeholder="01:01"
          value={eventtime}
          onChange={(e) => setEventTime(e.target.value)}
        />
      </div>

      <label>
        Description:
        <div>
          <textarea
            id="eventdescription"
            placeholder="Join us to celebrate Halloween!"
            value={eventdescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
      </label>
      <div>
        <label>
          Status:
          <div class="form-group">
            <label class="col-md-4 control-label" for="radios"></label>
            <div class="col-md-4">
              <div class="radio">
                <label for="radios-0">
                  <input
                    type="radio"
                    name="radios"
                    id="radios-0"
                    value={eventstatus}
                    onChange={(e) => setEventStatus("Ongoing")}
                  />
                  Ongoing
                </label>
              </div>
              <div class="radio">
                <label for="radios-1">
                  <input
                    type="radio"
                    name="radios"
                    id="radios-1"
                    value={eventstatus}
                    onChange={(e) => setEventStatus("Cancelled")}
                  />
                  Cancelled
                </label>
              </div>
              <div class="radio">
                <label for="radios-2">
                  <input
                    type="radio"
                    name="radios"
                    id="radios-2"
                    value={eventstatus}
                    onChange={(e) => setEventStatus("Finished")}
                  />
                  Finished
                </label>
              </div>
            </div>
          </div>
        </label>
      </div>

      <p></p>

      <button type="submit" Id={"1"}>
        Update
      </button>
    </form>
  );
};
//maybe a delete button
export default UpdateEvent;
