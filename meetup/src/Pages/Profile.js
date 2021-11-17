import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";
import 'firebase/firestore';
import firebase from '../firebase.js';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
{/*import React from "react";*/}
{/*import { useHistory } from "react-router-dom";*/}


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
function Profile() {
    {/*let history = useHistory();*/}
    const [events, setEvent] =  useState([]);
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const dbEvents = firebase.firestore().collection("event");
    const dbUsers = firebase.firestore().collection("user");

    //Current user's id  - How to get the id of the currently logged in user? From cache?
    var currentUID = "asd546s789";
    
    async function getUserById(currentUID) {
        /*
        for (const user in dbUsers) {
            if(user.id == currentUID) {
                console.log(user);
                return user;
            }
        }*/
        for (const user in dbUsers.get()) {
            if(user.id == currentUID) {
                console.log(user);
                return user;
            }
        }
        /*const cityRef = dbUsers.doc(currentUID);
        const doc = await cityRef.get();
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
          return doc.data();
        }*/
    }

   const user = getUserById(currentUID);
   // const joinedEvents = user.EventsJoined;
    
    
    //How to extract the array from db?
   // const joinedEvents = ['121r3wfe2', '3276492kesl'];  
    //const joinedEvents = [];
    //then use the filter function 

    function getData() {
        dbEvents.get().then((item)=> {
            const eventsItems = item.docs.map((doc) => doc.data());

            //Setting the Event List
            setEvent(eventsItems);

        });
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
            <Navbar bg="dark" variant="dark">
                <Container>
                    {/*<Navbar.Brand href="#home">Navbar</Navbar.Brand>*/}
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Create Event</Nav.Link>
                        <Nav.Link href="#features">Search for Event</Nav.Link>
                        {/*<button type="button"
                            onClick={() => {
                            history.push("/index");
                            }}>Logout
                        </button>*/}
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Photo</Nav.Link>
                        <Nav.Link href="#deets">Sign Out</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <Col xs={6}>
                     Text
                    </Col>
                    <Col xs={6}>
                        Text
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Card style={{ width: '30rem' }}>
                            <Card.Body>
                                <Card.Title> Events Joined </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">See all the events you have joined below</Card.Subtitle>
                                <Card.Body>
                                    
                                </Card.Body>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card style={{ width: '30rem' }}>
                            <Card.Body>
                                <Card.Title> Events Created </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">See all the events you have created below</Card.Subtitle>
                                <Card.Body>
                                    <Card.Title> Event 1 </Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;