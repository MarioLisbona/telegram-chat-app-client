import { io } from "socket.io-client";

// Function to initialize socket dynamically from the /api route
export const initializeSocket = async () => {
  const url = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
  try {
    const response = await fetch(`${url}/api`);
    const data = await response.json();
    const serverUrl = data.serverUrl;

    console.log("serverUrl--->", serverUrl);

    // Check if the current protocol is HTTPS
    const socketProtocol =
      window.location.protocol === "https:" ? "https:" : "http:";

    console.log("socketProtocol--->", socketProtocol);

    // Construct the WebSocket URL
    const socketUrl = serverUrl.replace(/^http/, socketProtocol.slice(0, -1));

    console.log("socketUrl after replace--->", socketUrl);

    const socket = io(socketUrl, {
      transports: ["websocket"],
    });
    return socket;
  } catch (error) {
    console.error("Error initializing socket:", error);
    return null;
  }
};
