import { io } from "socket.io-client";
import { useEffect } from "react";

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

  return (
    <h1 className="text-5xl text-blue-500 font-bold underline">Hello world!</h1>
  );
}
