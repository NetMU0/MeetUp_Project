import './App.css';
import firebase from './firebase.js';
import 'firebase/firestore';
import React, {useState, useEffect} from "react";
const SignUp =()=> {
  //Databases for users
  const [user,setUser] = useState("");
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [birth,setBirth] = useState("");
  const [gender,setGender] = useState("");
//@TODO ADD VALIDATION IF TIME HAD
  const handleSubmit = (e) => {
    e.preventDefault();
    const dbUsers = firebase.firestore().collection("UserInfo");
    dbUsers.add({
        Username: user,
        Name: name,
        Phone: phone,
        Birthday: birth,
        Gender: gender
    })
    .then(()=>{
      alert('Data has been added to database');
    })
    .catch((error) =>{
      alert(error.message);
    });
    setUser("");
    setName("");
    setPhone("");
    setBirth("");
    setGender("");

  };


  return (
    
    <form id = "signupform" onSubmit = {handleSubmit}>
      <label>Username:
        <div>
        <input type="text" value = {user} onChange={(e) =>setUser(e.target.value)} />
        </div>
      </label>

      <label>Full Name:
        <div>
        <input type="text" id ="name" value = {name} onChange={(e) =>setName(e.target.value)} />
        </div>
      </label>

      <label>Phone Number:
        <div>
        <input type="number" id = "phone" value = {phone} onChange={(e) =>setPhone(e.target.value)}/>
        </div>
      </label>

      <label> Birthday:
        <div>
        <input type="date" id ="birth" value = {birth} onChange={(e) =>setBirth(e.target.value)} />
        </div>
      </label>
<p></p>
      <label>Gender:
      <div class="form-group">
  <label class="col-md-4 control-label" for="radios"></label>
  <div class="col-md-4">
  <div class="radio">
    <label for="radios-0">
      <input type="radio" name="radios" id="radios-0" value = {gender} onChange={(e) =>setGender("Male")} checked="checked"/>
      Male
    </label>
	</div>
  <div class="radio">
    <label for="radios-1">
      <input type="radio" name="radios" id="radios-1" value = {gender} onChange={(e) =>setGender("Female")}/>
      Female
    </label>
	</div>
  <div class="radio">
    <label for="radios-2">
      <input type="radio" name="radios" id="radios-2" value = {gender} onChange={(e) =>setGender("Prefer Not to Say")}/>
      Prefer Not to Say
    </label>
	</div>
  </div>
</div>
      </label>
      <p></p>
      <button type ="submit">Join</button>

    </form> 
  );
}

export default SignUp;
