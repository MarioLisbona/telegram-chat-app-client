import { io } from "socket.io-client";

export const initializeSocket = async () => {
  const url = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
  try {
    const response = await fetch(`${url}/api`);
    const data = await response.json();
    let serverUrl = data.serverUrl;

    console.log("serverUrl--->", serverUrl);

    // Determine WebSocket protocol based on the current protocol
    const socketProtocol =
      window.location.protocol === "https:" ? "wss:" : "ws:";
    console.log("socketProtocol--->", socketProtocol);

    // Extract hostname and port from serverUrl
    const serverUrlObj = new URL(serverUrl);
    const websocketUrl = `${socketProtocol}//${serverUrlObj.hostname}:${serverUrlObj.port}`;

    console.log("websocketUrl--->", websocketUrl);

    const socket = io(websocketUrl, {
      transports: ["websocket"],
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
