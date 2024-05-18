import { io } from "socket.io-client";

// Function to initialize socket dynamically from the /api route
export const initializeSocket = async () => {
  const url = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
  try {
    const response = await fetch(`${url}api`);
    const data = await response.json();
    const serverUrl = data.serverUrl;
    const socket = io(serverUrl, {
      transports: ["websocket"],
    });
    return socket;
  } catch (error) {
    console.error("Error initializing socket:", error);
    return null;
  }
};
