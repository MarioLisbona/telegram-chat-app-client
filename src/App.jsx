import { io } from "socket.io-client";
import { useEffect } from "react";
import Login from "./components/Login";

export default function App() {
  // useEffect creates connection on mount
  useEffect(() => {
    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });
    // emit message to server on mount
    socket.emit("message", "hello");

    // handle "mesasge" from server and log msg
    socket.on("message", (msg) => {
      console.log("client got a message ", msg);
    });

    // cleanup socket and disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  return <Login />;
}
