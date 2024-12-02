import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateActivity from "./components/CreateActivity";
import Activities from "./components/Activities";
import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-activity" element={<CreateActivity />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/chat-room" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
