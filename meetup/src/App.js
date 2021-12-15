import "./styles.css";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Pages/StartUp";
import Register from "./Pages/SignUp";
import Create from "./Pages/CreateEvent";
import Update from "./Pages/UpdateEvent";
import Home from "./Pages/Profile"; //Change to Profile
import Login from "./Pages/SignIn"; //change to login
import Search from "./Pages/searchResult";
import WhoJoined from "./Pages/WhoJoined";
import JoinEvent from "./Pages/JoinEvent";
import Settings from "./Pages/ProfileSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update" element={<Update />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/whojoined" element={<WhoJoined />} />
        <Route path="/joinevent" element={<JoinEvent />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
