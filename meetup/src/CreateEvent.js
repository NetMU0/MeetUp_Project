import './App.css';
import firebase from './firebase.js';
import 'firebase/firestore';
import React, {useState, useEffect} from "react";
import Datetime from 'react-datetime';
const CreateEvent =()=> {
  //Databases for users
  const [eventname,setEventName] = useState("");
  const [eventplace,setEventPlace] = useState("");
  const [eventdate,setEventDate] = useState("");
  const [eventdescription,setEventDescription] = useState("");
  const [eventtime, setEventTime] = useState("");
//@TODO ADD VALIDATION IF TIME HAD
  const handleSubmit = (e) => {
    e.preventDefault();
    const dbEvents = firebase.firestore().collection("event");
    dbEvents.add({
        Name: eventname,
        Location: eventplace,
        Date: eventdate,
        Description: eventdescription,
        Time : eventtime
        //Created by will have to be username gotten from the pther SignUp js and id
    })
    .then(()=>{
      alert('Data has been added to database');
    })
    .catch((error) =>{
      alert(error.message);
    });
    setEventName("");
    setEventPlace("");
    setEventDate("");
    setEventTime("");
    setEventDescription("");
 

  };


  return (
    
    <form id = "EventForm" onSubmit = {handleSubmit}>
      <label>Name of Event:
        <div>
        <input type="text" value = {eventname} onChange={(e) =>setEventName(e.target.value)} />
        </div>
      </label>

      <label>Place:
        <div>
        <input type="text" id ="eventplace" value = {eventplace} onChange={(e) =>setEventPlace(e.target.value)} />
        </div>
      </label>



      <label> Date of Event:
        <div>
        <input type="date" id ="eventdate" value = {eventdate} onChange={(e) =>setEventDate(e.target.value)} />
        </div>
      </label>

      <label> Time of Event:
        <div>
        <input type="time" id ="eventtime" value = {eventtime} onChange={(e) =>setEventTime(e.target.value)} />
        </div>
      </label>

      <label>Description:
        <div>
        <textarea id ="eventdescription" value = {eventdescription} onChange={(e) =>setEventDescription(e.target.value)} />
        </div>
      </label>

      <p></p>
      <button type ="submit">Create</button>

    </form> 
  );
}

export default CreateEvent;
