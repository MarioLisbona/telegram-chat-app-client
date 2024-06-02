export const fetchMessages = async (setMessages) => {
  const url = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

  console.log("Logging url in fetchMessages", url);

  try {
    const response = await fetch(`${url}/messages`);
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    const data = await response.json();
    setMessages(data); // Update messages state with response data
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

// Handle incoming message response
export const handleMessageResponse = (data, setMessages) => {
  setMessages((prevMessages) => [...prevMessages, data]);
};

// Handle incoming Telegram message
export const handleTelegramMessage = (data, setMessages) => {
  setMessages((prevMessages) => [...prevMessages, data]);
};
// Handle incoming tokenClick message
export const handleTokenClickMessage = (data, setMessages) => {
  setMessages((prevMessages) => [...prevMessages, data]);
};

let typingTimeoutId;

// Handle typing response
export const handleTypingResponse = (data, onlineUsers, setUserTyping) => {
  const user = onlineUsers.find((obj) => obj.uid === data);
  setUserTyping(user);

  // Clear the previous timeout if it exists
  if (typingTimeoutId) {
    clearTimeout(typingTimeoutId);
  }

  // Set a new timeout
  typingTimeoutId = setTimeout(() => {
    setUserTyping(false);
  }, 750);

  return typingTimeoutId;
};

// Add socket event listeners
export const addSocketListeners = (
  socket,
  setMessages,
  onlineUsers,
  setUserTyping
) => {
  try {
    const handleMessageResponseWrapper = (data) =>
      handleMessageResponse(data, setMessages);
    const handleTelegramMessageWrapper = (data) =>
      handleTelegramMessage(data, setMessages);
    const handleTokenClickMessageWrapper = (data) =>
      handleTelegramMessage(data, setMessages);
    const handleTypingResponseWrapper = (data) => {
      const timeoutId = handleTypingResponse(data, onlineUsers, setUserTyping);
      return () => clearTimeout(timeoutId);
    };

    socket.on("messageResponse", handleMessageResponseWrapper);
    socket.on("telegramMessage", handleTelegramMessageWrapper);
    socket.on("tokenClickResponse", handleTokenClickMessageWrapper);
    socket.on("typingResponse", handleTypingResponseWrapper);

    return () => {
      socket.off("messageResponse", handleMessageResponseWrapper);
      socket.off("telegramMessage", handleTelegramMessageWrapper);
      socket.off("tokenClickResponse", handleTokenClickMessageWrapper);
      socket.off("typingResponse", handleTypingResponseWrapper);
    };
  } catch (error) {
    console.error("Error setting up socket listeners:", error);
    // Handle the error appropriately
    return () => {};
  }
};

export const fetchTickerData = async (setTickerData) => {
  const url = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
  try {
    const response = await fetch(`${url}/api/ticker`);
    if (!response.ok) {
      throw new Error("Failed to fetch token data");
    }
    const data = await response.json();

    setTickerData(data);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

export const handleTokenClick = (coin, onlineUsers, formatDateTime, socket) => {
  // UserObject data for this user from firestore
  const thisUserObject = onlineUsers[0];

  // create now instance and return formatted createdAt
  const now = new Date();
  const formattedCreatedAt = formatDateTime(now);

  const data = {
    text: `${thisUserObject.name} said check this out!\n`,
    coin: coin,
    name: thisUserObject.name,
    userId: thisUserObject.uid,
    socketID: socket.id,
    createdAt: formattedCreatedAt,
  };
  socket.emit("tokenClick", data);
};

export const fetchTokenData = async (match, setToken) => {
  console.log("MAtch inside function", match);
  const token = match[1];
  console.log("token inside function", token);
  const url = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
  console.log("Fetch url", `${url}/api/token-data?token=${token}`);

  try {
    const response = await fetch(`${url}/api/token-data?token=${token}`);
    if (!response.ok) {
      throw new Error("Failed to fetch token data");
    }
    const tokenObject = await response.json();

    setToken(tokenObject);
  } catch (error) {
    console.error("Error fetching token data:", error);
  }
};
