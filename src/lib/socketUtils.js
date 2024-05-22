import { io } from "socket.io-client";

export const initializeSocket = async () => {
  const url = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
  try {
    // Determine WebSocket protocol based on the current protocol
    const socketProtocol =
      window.location.protocol === "https:" ? "wss:" : "ws:";

    // Extract hostname and port from serverUrl
    const serverUrlObj = new URL(url);

    // conditionally omit port for websocketUrl - prod deployment
    const websocketUrl = import.meta.env.VITE_SERVER_URL
      ? `${socketProtocol}//${serverUrlObj.hostname}`
      : `${socketProtocol}//${serverUrlObj.hostname}:${serverUrlObj.port}`;

    const socket = io(websocketUrl, {
      transports: ["websocket"],
      path: "/socket.io",
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    return socket;
  } catch (error) {
    console.error("Error initializing socket:", error);
    return null;
  }
};
