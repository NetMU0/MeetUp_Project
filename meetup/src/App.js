import './App.css';
import React, {useState, useEffect} from "react";
import {Link} from 'react-router';
import firebase from './firebase.js';
import 'firebase/firestore';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import CreateEvent from "./Pages/CreateEvent";
import JoinEvent from "./Pages/JoinEvent";

class usersDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {userList : []}
    }
    render() {
        return(
         <div>

         </div>
        )
    }
}
function App() {
    //useState ==> ["Name of the set", Name of the function to set the set"]
    const [users, setUser] = useState([]);
    const [activities, setActivity] = useState([]);
    const [events, setEvent] =  useState([]);
    const [loading, setLoading] = useState(false);

    //Database for users
    const dbUsers = firebase.firestore().collection("user");

    //Database for users
    const dbActivity = firebase.firestore().collection("activity_type");

    //Database for events 
    const dbEvents = firebase.firestore().collection("event");

    //Data retrieval function --> Loading phase
    function getData() {
        //Need to put on true
        setLoading(true);
        dbUsers.get().then((item)=> {
            //Collecting data from the retrieval
            const usersItems = item.docs.map((doc) => doc.data());
            
            //Setting the User List
            setUser(usersItems);     
        });


        dbActivity.get().then((item)=> {
            //Collecting data from the retrieval
            const actItems = item.docs.map((doc) => doc.data());

            //Setting the activity List
            setActivity(actItems);
            setLoading(false);
        })
    };

    useEffect(() => {
        getData();
    },[]);

    //Loading Screen
    if (loading){
        return <h1>Loading in progress...</h1>
    }

    return ( 
        
        <div>
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/create" component={CreateEvent} />
                        <Route exact path="/join" component={JoinEvent} />
                    </Switch>
                </Router>
            </div>
            <div>
                <h2>List of users :</h2>
                {users.map((u)=> (
                    <div key={u.id}>
                        - Username : {u.name}
                    </div>
                ))}
            </div>
            <div>
                <h2>List of events :</h2>
                {events.map((u)=> (
                    <div key={u.Name}>
                        - Name : {u.Name}
                    </div>
                ))}
            </div>
            <div>
                <h2>List of activities :</h2>
                {activities.map((u)=> (
                    <div key={u.idActivity}>
                        - Activities : {u.name} with id of {u.idActivity}
                    </div>
                ))}
            </div>

            {/* HTML code of the usersDisplay class */}
            <usersDisplay/>
        </div>
        
        
    );
}
export default  App;


