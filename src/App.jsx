import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./oldComponents/Home";
import ChatPage from "./oldComponents/ChatPage.jsx";
import { initializeSocket } from "./socket.js";

export default function App() {
  const [socket, setSocket] = useState(null);

  // useEffect to set socket state on initial component mount
  useEffect(() => {
    const initialize = async () => {
      if (!socket) {
        const newSocket = await initializeSocket();
        setSocket(newSocket);
      }
    };

    // run async fucntion to dynamicaly set socket connection
    initialize();

    // cleanup functions
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]); // Only run effect when 'socket' changes, ensuring it runs only once on mount
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route> */}
        <Route path="/" element={<Home socket={socket} />}></Route>
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
