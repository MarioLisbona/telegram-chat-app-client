import { io } from "socket.io-client";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });
    socket.emit("message", "hello");

    socket.on("message", (msg) => {
      console.log("client got a message ", msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <h1 className="text-5xl text-blue-500 font-bold underline">Hello world!</h1>
  );
}
