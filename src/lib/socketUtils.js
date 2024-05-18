import { io } from "socket.io-client";

// Function to initialize socket dynamically from the /api route
export const initializeSocket = async () => {
  const url = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
  try {
    const response = await fetch(`${url}/api`);
    const data = await response.json();
    let serverUrl = data.serverUrl;

    console.log("serverUrl--->", serverUrl);

    // Check if the current protocol is HTTPS
    const socketProtocol =
      window.location.protocol === "https:" ? "https:" : "http:";

    console.log("socketProtocol--->", socketProtocol);

    // Update serverUrl based on the socketProtocol
    if (socketProtocol === "https:") {
      // If the protocol is HTTPS, update serverUrl to use HTTPS
      if (serverUrl.startsWith("http://")) {
        serverUrl = serverUrl.replace("http://", "https://");
      }
    } else {
      // If the protocol is not HTTPS (i.e., HTTP), ensure serverUrl starts with HTTP
      if (!serverUrl.startsWith("http://")) {
        serverUrl = serverUrl.replace("https://", "http://");
      }
    }

    console.log("serverUrl after protocol assesment--->", serverUrl);

    const socket = io(serverUrl, {
      transports: ["websocket"],
    });
    return socket;
  } catch (error) {
    console.error("Error initializing socket:", error);
    return null;
  }
};
