import { io } from "socket.io-client";

// import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ChatPage from "./components/ChatPage";
import Home from "./oldComponents/Home";
import ChatPage from "./oldComponents/ChatPage.jsx";

// Determine the protocol based on environment
const protocol =
  import.meta.env.MODE === "development" ? "http://" : "https://";

let serverHost = import.meta.env.VITE_SERVER_HOST || "localhost";
let serverPort = import.meta.env.VITE_SERVER_PORT || 4000;

const socket = io(`${protocol}${serverHost}:${serverPort}`, {
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
