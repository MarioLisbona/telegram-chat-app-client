import { io } from "socket.io-client";

// import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ChatPage from "./components/ChatPage";
import Home from "./oldComponents/Home";
import ChatPage from "./oldComponents/ChatPage.jsx";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export default function App() {
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
